import { BackendVariables } from "@Common/config/variables/Variables";
import { MetricInfrastructureEntity } from "@Common/ressources";
import HttpCodes from "@Common/system/controller-pattern/HttpCodes";
import MetricsInfrastrucutreRepository from "@Repositories/infrastructure/MetricsInfrastrucutreRepository";
import BaseService from "@Services/BaseService";
import axios, { AxiosResponse } from "axios";
import { type processFindManyQuery } from "prisma-query";
import { Service } from "typedi";

interface vectorMetrics {
	metric?: metric;
	value?: string[];
}

interface metric {
	pod?: string;
}

@Service()
export default class MetricsInfrastructureService extends BaseService {
	constructor(private metricInfrastructureRepository: MetricsInfrastrucutreRepository, private variables: BackendVariables) {
		super();
	}

	/**
	 * @throws {Error} If infrastructure metrics are undefined
	 */
	public async getByCriterias(query: ReturnType<typeof processFindManyQuery>): Promise<MetricInfrastructureEntity[]> {
		return await this.metricInfrastructureRepository.findMany(query);
	}
	/**
	 *
	 * @throws {Error} If infrastructure metric cannot be created
	 * @returns
	 */
	public async saveMetric(metricInfrastructureEntity: Partial<MetricInfrastructureEntity>): Promise<Partial<MetricInfrastructureEntity>> {
		const metric = await this.metricInfrastructureRepository.create(metricInfrastructureEntity);
		if (!metric) return Promise.reject(new Error("Cannot create infrastructure metric"));
		return metric;
	}

	public async scrapMetricsByPod(pod: string): Promise<void> {

		const metricsCPU = await this.getCpuUsage(pod, new Date(), new Date());
		/** {TODO} */
		console.log("data CPU---------", metricsCPU);
	 	const metricsMemory = await this.getMemoryUsage(pod);
		console.log("data Memory---------", metricsMemory);
		const metricNetwork = await this.getNetworkUsage(pod);
		console.log("data Network---------", metricNetwork);
	}

	public async getCpuUsage(pod: string, startDate: Date, endDate: Date): Promise<vectorMetrics> {
		const namespace = this.variables.PROMETHEUS_NAMESPACE_TEZOSLINK;
		const cpuQuery = new URL(`${this.variables.PROMETHEUS_URL}/api/v1/query?query=sum(container_cpu_usage_seconds_total{namespace="${namespace}" , pod!="${pod}"})`);
		const response = (await axios.get(cpuQuery.toString())) as AxiosResponse;
		if (response.status !== HttpCodes.SUCCESS) return Promise.reject(new Error("Cannot scrap prometheus metrics"));
		return response.data.data.result as vectorMetrics;
	}

	public async getMemoryUsage(pod: string): Promise<vectorMetrics> {
		const namespace = this.variables.PROMETHEUS_NAMESPACE_TEZOSLINK;
		const memoryQuery = new URL(`${this.variables.PROMETHEUS_URL}/api/v1/query?query=sum(container_memory_working_set_bytes{namespace="${namespace}", pod!="${pod}"})`);
		const response = (await axios.get(memoryQuery.toString())) as AxiosResponse;
		if (response.status !== HttpCodes.SUCCESS) return Promise.reject(new Error("Cannot scrap prometheus metrics"));
		return response.data.data.result as vectorMetrics;
	}

	public async getNetworkUsage(pod: string): Promise<vectorMetrics> {
		const namespace = this.variables.PROMETHEUS_NAMESPACE_TEZOSLINK;
		const networkQuery = new URL(`${this.variables.PROMETHEUS_URL}/api/v1/query?query=sum(container_network_receive_bytes_total{namespace="${namespace}", pod="${pod}"})`);
		const response = (await axios.get(networkQuery.toString())) as AxiosResponse;
		if (response.status !== HttpCodes.SUCCESS) return Promise.reject(new Error("Cannot scrap prometheus metrics"));
		return response.data.data.result as vectorMetrics;
	}
}
