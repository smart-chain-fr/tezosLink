import MetricsRepository from "@Common/repositories/metrics/MetricsRepository";
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
	public async getByCriterias(query: ReturnType<typeof processFindManyQuery>) {
		return await this.metricRepository.findMany(query);
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
		public async getCountRpcPath(uuid: string, from: Date, to: Date) {
			const pathsCount = await this.metricRepository.countRpcPathUsage(uuid,from,to);
			if (!pathsCount) return null;
			return pathsCount;
		}
	/**
	 * 	
	 * @throws {Error} If metric is undefined	
	 * @returns
	 */
	public async getCountAllMetrics(metricEntity: Partial<MetricEntity>) {
		const count = await this.metricRepository.countAll(metricEntity.uuid!);
		if (isNaN(count)) return null;
		return count;
	}

	/**
	 * 
	 * @throws {Error} If metric is undefined
	 * @returns
	 */
	public async getLastMetrics(uuid: string, limit: number){
		return await this.metricRepository.findLastRequests(uuid,limit);
	}

	/**
	 * 
	 * @throws {Error} If metric is undefined
	 * @returns
	 */
	public async getRequestsByDay(uuid: string, from: Date, to: Date){
		return await this.metricRepository.findRequestsByDay(uuid,from,to);
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

