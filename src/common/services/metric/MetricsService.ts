import MetricsRepository, { CountRpcPathUsage, RequestsByDayMetrics } from "@Common/repositories/metrics/MetricsRepository";
import { MetricEntity } from "@Common/ressources";
import BaseService from "@Services/BaseService";
import { type processFindManyQuery } from "prisma-query";
import { Service } from "typedi";
import * as geoip from "geoip-lite";

type queryParameters = {
	projectUuid: string;
	from?: string;
	to?: string;
	by?: string;
	limit?: number;
};

enum EDateBy {
	day = "day",
	hour = "hour",
}

/**
 * Metrics service
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
	 * @param {queryParameters} query
	 * @returns {Promise<number>}
	 * @memberof MetricsService
	 * */
	public async getCountRpcPath(query: queryParameters): Promise<CountRpcPathUsage[]> {
		const { projectUuid, from, to } = query;
		return await this.metricRepository.countRpcPathUsage(projectUuid, from!, to!);
	}

	/**
	 * Get count of metrics by criterias
	 * @param {queryParameters} query
	 * @returns {Promise<number>}
	 * @memberof MetricsService
	 * */
	public async getCountAllMetricsByCriterias(query: queryParameters): Promise<number> {
		const { projectUuid, from, to } = query;
		const count = await this.metricRepository.countAll(projectUuid, from!, to!);
		if (isNaN(count)) Promise.reject("Cannot get count of metrics");
		return count;
	}

	/**
	 * Get metrics by day
	 * @param {queryParameters} query
	 * @returns {Promise<RequestsByDayMetrics[]>}
	 * @memberof MetricsService
	 * */
	public async getRequestsByDay(query: queryParameters): Promise<RequestsByDayMetrics[]> {
		const { projectUuid, from, to, by = EDateBy.hour } = query;

		const results = await this.metricRepository.findRequestsByDay(projectUuid, from, to);

		const formattedResults: RequestsByDayMetrics[] = results.reduce((acc: any, curr) => {
			const currentDate = new Date(curr.date).toISOString();
			const date = by === "hour" ? currentDate.substring(0, 13) + ":00:00.000Z" : currentDate.substring(0, 10) + "T00:00:00.000Z";
			const existing: any = acc.find((item: any) => item.date === date);

			if (existing) {
				existing.count += curr.count;
			} else {
				acc.push({ date, count: curr.count });
			}

			return acc;
		}, []);

		return formattedResults;
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
			const ipList = element.remoteAddress;
			const ip = ipList.includes(",") ? ipList.split(",")[0]!.toString() : ipList; // get the first ip
			const geo = geoip.lookup(ip);
			const country = geo?.country; // get the country from the geo lookup result
			if (country) {
				countries[country] = (countries[country] || 0) + 1; // increment the count for the country
			}
		});

		const data = Object.entries(countries).map(([country, count]) => ({ country, count }));
		return { data };
	}
}
