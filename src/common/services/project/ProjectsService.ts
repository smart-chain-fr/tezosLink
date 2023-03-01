import ProjectsRepository from "@Repositories/projects/ProjectsRepository";
import { ProjectEntity } from "@Common/ressources";
import BaseService from "@Services/BaseService";
import { type processFindManyQuery } from "prisma-query";
import { Service } from "typedi";

@Service()
export default class ProjectsService extends BaseService {
	constructor(private projectRepository: ProjectsRepository) {
		super();
	}

	/**
	 * @throws {Error} If projects are undefined
	 */
	public async getByCriterias(query: ReturnType<typeof processFindManyQuery>): Promise<ProjectEntity[]> {
		return this.projectRepository.findMany(query);
	}
	/**
	 * @throws {Error} If project is undefined
	 */
	public async getByUUID(projectEntity: Partial<ProjectEntity>): Promise<Partial<ProjectEntity>> {
		const project = await this.projectRepository.findOne(projectEntity);
		if (!project) Promise.reject(new Error("Cannot get project by uuid"));
		return project;
	}
	/**
	 *
	 * @throws {Error} If project cannot be created
	 * @returns
	 */
	public async create(projectEntity: Partial<ProjectEntity>): Promise<Partial<ProjectEntity>> {
		const project = await this.projectRepository.create(projectEntity);
		if (!project) Promise.reject(new Error("Cannot create project"));
		return project;
	}
}

