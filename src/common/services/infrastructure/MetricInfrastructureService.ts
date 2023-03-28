import { BackendVariables } from "@Common/config/variables/Variables";
import { MetricInfrastructureEntity } from "@Common/ressources";
import HttpCodes from "@Common/system/controller-pattern/HttpCodes";
import MetricsInfrastrucutreRepository from "@Repositories/infrastructure/MetricsInfrastrucutreRepository";
import BaseService from "@Services/BaseService";
import axios from "axios";
import { type processFindManyQuery } from "prisma-query";
import { Service } from "typedi";

interface PrometheusQueryResult {
	status: string;
	data: {
		resultType: string;
		result: any[];
	};
}

enum MetricType {
	CPU_USAGE = "cpu-usage",
	CPU_LIMIT = "cpu-limit",
	CPU_REQUESTED = "cpu-requested",
	RAM_USAGE = "ram-usage",
	RAM_LIMIT = "ram-limit",
	RAM_REQUESTED = "ram-requested",
	NETWORK_RECEIVE = "network-receive",
	NETWORK_TRANSMIT = "network-transmit",
}

interface MetricQuery {
	query: string;
	type: MetricType;
}

/**
 * Metric infrastructure service
 * @export
 * @class MetricsInfrastructureService
 * @extends {BaseService}
 * */
@Service()
export default class MetricsInfrastructureService extends BaseService {
	constructor(private metricInfrastructureRepository: MetricsInfrastrucutreRepository, private variables: BackendVariables) {
		super();
	}

	/**
	 * Get metrics by criterias
	 * @param {ReturnType<typeof processFindManyQuery>} query
	 * @returns {Promise<{ data: MetricInfrastructureEntity[]; metadata: { count: number; limit: number; page: number; total: number } }>}
	 * @memberof MetricsInfrastructureService
	 * */
	public async getByCriterias(query: ReturnType<typeof processFindManyQuery>): Promise<{ data: MetricInfrastructureEntity[]; metadata: { count: number; limit: number; page: number; total: number } }> {
		return await this.metricInfrastructureRepository.findMany(query);
	}
	/**
	 * Scrap metrics by pod and namespace
	 * @param {string} pod
	 * @param {string} namespace
	 * @returns {Promise<void>}
	 * @memberof MetricsInfrastructureService
	 * */
	public async scrapMetricsByPodAndNamespace(pod: string, namespace: string): Promise<void> {
		const metricQueries: MetricQuery[] = [
			{ query: `kube_pod_container_resource_limits{namespace="${namespace}",pod="${pod}",resource="cpu"}`, type: MetricType.CPU_LIMIT },
			{ query: `kube_pod_container_resource_requests{namespace="${namespace}",pod="${pod}",resource="cpu"}`, type: MetricType.CPU_REQUESTED },
			{ query: `container_cpu_usage_seconds_total{namespace="${namespace}",pod="${pod}"}`, type: MetricType.CPU_USAGE },
			{ query: `container_memory_working_set_bytes{namespace="${namespace}",pod="${pod}"}`, type: MetricType.RAM_USAGE },
			{ query: `kube_pod_container_resource_limits{namespace="${namespace}",pod="${pod}",resource="memory"}`, type: MetricType.RAM_LIMIT },
			{ query: `kube_pod_container_resource_requests{namespace="${namespace}",pod="${pod}",resource="memory"}`, type: MetricType.RAM_REQUESTED },
			{ query: `container_network_receive_bytes_total{namespace="${namespace}",pod="${pod}"}`, type: MetricType.NETWORK_RECEIVE },
			{ query: `container_network_transmit_bytes_total{namespace="${namespace}",pod="${pod}"}`, type: MetricType.NETWORK_TRANSMIT },
		];

		try {
			const queryResults = await Promise.all(metricQueries.map((metricQuery) => this.getPrometheusQueryResult(metricQuery.query)));

			// save metrics
			const metrics = queryResults.map((queryResult, index) => ({
				value: queryResult?.data?.result?.[0]?.value?.[1] ?? undefined,
				type: metricQueries[index]!.type ?? "",
			}));

			await Promise.all(
				metrics
					.filter((metric) => metric.value !== undefined)
					.map((metric) => {
						const metricEntity: Partial<MetricInfrastructureEntity> = {
							podName: pod,
							value: metric.value!,
							dateRequested: new Date(),
							type: metric.type!,
						};
						return this.saveMetric(metricEntity);
					}),
			);
		} catch (error) {
			console.error(`Cannot scrap prometheus metrics: ${error}`);
		}
	}

	/**
	 * Save metric
	 * @param {Partial<MetricInfrastructureEntity>} metricInfrastructureEntity
	 * @returns {Promise<Partial<MetricInfrastructureEntity>>}
	 * @memberof MetricsInfrastructureService
	 * */
	private async saveMetric(metricInfrastructureEntity: Partial<MetricInfrastructureEntity>): Promise<Partial<MetricInfrastructureEntity>> {
		const metric = await this.metricInfrastructureRepository.create(metricInfrastructureEntity);
		if (!metric) return Promise.reject(new Error("Cannot create infrastructure metric"));
		return metric;
	}
	/**
	 * Get prometheus query result
	 * @param {string} query
	 * @returns {Promise<PrometheusQueryResult>}
	 * @memberof MetricsInfrastructureService
	 * */
	private async getPrometheusQueryResult(query: string): Promise<PrometheusQueryResult> {
		const url = new URL(`${this.variables.PROMETHEUS_URL}/api/v1/query?query=${query}`);

		const response = await axios.get(url.toString());
		if (response.status !== HttpCodes.SUCCESS) {
			throw new Error(`Cannot get prometheus query result: ${response.status}`);
		}
		return response.data;
	}
}
