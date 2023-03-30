import TezosLink from "@Common/databases/TezosLink";
import ObjectHydrate from "@Common/helpers/ObjectHydrate";
import { MetricEntity } from "@Common/ressources";
import { ORMBadQueryError } from "@Common/system/database/exceptions/ORMBadQueryError";
import { type Prisma } from "@prisma/client";
import BaseRepository from "@Repositories/BaseRepository";
import TypeOfRequestRepository from "@Repositories/dictionnaries/TypeOfRequetsRepository";
import { Service } from "typedi";
import { v4 as uuidv4 } from "uuid";

export class RequestsByDayMetrics {
	date!: string;
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
	take?: number;
	skip?: number;
};

@Service()
export default class MetricsRepository extends BaseRepository {
	constructor(private database: TezosLink, private typeOfRequestRepository: TypeOfRequestRepository) {
		super();
	}
	protected get model() {
		return this.database.getClient().metric;
	}
	protected get instanceDb() {
		return this.database.getClient();
	}
	/**
	 * Find all metrics by query
	 * @param query
	 * @returns {Promise<{ data: MetricEntity[]; metadata: { count: number; limit: number; page: number; total: number } }>}
	 * @throws {ORMBadQueryError}
	 */
	public async findMany(query: MetricQuery): Promise<{ data: MetricEntity[]; metadata: { count: number; limit: number; page: number; total: number } }> {
		try {
			const { where, skip = 0, take } = query;
			const { projectUuid, node, from, to, type: requestType, status } = where;

			const page = Math.max(1, Math.floor(Number(skip) / (take || 10)) + 1);
			const limit = take ? Math.min(Math.max(1, Number(take)), this.defaultFetchRows) : this.defaultFetchRows; // Set a maximum limit of 100 records per page
			const offset = (page - 1) * limit;
			const whereClause: Prisma.MetricWhereInput = {
				projectUuid,
				node,
				dateRequested: {
					gte: from ? (Date.parse(from) ? new Date(from).toISOString() : new Date(parseInt(from)).toISOString()) : undefined,
					lte: to ? (Date.parse(to) ? new Date(to).toISOString() : new Date(parseInt(to)).toISOString()) : undefined,
				},
				typeOfRequestUuid: requestType || undefined,
				status: status || undefined,
			};

			const totalCount = await this.model.count({ where: whereClause });

			const metrics = await this.model.findMany({
				take: limit,
				skip: offset,
				where: whereClause,
				orderBy: {
					dateRequested: "desc",
				},
				include: {
					typeOfRequest: true,
				},
			});

			const metadata = {
				count: metrics.length,
				limit,
				page,
				total: Math.ceil(totalCount),
			};

			return { data: ObjectHydrate.map<MetricEntity>(MetricEntity, metrics, { strategy: "exposeAll" }), metadata };
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}

	/**
	 * Find one metric by query
	 * @param metricEntity
	 * @returns {Promise<Partial<MetricEntity> | null>}
	 * @throws {ORMBadQueryError}
	 */
	public async findOne(metricEntity: Partial<MetricEntity>): Promise<Partial<MetricEntity> | null> {
		try {
			const metric = await this.model.findUnique({ where: metricEntity });
			return ObjectHydrate.hydrate<MetricEntity>(new MetricEntity(), metric, { strategy: "exposeAll" });
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}

	/**
	 * Create one metric
	 * @param metricEntity
	 * @returns {Promise<MetricEntity>}
	 * @throws {ORMBadQueryError}
	 */
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
					typeOfRequest: {
						connect: {
							uuid: data.typeOfRequest!.uuid!,
						},
					},
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

	/** Create many metrics
	 * @param metricEntity
	 * @returns {Promise<MetricEntity[]>}
	 * @throws {ORMBadQueryError}
	 */
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
								typeOfRequest: {
									connect: {
										uuid: data.typeOfRequest!.uuid!,
									},
								},
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

	/**
	 * Get the count of metrics by project
	 * @param projectUuid
	 * @param from
	 * @param to
	 * @returns {Promise<CountRpcPathUsage[]>}
	 * @throws {ORMBadQueryError}
	 */
	public async countRpcPathUsage(projectUuid: string, from: string, to: string): Promise<CountRpcPathUsage[]> {
		try {
			const result: CountRpcPathUsage[] = [];
			const response = await this.model.groupBy({
				by: ["typeOfRequestUuid"],
				_count: {
					typeOfRequestUuid: true,
				},
				where: {
					projectUuid,
					dateRequested: {
						gte: from ? (Date.parse(from) ? new Date(from).toISOString() : new Date(parseInt(from)).toISOString()) : undefined,
						lte: to ? (Date.parse(to) ? new Date(to).toISOString() : new Date(parseInt(to)).toISOString()) : undefined,
					},
				},
			});

			for (const item of response) {
				const path = await this.typeOfRequestRepository.findOneByUuid(item.typeOfRequestUuid);
				result.push({
					path: path!.path,
					count: item._count.typeOfRequestUuid,
				});
			}
			return ObjectHydrate.map<CountRpcPathUsage>(CountRpcPathUsage, result, { strategy: "exposeAll" });
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}

	/**
	 * Find all requests by criterias
	 * @param projectUuid
	 * @param limit
	 * @returns {Promise<MetricEntity[]>}
	 * @throws {ORMBadQueryError}
	 */
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

	/** Find requests by day
	 * @param projectUuid
	 * @param from
	 * @param to
	 * @returns {Promise<RequestsByDayMetrics[]>}
	 * @throws {ORMBadQueryError}
	 */
	public async findRequestsByDay(projectUuid: string, from?: string, to?: string): Promise<RequestsByDayMetrics[]> {
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
						gte: from ? (Date.parse(from) ? new Date(from).toISOString() : new Date(parseInt(from)).toISOString()) : undefined,
						lte: to ? (Date.parse(to) ? new Date(to).toISOString() : new Date(parseInt(to)).toISOString()) : undefined,
					},
				},
				orderBy: {
					dateRequested: "desc",
				},
			});

			response.forEach((item) => {
				result.push({
					date: item.dateRequested.toISOString(),
					count: item._count.dateRequested,
				});
			});
			return ObjectHydrate.map<RequestsByDayMetrics>(RequestsByDayMetrics, result, { strategy: "exposeAll" });
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}

	/** Count all requests
	 * @param projectUuid
	 * @param from
	 * @param to
	 * @returns {Promise<number>}
	 * @throws {ORMBadQueryError}
	 */
	public async countAll(projectUuid: string, from: string, to: string): Promise<number> {
		try {
			return this.model.count({
				where: {
					projectUuid: projectUuid,
					dateRequested: {
						gte: from ? (Date.parse(from) ? new Date(from).toISOString() : new Date(parseInt(from)).toISOString()) : undefined,
						lte: to ? (Date.parse(to) ? new Date(to).toISOString() : new Date(parseInt(to)).toISOString()) : undefined,
					},
				},
			}) as Promise<number>;
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}

	/** World map requests
	 * @returns {Promise<MetricEntity[]>}
	 * @throws {ORMBadQueryError}
	 */
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
}
