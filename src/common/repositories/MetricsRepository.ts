import TezosLink from "@Common/databases/TezosLink";
import { MetricEntity } from "@Common/ressources";
import { QueryService } from "@Services/BaseService";
import { Service } from "typedi";
@Service()
export default class MetricRepository {
	constructor(private database: TezosLink) {}
	protected get model() {
		return this.database.getClient().metric;
	}
	public async findMany(query?: QueryService<Partial<MetricEntity>>): Promise<MetricEntity[] | null> {
		try {
			const data = { ...query };
			console.log(data?.query);
			return this.model.findMany({
				// WIP -- Prisma custom queries & pagniation
				orderBy: {
					createdAt: "desc",
				},
			}) as Promise<MetricEntity[]>;
		} catch (error) {
			console.error(error);
			return null;
		}
	}
	public async findOne(metricEntity: Partial<MetricEntity>): Promise<Partial<MetricEntity> | null> {
		try {
			const data = { ...metricEntity };
			if (!data) return null;
			return ( this.model.findUnique({ where: data })) as Promise<Partial<MetricEntity>>;
		} catch (error) {
			console.error(error);
			return null;
		}
	}
	public async create(metricEntity: Partial<MetricEntity>): Promise<Partial<MetricEntity>> {
		try {
			const data = { ...metricEntity };
			if (!data.path || !data.remote_address) {
				throw new Error("Path and Remote Address fields are required");
			}
			return this.model.create({
				data: {
					path: data.path,
					uuid: data.uuid!,
					remote_address: data.remote_address,
					date_requested: data.date_requested!,
					project: {
						connect: {
							id: data.id!,
						},
					},
				},
			}) as Promise<Partial<MetricEntity>>;
		} catch (error) {
			console.error(error);
			throw new Error("Error creating metric");
		}
	}
}

