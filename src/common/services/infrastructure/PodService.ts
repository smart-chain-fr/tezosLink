import { BackendVariables } from "@Common/config/variables/Variables";
import { PodEntity } from "@Common/ressources";
import HttpCodes from "@Common/system/controller-pattern/HttpCodes";
import PodRepository from "@Repositories/infrastructure/PodRepository";
import BaseService from "@Services/BaseService";
import axios from "axios";
import { type processFindManyQuery } from "prisma-query";
import { Service } from "typedi";
import MetricsInfrastructureService from "./MetricInfrastructureService";

interface PrometheusPodData {
	metric: {
		pod: string;
		phase: string;
		uid: string;
	};
	value: [number, string];
}

interface DeploymentsData {
	total: number;
	running: number;
}

@Service()
export default class PodService extends BaseService {
	constructor(private PodRepository: PodRepository, private variables: BackendVariables, private metricInfrastructureService: MetricsInfrastructureService) {
		super();
	}

	public async getDeployedTezosLinkPods(type: string): Promise<DeploymentsData> {
		const namespace = this.variables.PROMETHEUS_NAMESPACE_TEZOSLINK;
		const runningQuery = `${this.variables.PROMETHEUS_URL}/api/v1/query?query=sum(kube_pod_container_status_running{namespace="${namespace}", container="${type}"})`;
		const totalQuery = `${this.variables.PROMETHEUS_URL}/api/v1/query?query=kube_deployment_status_replicas{deployment=~".*-${type}", namespace="${namespace}"}`;

		const [runningResponse, totalResponse] = await Promise.all([axios.get(runningQuery), axios.get(totalQuery)]);

		if (totalResponse.status !== HttpCodes.SUCCESS) {
			throw new Error("Cannot scrap prometheus metrics");
		}

		const deploymentsData: DeploymentsData = totalResponse.data.data.result.map((data: { value: any[]; metric: { pod: any } }) => ({
			total: Number(data.value[1]),
			running: Number(runningResponse.data.data.result.find((result: { metric: { pod: any } }) => result.metric.pod === data.metric.pod)?.value[1] ?? 0),
		}));

		return deploymentsData;
	}

	public async getPodsAndMetrics(type: string): Promise<PodEntity[]> {
		return (await this.PodRepository.findManyByQuery({
			where: {
				type,
			},
			include: {
				MetricInfrastructure: true,
			},
		})) as PodEntity[];
	}

	/**
	 * @throws {Error} If infrastructure Pod are undefined
	 */
	public async scrapingPodsAndMetrics(): Promise<void> {
		const namespace = this.variables.PROMETHEUS_NAMESPACE_TEZOSLINK;
		console.info("Starting scraping pods & metrics from prometheus");
		const pods = (await this.getPodsInNamespace(namespace)) as PodEntity[];
		if (!pods) {
			return Promise.reject(new Error("Cannot get pods from prometheus"));
		}
		await Promise.all(pods.map((pod) => this.saveOrUpdatePod(pod)));
		const podsInDb = await this.PodRepository.findRunningPods(NaN);
		await Promise.all(podsInDb.map((pod) => this.metricInfrastructureService.scrapMetricsByPodAndNamespace(pod.name,namespace)));
		console.info("Finished scraping pods & metrics from prometheus");
	}

	/**
	 * @throws {Error} If infrastructure Pod are undefined
	 */
	public async getByCriterias(query: ReturnType<typeof processFindManyQuery>): Promise<PodEntity[]> {
		return await this.PodRepository.findManyByQuery(query);
	}
	/**
	 *
	 * @throws {Error} If infrastructure pod cannot be created
	 * @returns
	 */
	private async saveOrUpdatePod(podEntity: Partial<PodEntity>): Promise<Partial<PodEntity>> {
		const pod = await this.PodRepository.createOrUpdate(podEntity);
		if (!pod) return Promise.reject(new Error("Cannot create infrastructure metric"));
		return pod;
	}

	private async getPodsInNamespace(namespace: string): Promise<PodEntity[]> {
		const promQuery = new URL(`${this.variables.PROMETHEUS_URL}/api/v1/query?query=kube_pod_status_phase{namespace="${namespace}"}`);
		const response = await axios.get(promQuery.toString());
		if (response.status !== HttpCodes.SUCCESS) return [];

		const podData = response.data.data.result as PrometheusPodData[];
		const pods = podData
			.filter((pod) => pod.value[1] === "1")
			.map((pod) => {
				const podEntity = new PodEntity();
				podEntity.name = pod.metric.pod;
				podEntity.phase = pod.metric.phase;
				const regex = /-tzlink-(rpcgateway|api|web|proxy)-[a-z0-9]+/;
				const match = pod.metric.pod.match(regex);
				podEntity.type = match ? `tzlink-${match[1]}` : "Unknown";
				return podEntity;
			});

		return pods;
	}
}
