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

	public async scrapMetrics(): Promise<void> {
		const cpuQuery = new URL(`${this.variables.PROMETHEUS_URL}/api/v1/query?query=sum by (pod) (rate(container_cpu_usage_seconds_total{}[1m]))`);
		const response = (await axios.get(cpuQuery.toString())) as AxiosResponse;
		if (response.status !== HttpCodes.SUCCESS) return Promise.reject(new Error("Cannot scrap prometheus metrics"));
		const metrics = response.data.data.result as vectorMetrics;
		console.log("data Hydrated---------", metrics);
		/* const { result } = data;
		const metrics = result.map((metric: any) => {
			const { metric: metricName, value } = metric;
			const { __name__: name, ...labels } = metricName;
			return {
				name,
				labels,
				value,
			};
		});
		const metricInfrastructureEntity = metrics.map((metric: any) => {
			const { name, labels, value } = metric;
			return {
				name,
				labels,
				value,
			};
		}); */
		//console.log("metricInfrastructureEntity ---------",metricInfrastructureEntity);
		//await this.saveMetric(metricInfrastructureEntity);
	}

	public async getCpuUsage(pod: string, startDate: Date, endDate: Date): Promise<vectorMetrics> {
		const namespace = this.variables.PROMETHEUS_NAMESPACE;
		const cpuQuery = new URL(`${this.variables.PROMETHEUS_URL}/api/v1/query?query=sum by (pod) (rate(container_cpu_usage_seconds_total{namespace="${namespace}" pod="${pod}"}[1m]))`);
		const response = (await axios.get(cpuQuery.toString())) as AxiosResponse;
		if (response.status !== HttpCodes.SUCCESS) return Promise.reject(new Error("Cannot scrap prometheus metrics"));
		const metrics = response.data.data.result as vectorMetrics;
		return metrics;
	}

	public async getMemoryUsage(pod: string): Promise<vectorMetrics> {
		const namespace = this.variables.PROMETHEUS_NAMESPACE;
		const memoryQuery = new URL(`${this.variables.PROMETHEUS_URL}/api/v1/query?query=sum by (pod) (container_memory_working_set_bytes{namespace="${namespace}" pod="${pod}"})`);
		const response = (await axios.get(memoryQuery.toString())) as AxiosResponse;
		if (response.status !== HttpCodes.SUCCESS) return Promise.reject(new Error("Cannot scrap prometheus metrics"));
		const metrics = response.data.data.result as vectorMetrics;
		return metrics;
	}

	public async getNetworkUsage(pod: string): Promise<vectorMetrics> {
		const namespace = this.variables.PROMETHEUS_NAMESPACE;
		const networkQuery = new URL(`${this.variables.PROMETHEUS_URL}/api/v1/query?query=sum by (pod) (rate(container_network_receive_bytes_total{namespace="${namespace}" pod="${pod}"}[1m]))`);
		const response = (await axios.get(networkQuery.toString())) as AxiosResponse;
		if (response.status !== HttpCodes.SUCCESS) return Promise.reject(new Error("Cannot scrap prometheus metrics"));
		const metrics = response.data.data.result as vectorMetrics;
		return metrics;
	}
}
