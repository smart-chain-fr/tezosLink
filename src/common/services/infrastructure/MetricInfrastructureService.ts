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

	public async scrapMetricsByPodAndNamespace(pod: string, namespace: string): Promise<void> {
		const cpuRequest = `kube_pod_container_resource_requests{namespace="${namespace}",pod="${pod}",resource="cpu"}`;
		const cpuLimit = `kube_pod_container_resource_limits{namespace="${namespace}",pod="${pod}",resource="cpu"}`;
		const cpuUsage = `container_cpu_usage_seconds_total{namespace="${namespace}",pod="${pod}"}`;

		const memoryRequest = `container_memory_working_set_bytes{namespace="${namespace}",pod="${pod}"}`;

		const networkReceive = `container_network_receive_bytes_total{namespace="${namespace}",pod="${pod}"}`;
		const networkTransmit = `container_network_transmit_bytes_total{namespace="${namespace}",pod="${pod}"}`;

		try {
			const [cpuRequests, cpuLimits, cpuUsages, memoryUsages, networkReceives, networkTransmits] = await Promise.all([
				this.getPrometheusQueryResult(cpuRequest),
				this.getPrometheusQueryResult(cpuLimit),
				this.getPrometheusQueryResult(cpuUsage),
				this.getPrometheusQueryResult(memoryRequest),
				this.getPrometheusQueryResult(networkReceive),
				this.getPrometheusQueryResult(networkTransmit),
			]);

			// save cpu metrics
			cpuRequests.data.result.forEach(async (result: any) => {
				const podName = result.metric.pod;
				const requestValue = result.value[1];
				const limit = cpuLimits.data.result.find((result: any) => result.metric.pod === podName)?.value[1];
				const usage = cpuUsages.data.result.find((result: any) => result.metric.pod === podName)?.value[1];
				const cpuMetric: Partial<MetricInfrastructureEntity> = {
					podName,
					label: "cpu",
					value: JSON.stringify({
						request: requestValue,
						limit,
						usage,
					}),
					date_requested: new Date(),
					type: "cpu",
				};
				await this.saveMetric(cpuMetric);
			});

			// save memory metrics
			memoryUsages.data.result.forEach(async (result: any) => {
				const podName = result.metric.pod;
				const memoryUsage = result.value[1];
				const memoryMetric: Partial<MetricInfrastructureEntity> = {
					podName,
					label: "memory",
					value: JSON.stringify({
						usage: memoryUsage,
					}),
					date_requested: new Date(),
					type: "memory",
				};
				await this.saveMetric(memoryMetric);
			});

			// save network metrics
			networkReceives.data.result.forEach(async (result: any) => {
				const podName = result.metric.pod;
				const receive = result.value[1];
				const transmit = networkTransmits.data.result.find((result: any) => result.metric.pod === podName)?.value[1];
				const networkMetric: Partial<MetricInfrastructureEntity> = {
					podName,
					label: "network",
					value: JSON.stringify({
						receive,
						transmit,
					}),
					date_requested: new Date(),
					type: "network",
				};
				await this.saveMetric(networkMetric);
			});
		} catch (error) {
			console.error(`Cannot scrap prometheus metrics: ${error}`);
		}
	}

	/**
	 *
	 * @throws {Error} If infrastructure metric cannot be created
	 * @returns
	 */
	private async saveMetric(metricInfrastructureEntity: Partial<MetricInfrastructureEntity>): Promise<Partial<MetricInfrastructureEntity>> {
		const metric = await this.metricInfrastructureRepository.create(metricInfrastructureEntity);
		if (!metric) return Promise.reject(new Error("Cannot create infrastructure metric"));
		return metric;
	}

	private async getPrometheusQueryResult(query: string): Promise<PrometheusQueryResult> {
		const url = new URL(`${this.variables.PROMETHEUS_URL}/api/v1/query?query=${query}`);

		const response = await axios.get(url.toString());
		if (response.status !== HttpCodes.SUCCESS) {
			throw new Error(`Cannot get prometheus query result: ${response.status}`);
		}
		return response.data;
	}
}
