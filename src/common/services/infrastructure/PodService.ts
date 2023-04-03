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
		namespace: string;
		uid: string;
	};
	value: [number, string];
}

interface DeploymentsData {
	total: number;
	running: number;
}

/**
 * Pod service
 * @export
 * @class PodService
 * @extends {BaseService}
 * */
@Service()
export default class PodService extends BaseService {
	constructor(private PodRepository: PodRepository, private variables: BackendVariables, private metricInfrastructureService: MetricsInfrastructureService) {
		super();
	}
	/**
	 * Get deployed pods for a given type
	 * @param {string} [type]
	 * @returns
	 * @memberof DeploymentsData
	 **/
	public async getDeployedTezosLinkPods(type: string): Promise<DeploymentsData> {
		let namespace: string;
		let runningQuery: string;
		let totalQuery: string;
		const prometheusUrl = this.variables.PROMETHEUS_URL;

		switch (type) {
			case "tzlink-web":
			case "mainnet-tzlink-rpcgateway":
			case "testnet-tzlink-rpcgateway":
			case "tzlink-api":
				namespace = this.variables.PROMETHEUS_NAMESPACE_TEZOSLINK;
				runningQuery = `${prometheusUrl}/api/v1/query?query=sum(kube_pod_container_status_running{namespace="${namespace}", container="${type}"})`;
				totalQuery = `${prometheusUrl}/api/v1/query?query=sum(kube_deployment_status_replicas{deployment=~".*-${type}", namespace="${namespace}"})`;
				break;
			case "mainnet-archive-node":
				namespace = this.variables.PROMETHEUS_NAMESPACE_TEZOS_K8S_MAINNET;
				runningQuery = `${prometheusUrl}/api/v1/query?query=sum(kube_pod_container_status_ready{namespace="${namespace}", container="octez-node", pod=~"archive-node-.*"})`;
				totalQuery = `${prometheusUrl}/api/v1/query?query=kube_statefulset_status_replicas{statefulset="archive-node", namespace="${namespace}"}`;
				break;
			case "mainnet-rolling-node":
				namespace = this.variables.PROMETHEUS_NAMESPACE_TEZOS_K8S_MAINNET;
				runningQuery = `${prometheusUrl}/api/v1/query?query=sum(kube_pod_container_status_ready{namespace="${namespace}", container="octez-node", pod=~"rolling-node-.*"})`;
				totalQuery = `${prometheusUrl}/api/v1/query?query=kube_statefulset_status_replicas{statefulset="rolling-node", namespace="${namespace}"}`;
				break;
			case "testnet-archive-node":
				namespace = this.variables.PROMETHEUS_NAMESPACE_TEZOS_K8S_TESTNET;
				runningQuery = `${prometheusUrl}/api/v1/query?query=sum(kube_pod_container_status_ready{namespace="${namespace}", container="octez-node", pod=~"archive-node-.*"})`;
				totalQuery = `${prometheusUrl}/api/v1/query?query=kube_statefulset_status_replicas{statefulset="archive-node", namespace="${namespace}"}`;
				break;
			case "testnet-rolling-node":
				namespace = this.variables.PROMETHEUS_NAMESPACE_TEZOS_K8S_TESTNET;
				runningQuery = `${prometheusUrl}/api/v1/query?query=sum(kube_pod_container_status_ready{namespace="${namespace}", container="octez-node", pod=~"rolling-node-.*"})`;
				totalQuery = `${prometheusUrl}/api/v1/query?query=kube_statefulset_status_replicas{statefulset="rolling-node", namespace="${namespace}"}`;
				break;
			default:
				return { total: 0, running: 0 };
		}

		const [runningResponse, totalResponse] = await Promise.all([axios.get(runningQuery), axios.get(totalQuery)]);

		if (totalResponse.status !== HttpCodes.SUCCESS) {
			console.info("Cannot scrap prometheus metrics");
		}

		if (!totalResponse.data.data.result.length || !runningResponse.data.data.result.length) {
			return { total: 0, running: 0 };
		}

		const totalValue = Number(totalResponse.data.data.result[0].value[1]) ?? 0;
		const runningValue = Number(runningResponse.data.data.result[0].value[1]) ?? 0;

		const deploymentsData: DeploymentsData = {
			total: totalValue,
			running: runningValue,
		};

		return deploymentsData;
	}

	/**
	 * Get one pod and metrics from database
	 * @param {PodEntity} projectEntity
	 * @returns {Promise<PodEntity>}
	 * @memberof PodService
	 * */
	public async getOnePodAndMetrics(projectEntity: Partial<PodEntity>): Promise<Partial<PodEntity>> {
		return await this.PodRepository.findOne(projectEntity);
	}

	/**
	 * Scraping pods and metrics from prometheus
	 * */
	public async scrapingPodsAndMetrics(): Promise<void> {
		console.info("Starting scraping pods & metrics from prometheus");

		const namespaces = [this.variables.PROMETHEUS_NAMESPACE_TEZOSLINK, this.variables.PROMETHEUS_NAMESPACE_TEZOS_K8S_MAINNET, this.variables.PROMETHEUS_NAMESPACE_TEZOS_K8S_TESTNET];
		const pods = (await Promise.all(namespaces.map((namespace) => this.getPodsInNamespace(namespace)))) as PodEntity[][];

		const allPods = pods.reduce((acc, val) => acc.concat(val), []);
		if (!allPods) {
			return Promise.reject("Cannot get pods from prometheus");
		}

		console.info("Saving pods to database ...");
		await Promise.all(allPods.map((pod) => this.saveIfNotExists(pod)));

		console.info("Scraping metrics from prometheus ...");
		const podsInDb = await this.PodRepository.findPodsInDatabase(NaN);
		await Promise.all(
			podsInDb.map((pod) => {
				const namespace = pod.namespace;
				return this.metricInfrastructureService.scrapMetricsByPodAndNamespace(pod, namespace);
			}),
		);

		console.info("Finished scraping pods & metrics from prometheus");
	}

	/**
	 * Get pods by criterias
	 * @param {ReturnType<typeof processFindManyQuery>} query
	 * @returns {Promise<PodEntity[]>}
	 * @memberof PodService
	 * */
	public async getByCriterias(query: ReturnType<typeof processFindManyQuery>): Promise<PodEntity[]> {
		return await this.PodRepository.findManyByQuery(query);
	}
	/**
	 * Save or update pod in database
	 * @param {PodEntity} podEntity
	 * @returns {Promise<PodEntity>}
	 * @memberof PodService
	 * */
	private async saveIfNotExists(podEntity: Partial<PodEntity>): Promise<Partial<PodEntity>> {
		return await this.PodRepository.createIfNotExists(podEntity);
	}

	/**
	 * Get pods in namespace
	 * @param {string} namespace
	 * @returns {Promise<PodEntity[]>}
	 * @memberof PodService
	 * */
	private async getPodsInNamespace(namespace: string): Promise<PodEntity[]> {
		const promQuery = new URL(`${this.variables.PROMETHEUS_URL}/api/v1/query?query=kube_pod_status_phase{namespace="${namespace}"}`);
		const response = await axios.get(promQuery.toString());
		if (response.status !== HttpCodes.SUCCESS) return [];

		const podData = response.data.data.result as PrometheusPodData[];
		const podRegex = /(?:(?:testnet|mainnet)-)?(tzlink-(?:api|web|cron)|archive-node|rolling-node|testnet-(?:tzlink-rpcgateway)|mainnet-(?:tzlink-rpcgateway))/;

		const pods = podData
			.filter((pod) => pod.value[1] === "1")
			.map((pod) => {
				const podEntity = new PodEntity();
				podEntity.uid = pod.metric.uid;
				podEntity.name = pod.metric.pod;
				podEntity.namespace = pod.metric.namespace;
				const match = pod.metric.pod.match(podRegex);
				if (pod.metric.namespace === this.variables.PROMETHEUS_NAMESPACE_TEZOS_K8S_MAINNET) {
					podEntity.type = match ? "mainnet-" + match[1]! : "Unknown";
				} else if (pod.metric.namespace === this.variables.PROMETHEUS_NAMESPACE_TEZOS_K8S_TESTNET) {
					podEntity.type = match ? "testnet-" + match[1]! : "Unknown";
				} else {
					podEntity.type = match ? match[1]! : "Unknown";
				}
				return podEntity;
			});

		return pods;
	}
}
