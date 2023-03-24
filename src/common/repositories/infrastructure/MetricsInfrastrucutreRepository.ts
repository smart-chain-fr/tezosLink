import TezosLink from "@Common/databases/TezosLink";
import ObjectHydrate from "@Common/helpers/ObjectHydrate";
import MetricInfrastructureEntity from "@Common/ressources/infrastructure/MetricInfrastructureEntity";
import { ORMBadQueryError } from "@Common/system/database/exceptions/ORMBadQueryError";
import { type Prisma } from "@prisma/client";
import BaseRepository from "@Repositories/BaseRepository";
import { Service } from "typedi";
import { v4 as uuidv4 } from "uuid";

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

	public async findMany(query: Prisma.MetricInfrastructureFindManyArgs): Promise<MetricInfrastructureEntity[]> {
		try {
			// Use Math.min to limit the number of rows fetched
			const limit = Math.min(query.take || this.defaultFetchRows, this.maxFetchRows);

			// Update the query with the limited limit
			const metrics = await this.model.findMany({ ...query, take: limit });
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
					label: data.label!,
					value: data.value!,
					date_requested: data.date_requested!,
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
