import TezosLink from "@Common/databases/TezosLink";
import ObjectHydrate from "@Common/helpers/ObjectHydrate";
import { MetricEntity } from "@Common/ressources";
import { ORMBadQueryError } from "@Common/system/database/exceptions/ORMBadQueryError";
import { type Prisma } from "@prisma/client";
import { Service } from "typedi";

export class RequestsByDayMetrics {
	date_requested!: Date;
	count!: number;
};

@Service()
export default class MetricRepository {
	constructor(private database: TezosLink) {}
	protected get model() {
		return this.database.getClient().metric;
	}
	protected get instanceDb() {
		return this.database.getClient();
	}

	public async findMany(query: any): Promise<MetricEntity[]> {
		try {
			const metrics = await this.model.findMany(query);
			return ObjectHydrate.map<MetricEntity>(MetricEntity, metrics, { strategy: "exposeAll" });
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}

	public async findOne(metricEntity: Partial<MetricEntity>): Promise<Partial<MetricEntity> | null> {
		try {
			const data = { ...metricEntity };
			const metric = await this.model.findUnique({ where: data });
			return ObjectHydrate.hydrate<MetricEntity>(new MetricEntity(), metric, { strategy: "exposeAll" });
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}

	public async create(metricEntity: Partial<MetricEntity>): Promise<MetricEntity> {
		try {
			const metric = (await this.model.create({
				data: {
					path: metricEntity.path!,
					uuid: metricEntity.uuid!,
					remote_address: metricEntity.remote_address!,
					date_requested: metricEntity.date_requested!,
					project: {
						connect: {
							uuid: metricEntity.project!.uuid!,
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
			const data = { ...metricEntity };
			const result: MetricEntity[] = [];

			this.instanceDb.$transaction(async (transaction: Prisma.TransactionClient) => {
				for (const item of data) {
					if (!item) continue;
					result.push(
						await transaction.metric.create({
							data: {
								path: item.path!,
								uuid: item.uuid!,
								remote_address: item.remote_address!,
								date_requested: item.date_requested!,
								project: {
									connect: {
										id: item.id!,
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
	public async countRpcPathUsage(projectId: number, from: Date, to: Date): Promise<MetricEntity[]> {
		try {
			const result = await this.model.groupBy({
				by: ["path"],
				_count: {
					path: true,
				},
				where: {
					projectId: projectId,
					date_requested: {
						gte: from,
						lte: to,
					},
				},
			});
			return ObjectHydrate.map<MetricEntity>(MetricEntity, result, { strategy: "exposeAll" });
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}

	// Last requests for a specific project
	public async findLastRequests(projectId: number, limit: number): Promise<MetricEntity[]> {
		try {
			const metrics = await this.model.findMany({
				where: {
					projectId: projectId,
				},
				take: limit,
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
	public async findRequestsByDay(projectId: number, from: Date, to: Date): Promise<RequestsByDayMetrics[]> {
		try {
			const result: RequestsByDayMetrics[] = [];
			const response = this.model.groupBy({
				by: ["date_requested"],
				_count: {
					date_requested: true,
				},
				where: {
					projectId: projectId,
					date_requested: {
						gte: from,
						lte: to,
					},
				},
			});
			for (const item of response as Array<{ date_requested: Date; _count: { date_requested: number } }> | any) {
				result.push({
					date_requested: item.date_requested,
					count: item._count.date_requested,
				});
			}
			return ObjectHydrate.map<RequestsByDayMetrics>(RequestsByDayMetrics, result, { strategy: "exposeAll" });
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}

	// Count all metrics by criterias for a specific project
	public async countAll(projectId: number): Promise<number> {
		try {
			return this.model.count({
				where: {
					projectId: projectId,
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

