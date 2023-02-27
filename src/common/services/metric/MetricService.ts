import MetricRepository from "@Common/repositories/MetricsRepository";
import { MetricEntity } from "@Common/ressources";
import { type processFindManyQuery } from "prisma-query";
import { Service } from "typedi";

@Service()
export default class MetricService {
	constructor(private metricRepository: MetricRepository) {}

	/**
	 * @throws {Error} If metrics are undefined
	 */
	public async getByCriterias(query: ReturnType<typeof processFindManyQuery>) {
		return await this.metricRepository.findMany(query);
	}
	/**
	 * @throws {Error} If metric is undefined
	 */
	public async getByUUID(metricEntity: Partial<MetricEntity>) {
		const metric = await this.metricRepository.findOne(metricEntity);
		if (!metric) return null;
		return metric;
	}
	/**
	 *
	 * @throws {Error} If metric cannot be created
	 * @returns
	 */
	public async create(metricEntity: Partial<MetricEntity>) {
		const metric = await this.metricRepository.create(metricEntity);
		if (!metric) return null;
		return metric;
	}

	/**
     * 
     * @throws {Error} If metric is undefined
     * @returns 
     */
		public async getCountRpcPath(metricEntity: Partial<MetricEntity>, from: Date, to: Date) {
			const pathsCount = await this.metricRepository.countRpcPathUsage(metricEntity.projectId!,from,to);
			if (!pathsCount) return null;
			return pathsCount;
		}
	/**
	 * 	
	 * @throws {Error} If metric is undefined	
	 * @returns
	 */
	public async getCountAllMetrics(metricEntity: Partial<MetricEntity>) {
		const count = await this.metricRepository.countAll(metricEntity.projectId!);
		if (isNaN(count)) return null;
		return count;
	}

	/**
	 * 
	 * @throws {Error} If metric is undefined
	 * @returns
	 */
	public async getLastMetrics(metricEntity: Partial<MetricEntity>, limit: number){
		return await this.metricRepository.findLastRequests(metricEntity.projectId!,limit);
	}

	/**
	 * 
	 * @throws {Error} If metric is undefined
	 * @returns
	 */
	public async getRequestsByDay(metricEntity: Partial<MetricEntity>, from: Date, to: Date){
		return await this.metricRepository.findRequestsByDay(metricEntity.projectId!,from,to);
	}

	/**
	 * 	
	 * @throws {Error} If metric is undefined
	 * @returns
	 */
	public async removeThreeMontsOldMetrics() {
		const months = 3;
		await this.metricRepository.removeOldMetricsBymonths(months);
	}
}

