import { BackendVariables } from "@Common/config/variables/Variables";
import { PodEntity } from "@Common/ressources";
import PodRepository from "@Repositories/infrastructure/PodRepository";
import BaseService from "@Services/BaseService";
import axios from "axios";
import { type processFindManyQuery } from "prisma-query";
import { Service } from "typedi";

interface PrometheusPodData {
	metric: {
		pod: string;
		phase: string;
		uid: string;
	};
	value: [number, string];
}

@Service()
export default class PodService extends BaseService {
	constructor(private PodRepository: PodRepository, private variables: BackendVariables) {
		super();
	}

	/**
	 * @throws {Error} If infrastructure Pod are undefined
	 */
	public async getByCriterias(query: ReturnType<typeof processFindManyQuery>): Promise<PodEntity[]> {
		return await this.PodRepository.findMany(query);
	}
	/**
	 *
	 * @throws {Error} If infrastructure pod cannot be created
	 * @returns
	 */
	public async savePod(podEntity: Partial<PodEntity>): Promise<Partial<PodEntity>> {
		const pod = await this.PodRepository.create(podEntity);
		if (!pod) return Promise.reject(new Error("Cannot create infrastructure metric"));
		return pod;
	}

	public async scrapPods(): Promise<void> {
		const pods = await this.getPodsInNamespace() as PodEntity[];
		pods.forEach(async (pod) => {
			this.savePod(pod);
		});
	}

	private async getPodsInNamespace(): Promise<PodEntity[]> {
		const namespace = this.variables.PROMETHEUS_NAMESPACE;
		const promQuery = new URL(`${this.variables.PROMETHEUS_URL}/api/v1/query?query=kube_pod_status_phase{namespace="${namespace}"}`);
		const response = await axios.get(promQuery.toString());
		console.log(response.data.data.result);
		const podData = response.data.data.result as PrometheusPodData[];
		const pods = podData.map((pod) => {
			const podEntity = new PodEntity();
			podEntity.name = pod.metric.pod;
			podEntity.phase = pod.metric.phase;
			podEntity.type = "regex-rule-here";
			return podEntity;
		});

		return pods;
	}
}
