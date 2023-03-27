import TezosLink from "@Common/databases/TezosLink";
import ObjectHydrate from "@Common/helpers/ObjectHydrate";
import MetricInfrastructureEntity from "@Common/ressources/infrastructure/MetricInfrastructureEntity";
import { ORMBadQueryError } from "@Common/system/database/exceptions/ORMBadQueryError";
import { type Prisma } from "@prisma/client";
import BaseRepository from "@Repositories/BaseRepository";
import { Service } from "typedi";
import { v4 as uuidv4 } from "uuid";

type MetricQuery = {
	where: {
		podName: string;
		from?: string;
		to?: string;
		type?: string;
	};
	_limit?: number;
	_page?: number;
};

@Service()
export default class MetricsInfrastrucutreRepository extends BaseRepository {
	constructor(private database: TezosLink) {
		super();
	}
	protected get model() {
		return this.database.getClient().metricInfrastructure;
	}
	protected get instanceDb() {
		return this.database.getClient();
	}

	public async findMany(query: MetricQuery): Promise<MetricInfrastructureEntity[]> {
		try {
			const { where, _page = 1, _limit } = query;
			const { podName, from, to, type } = where;

			// Use Math.max to limit the number of rows fetched
			const limit = _limit && _limit < this.defaultFetchRows ? _limit : this.defaultFetchRows;
			const skip = (Math.max(1, _page) - 1) * limit;

			const whereClause: Prisma.MetricInfrastructureWhereInput = {
				podName,
				dateRequested: {
					gte: from ? (Date.parse(from) ? new Date(from).toISOString() : new Date(parseInt(from)).toISOString()) : undefined,
					lte: to ? (Date.parse(to) ? new Date(to).toISOString() : new Date(parseInt(to)).toISOString()) : undefined,
				},
				type,
			};

			// Update the query with the limited limit, skip and where clause
			const metrics = await this.model.findMany({
				take: limit,
				skip,
				where: whereClause,
			});
			return ObjectHydrate.map<MetricInfrastructureEntity>(MetricInfrastructureEntity, metrics, { strategy: "exposeAll" });
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}

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
							name: data.podName!,
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
