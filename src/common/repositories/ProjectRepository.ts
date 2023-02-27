import TezosLink from "@Common/databases/TezosLink";
import ObjectHydrate from "@Common/helpers/ObjectHydrate";
import { ProjectEntity } from "@Common/ressources";
import { ORMBadQueryError } from "@Common/system/database/exceptions/ORMBadQueryError";
import { Service } from "typedi";
import { v4 as uuidv4 } from "uuid";

@Service()
/** @TODO */
export default class ProjectRepository {
	constructor(private database: TezosLink) {}
	protected get model() {
		return this.database.getClient().project;
	}

	public async findMany(query: any): Promise<ProjectEntity[]> {
		try {
			const projects = await this.model.findMany(query);
			return ObjectHydrate.map<ProjectEntity>(ProjectEntity, projects, { strategy: "exposeAll" });
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}

	public async findOne(projectEntity: Partial<ProjectEntity>): Promise<Partial<ProjectEntity>> {
		try {
			const project = (await this.model.findFirst({
				where: projectEntity,
			})) as ProjectEntity;
			return ObjectHydrate.hydrate<ProjectEntity>(new ProjectEntity(), project, { strategy: "exposeAll" });
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}

	public async create(projectEntity: Partial<ProjectEntity>): Promise<ProjectEntity> {
		try {
			const data = { ...projectEntity };
			data.uuid = uuidv4();
			const project = (await this.model.create({
				data: {
					uuid: data.uuid,
					title: data.title!,
					network: data.network!,
				},
				include: {
					// Include metrics
					Metrics: true,
				},
			})) as ProjectEntity;
			return ObjectHydrate.hydrate<ProjectEntity>(new ProjectEntity(), project, { strategy: "exposeAll" });
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}
}

