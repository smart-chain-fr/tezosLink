import MetricsRepository, { CountRpcPathUsage, RequestsByDayMetrics } from "@Common/repositories/metrics/MetricsRepository";
import { MetricEntity } from "@Common/ressources";
import BaseService from "@Services/BaseService";
import { type processFindManyQuery } from "prisma-query";
import { Service } from "typedi";

@Service()
export default class MetricsService extends BaseService {
	constructor(private metricRepository: MetricsRepository) {
		super();
	}

	/**
	 * @throws {Error} If metrics are undefined
	 */
	public async getByCriterias(query: ReturnType<typeof processFindManyQuery>): Promise<MetricEntity[]> {
		return await this.metricRepository.findMany(query);
	}
	/**
	 *
	 * @throws {Error} If metric cannot be created
	 * @returns
	 */
	public async create(metricEntity: Partial<MetricEntity>): Promise<Partial<MetricEntity>> {
		const metric = await this.metricRepository.create(metricEntity);
		if (!metric) return Promise.reject(new Error("Cannot create metric"));
		return metric;
	}

	/**
	 *
	 * @throws {Error} If metric is undefined
	 * @returns
	 */
	public async getCountRpcPath(uuid: string, from: Date, to: Date): Promise<CountRpcPathUsage[]> {
		const pathsCount = await this.metricRepository.countRpcPathUsage(uuid, from, to);
		if (!pathsCount) return Promise.reject(new Error("Cannot get count of rpc path"));
		return pathsCount;
	}
	/**
	 *
	 * @throws {Error} If metric is undefined
	 * @returns
	 */
	public async getCountAllMetrics(metricEntity: Partial<MetricEntity>): Promise<number> {
		const count = await this.metricRepository.countAll(metricEntity.projectUuid!);
		if (isNaN(count)) Promise.reject(new Error("Cannot get count of metrics"));
		return count;
	}

	/**
	 *
	 * @throws {Error} If metric is undefined
	 * @returns
	 */
	public async getLastMetrics(uuid: string, limit: number): Promise<MetricEntity[]> {
		return await this.metricRepository.findLastRequests(uuid, limit);
	}

	/**
	 *
	 * @throws {Error} If metric is undefined
	 * @returns
	 */
	public async getRequestsByDay(uuid: string, from: Date, to: Date): Promise<RequestsByDayMetrics[]> {
		return await this.metricRepository.findRequestsByDay(uuid, from, to);
	}

	/**
	 *
	 * @throws {Error} If metric is undefined
	 * @returns
	 */
	public async removeThreeMontsOldMetrics(): Promise<void> {
		const months = 3;
		await this.metricRepository.removeOldMetricsBymonths(months);
	}

	/**
	 *
	 * @throws {Error} If metric cannot be deleted
	 * @returns
	 */
	public async delete(metricEntity: Partial<MetricEntity>): Promise<void> {
		try {
			await this.metricRepository.delete(metricEntity);
		} catch (error) {
			throw new Error("Cannot delete metric");
		}
	}
}
