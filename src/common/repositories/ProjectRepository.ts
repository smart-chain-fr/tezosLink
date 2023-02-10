import TezosLink from "@Common/databases/TezosLink";
import { ProjectEntity } from "@Common/ressources";
import { ORMBadQueryError } from "@Common/system/database/exceptions/ORMBadQueryError";
import { Service } from "typedi";
import { v4 as uuidv4 } from "uuid";

@Service()
export default class ProjectRepository {
	constructor(private database: TezosLink) {}
	protected get model() {
		return this.database.getClient().project;
	}

	public async findMany(query: any): Promise<ProjectEntity[]> {
		try {
			return this.model.findMany(query) as Promise<ProjectEntity[]>;
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}

	public async findOne(projectEntity: Partial<ProjectEntity>): Promise<Partial<ProjectEntity> | null> {
		try {
			const data = { ...projectEntity };
			return this.model.findUnique({ where: data });
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}

	public async create(projectEntity: Partial<ProjectEntity>): Promise<ProjectEntity> {
		try {
			const data = { ...projectEntity };
			data.uuid = uuidv4();
			return this.model.create({
				data: {
					uuid: data.uuid,
					title: data.title!,
					network: data.network!,
				},
				include: {
					// Include metrics
					Metrics: true,
				},
			}) as Promise<ProjectEntity>;
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}
}

