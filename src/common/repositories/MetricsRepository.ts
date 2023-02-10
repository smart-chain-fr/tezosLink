import TezosLink from "@Common/databases/TezosLink";
import { MetricEntity } from "@Common/ressources";
import { ORMBadQueryError } from "@Common/system/database/exceptions/ORMBadQueryError";
import { Service } from "typedi";
@Service()
export default class MetricRepository {
	constructor(private database: TezosLink) {}
	protected get model() {
		return this.database.getClient().metric;
	}

	public async findMany(query: any): Promise<MetricEntity[]> {
		try {
			return this.model.findMany(query) as Promise<MetricEntity[]>;
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}

	public async findOne(metricEntity: Partial<MetricEntity>): Promise<Partial<MetricEntity> | null> {
		try {
			const data = { ...metricEntity };
			return this.model.findUnique({ where: data });
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}

	public async create(metricEntity: Partial<MetricEntity>): Promise<MetricEntity> {
		try {
			const data = { ...metricEntity };

			return this.model.create({
				data: {
					path: data.path!,
					uuid: data.uuid!,
					remote_address: data.remote_address!,
					date_requested: data.date_requested!,
					project: {
						connect: {
							id: data.id!,
						},
					},
				},
			}) as Promise<MetricEntity>;
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}
}

