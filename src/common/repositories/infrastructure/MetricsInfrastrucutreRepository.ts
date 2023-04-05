import TezosLink from "@Common/databases/TezosLink";
import ObjectHydrate from "@Common/helpers/ObjectHydrate";
import MetricInfrastructureEntity from "@Common/ressources/infrastructure/MetricInfrastructureEntity";
import { ORMBadQueryError } from "@Common/system/database/exceptions/ORMBadQueryError";
import { type Prisma } from "@prisma/client";
import BaseRepository from "@Repositories/BaseRepository";
import { Service } from "typedi";
import { v4 as uuidv4 } from "uuid";
import PodRepository from "./PodRepository";

type MetricQuery = {
	where: {
		podName: string;
		from?: string;
		to?: string;
		type?: string;
	};
	take?: number;
	skip?: number;
};

@Service()
export default class MetricsInfrastrucutreRepository extends BaseRepository {
	constructor(private database: TezosLink, private podRepository: PodRepository) {
		super();
	}
	protected get model() {
		return this.database.getClient().metricInfrastructure;
	}
	protected get instanceDb() {
		return this.database.getClient();
	}
	/**
	 *
	 * @param query
	 * @returns
	 */
	public async findMany(query: MetricQuery): Promise<{ data: MetricInfrastructureEntity[]; metadata: { count: number; limit: number; page: number; total: number } }> {
		try {
			const { where, skip = 0, take } = query;
			const { podName, from, to, type } = where;

			const page = Math.max(1, Math.floor(Number(skip) / (take || 10)) + 1);
			const limit = take ? Math.min(Math.max(1, Number(take)), this.defaultFetchRows) : this.defaultFetchRows; // Set a maximum limit of 100 records per page
			const offset = (page - 1) * limit;

			const pod = await this.podRepository.findOneByName(podName);
			if (!pod) return { data: [], metadata: { count: 0, limit, page, total: 0 } };
			const whereClause: Prisma.MetricInfrastructureWhereInput = {
				podUid: pod.uid,
				dateRequested: {
					gte: from ? (Date.parse(from) ? new Date(from).toISOString() : new Date(parseInt(from)).toISOString()) : undefined,
					lte: to ? (Date.parse(to) ? new Date(to).toISOString() : new Date(parseInt(to)).toISOString()) : undefined,
				},
				type,
			};
			const totalCount = await this.model.count({ where: whereClause });

			// Update the query with the limited limit, skip and where clause
			const metrics = await this.model.findMany({
				take: limit,
				skip: offset,
				where: whereClause,
				orderBy: {
					dateRequested: "desc",
				},
			});

			const metadata = {
				count: metrics.length,
				limit,
				page,
				total: Math.ceil(totalCount),
			};
			return { data: ObjectHydrate.map<MetricInfrastructureEntity>(MetricInfrastructureEntity, metrics, { strategy: "exposeAll" }), metadata };
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}
	/**
	 * @param metricInfrastructureEntity
	 * @returns MetricInfrastructureEntity
	 * @throws ORMBadQueryError
	 * @description Create a new metric
	 */
	public async create(metricInfrastructureEntity: Partial<MetricInfrastructureEntity>): Promise<MetricInfrastructureEntity> {
		try {
			const data = { ...metricInfrastructureEntity };
			data.uuid = uuidv4();
			const metric = await this.model.create({
				data: {
					uuid: data.uuid!,
					value: data.value!,
					dateRequested: data.dateRequested!,
					type: data.type!,
					pod: {
						connect: {
							uid: data.podUid!,
						},
					},
				},
			});
			return ObjectHydrate.hydrate<MetricInfrastructureEntity>(new MetricInfrastructureEntity(), metric, { strategy: "exposeAll" });
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}
}
