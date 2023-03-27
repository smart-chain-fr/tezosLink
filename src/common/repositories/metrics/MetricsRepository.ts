import TezosLink from "@Common/databases/TezosLink";
import ObjectHydrate from "@Common/helpers/ObjectHydrate";
import { MetricEntity } from "@Common/ressources";
import { ORMBadQueryError } from "@Common/system/database/exceptions/ORMBadQueryError";
import { type Prisma } from "@prisma/client";
import BaseRepository from "@Repositories/BaseRepository";
import { Service } from "typedi";
import { v4 as uuidv4 } from "uuid";

export class RequestsByDayMetrics {
	date!: Date;
	count!: number;
}

export class CountRpcPathUsage {
	path!: string;
	count!: number;
}

type MetricQuery = {
	where: {
		projectUuid: string;
		node?: string;
		from?: string;
		to?: string;
		type?: string;
		status?: string;
	};
	_limit?: number;
	_page?: number;
};

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

	public async findMany(query: MetricQuery): Promise<{ data: MetricEntity[], metadata: { count: number, limit: number, offset: number, total: number } }> {
		try {
			const { where, _page = 1, _limit } = query;
			const { projectUuid, node, from, to, type: requestType, status } = where;
	
			// Use Math.max to limit the number of rows fetched
			const limit = _limit && _limit < this.defaultFetchRows ? _limit : this.defaultFetchRows;
			const offset = (Math.max(1, _page) - 1) * limit;
	
			const whereClause: Prisma.MetricWhereInput = {
				projectUuid,
				node,
				dateRequested: {
					gte: from ? (Date.parse(from) ? new Date(from).toISOString() : new Date(parseInt(from)).toISOString()) : undefined,
					lte: to ? (Date.parse(to) ? new Date(to).toISOString() : new Date(parseInt(to)).toISOString()) : undefined,
				},
				path: requestType || undefined,
				status: status || undefined,
			};
	
			// Count the total number of matching records
			const count = await this.model.count({ where: whereClause });
	
			// Update the query with the limited limit, offset, and where clause
			const metrics = await this.model.findMany({
				take: limit,
				skip: offset,
				where: whereClause,
			});
	
			// Create the metadata object
			const metadata = {
				count,
				limit,
				offset,
				total: count,
			};
	
			// Return the result as an object with 'data' and 'metadata' properties
			return { data: ObjectHydrate.map<MetricEntity>(MetricEntity, metrics, { strategy: "exposeAll" }), metadata };
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
					remoteAddress: data.remoteAddress!,
					dateRequested: data.dateRequested!,
					node: data.node!,
					status: data.status!,
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
								remoteAddress: data.remoteAddress!,
								dateRequested: data.dateRequested!,
								node: data.node!,
								status: data.status!,
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
					dateRequested: {
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
	public async findAllRequestsByCriterias(projectUuid: string, limit: number): Promise<MetricEntity[]> {
		try {
			// Use Math.min to limit the number of rows fetched
			const rows = Math.min(limit || this.defaultFetchRows, this.maxFetchRows);
			const metrics = await this.model.findMany({
				where: {
					projectUuid: projectUuid,
				},
				take: rows,
				orderBy: {
					dateRequested: "desc",
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
				by: ["dateRequested"],
				_count: {
					dateRequested: true,
				},
				where: {
					projectUuid: projectUuid,
					dateRequested: {
						gte: from,
						lte: to,
					},
				},
			});

			response.forEach((item) => {
				result.push({
					date: item.dateRequested,
					count: item._count.dateRequested,
				});
			});
			return ObjectHydrate.map<RequestsByDayMetrics>(RequestsByDayMetrics, result, { strategy: "exposeAll" });
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}

	// Count all metrics by criterias for a specific project
	public async countAll(projectUuid: string, from: Date, to: Date): Promise<number> {
		try {
			return this.model.count({
				where: {
					projectUuid: projectUuid,
					dateRequested: {
						gte: from,
						lte: to,
					},
				},
			}) as Promise<number>;
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}

	// All requests for the world map
	public async findAllRequestsWorldMap(): Promise<MetricEntity[]> {
		try {
			// Use Math.min to limit the number of rows fetched
			const metrics = await this.model.findMany({
				orderBy: {
					dateRequested: "desc",
				},
			});
			return ObjectHydrate.map<MetricEntity>(MetricEntity, metrics, { strategy: "exposeAll" });
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
					dateRequested: {
						lte: date,
					},
				},
			});
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}
	// Find all paths
	public async findPathDictionary(): Promise<string[]> {
		try {
			const paths = await this.model.findMany({
				distinct: ["path"],
				select: { path: true },
			});
			return paths.map((path) => path.path);
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}
}