import TezosLink from "@Common/databases/TezosLink";
import ObjectHydrate from "@Common/helpers/ObjectHydrate";
import { ProjectEntity } from "@Common/ressources";
import { ORMBadQueryError } from "@Common/system/database/exceptions/ORMBadQueryError";
import { Prisma } from "@prisma/client";
import BaseRepository from "@Repositories/BaseRepository";
import { Service } from "typedi";
import { v4 as uuidv4 } from "uuid";

@Service()
export default class ProjectsRepository extends BaseRepository {
	constructor(private database: TezosLink) {
		super();
	}
	protected get model() {
		return this.database.getClient().project;
	}

	public async findMany(query: Prisma.ProjectFindManyArgs): Promise<ProjectEntity[]> {
		try {
			// Use Math.min to limit the number of rows fetched
			const limit = Math.min(query.take || this.defaultFetchRows, this.maxFetchRows);

			// Update the query with the limited limit
			const projects = await this.model.findMany({ ...query, take: limit });
			return ObjectHydrate.map<ProjectEntity>(ProjectEntity, projects, { strategy: "exposeAll" });
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}

	public async findOne(projectEntity: Partial<ProjectEntity>): Promise<Partial<ProjectEntity>> {
		try {
			const project = (await this.model.findFirst({
				where: {
					...projectEntity,
					Metrics: { every: {} },
				},
				include: {
					Metrics: true,
				},
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

	public async delete(projectEntity: Partial<ProjectEntity>): Promise<void> {
		try {
			await this.model.delete({
				where: {
					uuid: projectEntity.uuid,
				},
			});
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}
}
