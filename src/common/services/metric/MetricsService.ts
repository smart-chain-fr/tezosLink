import MetricsRepository, { CountRpcPathUsage, RequestsByDayMetrics } from "@Common/repositories/metrics/MetricsRepository";
import { MetricEntity } from "@Common/ressources";
import BaseService from "@Services/BaseService";
import { type processFindManyQuery } from "prisma-query";
import { Service } from "typedi";
import * as geoip from "geoip-lite";

/**
 * Metrics service
 * @export
 * @class MetricsService
 * @extends {BaseService}
 * */
@Service()
export default class MetricsService extends BaseService {
	constructor(private metricRepository: MetricsRepository) {
		super();
	}

	/** Get all metrics by criterias
	 * @param query
	 * @returns {Promise<{ data: MetricEntity[]; metadata: { count: number; limit: number; page: number; total: number } }>}
	 * @memberof MetricsService
	 * */
	public async getByCriterias(query: ReturnType<typeof processFindManyQuery>): Promise<{ data: MetricEntity[]; metadata: { count: number; limit: number; page: number; total: number } }> {
		return await this.metricRepository.findMany(query);
	}
	/**
	 * Create a metric
	 * @param {Partial<MetricEntity>} metricEntity
	 * @returns {Promise<Partial<MetricEntity>>}
	 * @memberof MetricsService
	 * */
	public async create(metricEntity: Partial<MetricEntity>): Promise<Partial<MetricEntity>> {
		return await this.metricRepository.create(metricEntity);
	}

	/**
	 * Get count of metrics by criterias
	 * @param {string} uuid
	 * @param {Date} from
	 * @param {Date} to
	 * @returns {Promise<number>}
	 * @memberof MetricsService
	 * */
	public async getCountRpcPath(uuid: string, from: Date, to: Date): Promise<CountRpcPathUsage[]> {
		return await this.metricRepository.countRpcPathUsage(uuid, from, to);
	}
	/**
	 * Get count of metrics by criterias
	 * @param {string} uuid
	 * @param {Date} from
	 * @param {Date} to
	 * @returns {Promise<number>}
	 * @memberof MetricsService
	 * */
	public async getCountAllMetricsByCriterias(uuid: string, from: Date, to: Date): Promise<number> {
		const count = await this.metricRepository.countAll(uuid, from, to);
		if (isNaN(count)) Promise.reject("Cannot get count of metrics");
		return count;
	}

	/**
	 * Get latest metrics
	 * @param {string} uuid
	 * @param {number} limit
	 * @returns {Promise<MetricEntity[]>}
	 * @memberof MetricsService
	 * */
	public async getLastMetrics(uuid: string, limit: number): Promise<MetricEntity[]> {
		return await this.metricRepository.findAllRequestsByCriterias(uuid, limit);
	}

	/**
	 * Get metrics by day
	 * @param {string} uuid
	 * @param {Date} from
	 * @param {Date} to
	 * @returns {Promise<RequestsByDayMetrics[]>}
	 * @memberof MetricsService
	 * */
	public async getRequestsByDay(uuid: string, from: Date, to: Date): Promise<RequestsByDayMetrics[]> {
		return await this.metricRepository.findRequestsByDay(uuid, from, to);
	}

	/**
	 * Remove metrics older than 3 months
	 * @returns {Promise<void>}
	 * @memberof MetricsService
	 * */
	public async removeThreeMontsOldMetrics(): Promise<void> {
		const months = 3;
		await this.metricRepository.removeOldMetricsBymonths(months);
	}

	/**
	 * World map metrics
	 * @returns {Promise<{ data: { country: string; count: number }[] }>}
	 * @memberof MetricsService
	 * */
	public async worldMapMetrics(): Promise<{ data: { country: string; count: number }[] }> {
		const metrics = await this.metricRepository.findAllRequestsWorldMap();
		const countries: { [key: string]: number } = {}; // map each country to its count

		metrics.forEach((element) => {
			const ip = element.remoteAddress;
			const geo = geoip.lookup(ip);
			const country = geo?.country; // get the country from the geo lookup result
			if (country) {
				countries[country] = (countries[country] || 0) + 1; // increment the count for the country
			}
		});

		const data = Object.entries(countries).map(([country, count]) => ({ country, count }));
		return { data };
	}
	/**
	 * Get path dictionary
	 * @returns {Promise<string[]>}
	 * @memberof MetricsService
	 * */
	public async getPathDictionary(): Promise<string[]> {
		const paths = await this.metricRepository.findPathDictionary();
		return paths;
	}
}
