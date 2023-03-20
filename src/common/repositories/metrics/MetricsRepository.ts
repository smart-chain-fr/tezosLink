import TezosLink from "@Common/databases/TezosLink";
import ObjectHydrate from "@Common/helpers/ObjectHydrate";
import { MetricEntity } from "@Common/ressources";
import { ORMBadQueryError } from "@Common/system/database/exceptions/ORMBadQueryError";
import { type Prisma } from "@prisma/client";
import BaseRepository from "@Repositories/BaseRepository";
import { Service } from "typedi";
import { v4 as uuidv4 } from "uuid";

export class RequestsByDayMetrics {
	date_requested!: Date;
	count!: number;
}

export class CountRpcPathUsage {
	path!: string;
	count!: number;
}

@Service()
export default class MetricsRepository extends BaseRepository {
	constructor(private database: TezosLink) {
		super();
	}
	protected get model() {
		return this.database.getClient().metric;
	}
	protected get instanceDb() {
		return this.database.getClient();
	}

	public async findMany(query: Prisma.MetricFindManyArgs): Promise<MetricEntity[]> {
		try {
			// Use Math.min to limit the number of rows fetched
			const limit = Math.min(query.take || this.defaultFetchRows, this.maxFetchRows);

			// Update the query with the limited limit
			const metrics = await this.model.findMany({ ...query, take: limit });
			return ObjectHydrate.map<MetricEntity>(MetricEntity, metrics, { strategy: "exposeAll" });
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}

	public async findOne(metricEntity: Partial<MetricEntity>): Promise<Partial<MetricEntity> | null> {
		try {
			const metric = await this.model.findUnique({ where: metricEntity });
			return ObjectHydrate.hydrate<MetricEntity>(new MetricEntity(), metric, { strategy: "exposeAll" });
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}

	public async create(metricEntity: Partial<MetricEntity>): Promise<MetricEntity> {
		try {
			const data = { ...metricEntity };
			data.uuid = uuidv4();
			const metric = (await this.model.create({
				data: {
					path: data.path!,
					uuid: data.uuid!,
					remote_address: data.remote_address!,
					date_requested: data.date_requested!,
					project: {
						connect: {
							uuid: data.project!.uuid!,
						},
					},
				},
			})) as MetricEntity;
			return ObjectHydrate.hydrate<MetricEntity>(new MetricEntity(), metric, { strategy: "exposeAll" });
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}

	// Create many metrics in bulk
	public async createMany(metricEntity: Partial<MetricEntity[]>): Promise<MetricEntity[]> {
		try {
			const result: MetricEntity[] = [];

			this.instanceDb.$transaction(async (transaction: Prisma.TransactionClient) => {
				for (const item of metricEntity) {
					if (!item) continue;
					const data = { ...item };
					data.uuid = uuidv4();
					result.push(
						await transaction.metric.create({
							data: {
								path: data.path!,
								uuid: data.uuid!,
								remote_address: data.remote_address!,
								date_requested: data.date_requested!,
								project: {
									connect: {
										uuid: data.project!.uuid,
									},
								},
							},
						}),
					);
				}
			});
			return ObjectHydrate.map<MetricEntity>(MetricEntity, result, { strategy: "exposeAll" });
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}

	// Count Rpc path usage for a specific project
	public async countRpcPathUsage(ProjectUuid: string, from: Date, to: Date): Promise<CountRpcPathUsage[]> {
		try {
			const result: CountRpcPathUsage[] = [];
			const response = await this.model.groupBy({
				by: ["path"],
				_count: {
					path: true,
				},
				where: {
					projectUuid: ProjectUuid,
					date_requested: {
						gte: from,
						lte: to,
					},
				},
			});
			response.forEach((item) => {
				result.push({
					path: item.path,
					count: item._count.path,
				});
			});
			return ObjectHydrate.map<CountRpcPathUsage>(CountRpcPathUsage, response, { strategy: "exposeAll" });
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}

	// Last requests for a specific project
	public async findLastRequests(projectUuid: string, limit: number): Promise<MetricEntity[]> {
		try {
			// Use Math.min to limit the number of rows fetched
			const rows = Math.min(limit || this.defaultFetchRows, this.maxFetchRows);
			const metrics = await this.model.findMany({
				where: {
					projectUuid: projectUuid,
				},
				take: rows,
				orderBy: {
					date_requested: "desc",
				},
			});
			return ObjectHydrate.map<MetricEntity>(MetricEntity, metrics, { strategy: "exposeAll" });
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}

	// Find Requests by Day for a specific project
	public async findRequestsByDay(projectUuid: string, from: Date, to: Date): Promise<RequestsByDayMetrics[]> {
		try {
			const result: RequestsByDayMetrics[] = [];
			const response = await this.model.groupBy({
				by: ["date_requested"],
				_count: {
					date_requested: true,
				},
				where: {
					projectUuid: projectUuid,
					date_requested: {
						gte: from,
						lte: to,
					},
				},
			});

			response.forEach((item) => {
				result.push({
					date_requested: item.date_requested,
					count: item._count.date_requested,
				});
			});
			return ObjectHydrate.map<RequestsByDayMetrics>(RequestsByDayMetrics, result, { strategy: "exposeAll" });
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}

	// Count all metrics by criterias for a specific project
	public async countAll(projectUuid: string): Promise<number> {
		try {
			return this.model.count({
				where: {
					projectUuid: projectUuid,
				},
			}) as Promise<number>;
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}

	// Remove Three months old metrics
	public async removeOldMetricsBymonths(months: number): Promise<void> {
		try {
			const date = new Date();
			date.setMonth(date.getMonth() - months);
			this.model.deleteMany({
				where: {
					date_requested: {
						lte: date,
					},
				},
			});
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}
}

