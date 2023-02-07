import TezosLink from "@Common/databases/TezosLink";
import { ProjectEntity } from "@Common/ressources";
import { QueryService } from "@Services/BaseService";
import { Service } from "typedi";
import { v4 as uuidv4 } from "uuid";
@Service()
export default class ProjectRepository {
	constructor(private database: TezosLink) {}
	protected get model() {
		return this.database.getClient().project;
	}

	public async findMany(query?: QueryService<Partial<ProjectEntity>>): Promise<ProjectEntity[] | null> {
		try {
			const data = { ...query };
			console.log(data?.query);
			return this.model.findMany({
				// WIP -- Prisma custom queries & pagniation
				orderBy: {
					createdAt: "desc",
				},
			}) as Promise<ProjectEntity[]>;
		} catch (error) {
			console.error(error);
			return null;
		}
	}
	public async findOne(projectEntity: Partial<ProjectEntity>): Promise<Partial<ProjectEntity> | null> {
		try {
			const data = { ...projectEntity };
			if (!data) return null;
			return this.model.findUnique({ where: data });
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	public async create(projectEntity: Partial<ProjectEntity>): Promise<ProjectEntity> {
		try {
			const data = { ...projectEntity };
			if (!data.title || !data.network) {
				throw new Error("Title and network fields are required");
			}
			data.uuid = uuidv4();
			return this.model.create({
				data: {
					uuid: data.uuid,
					title: data.title,
					network: data.network,
				},
				include: {
					// Include metrics
					Metrics: true,
				},
			}) as Promise<ProjectEntity>;
		} catch (error) {
			console.error(error);
			throw new Error("Error creating project");
		}
	}
}

