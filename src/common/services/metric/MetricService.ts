import ObjectHydrate from "@Common/helpers/ObjectHydrate";
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
		const metrics = await this.metricRepository.findMany(query);
		return ObjectHydrate.map(MetricEntity, metrics);
	}
	/**
	 * @throws {Error} If metric is undefined
	 */
	public async getByUUID(metricEntity: Partial<MetricEntity>) {
		const metric = await this.metricRepository.findOne(metricEntity);
		if (!metric) return null;
		return ObjectHydrate.hydrate<Partial<MetricEntity>>(new MetricEntity(), metric);
	}
	/**
	 *
	 * @throws {Error} If metric cannot be created
	 * @returns
	 */
	public async create(metricEntity: Partial<MetricEntity>) {
		const metric = await this.metricRepository.create(metricEntity);
		if (!metric) return null;
		return ObjectHydrate.hydrate<Partial<MetricEntity>>(new MetricEntity(), metric);
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
		const metrics = await this.metricRepository.findLastRequests(metricEntity.projectId!,limit);
		return ObjectHydrate.map(MetricEntity, metrics);
	}

	/**
	 * 
	 * @throws {Error} If metric is undefined
	 * @returns
	 */
	public async getRequestsByDay(metricEntity: Partial<MetricEntity>, from: Date, to: Date){
		const metrics = await this.metricRepository.findRequestsByDay(metricEntity.projectId!,from,to);
		return ObjectHydrate.map(MetricEntity, metrics);
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

