import ProjectsRepository from "@Repositories/projects/ProjectsRepository";
import { ProjectEntity } from "@Common/ressources";
import BaseService from "@Services/BaseService";
import { type processFindManyQuery } from "prisma-query";
import { Service } from "typedi";

/**
 * Projects service
 * @export
 * @class ProjectsService
 * @extends {BaseService}
 * */
@Service()
export default class ProjectsService extends BaseService {
	constructor(private projectRepository: ProjectsRepository) {
		super();
	}

	/** Get all projects by criterias
	 * @param query
	 * @returns {Promise<ProjectEntity[]>}
	 * @memberof ProjectsService
	 * */
	public async getByCriterias(query: ReturnType<typeof processFindManyQuery>): Promise<ProjectEntity[]> {
		return this.projectRepository.findMany(query);
	}
	/**
	 * Get project by uuid
	 * @param {Partial<ProjectEntity>} projectEntity
	 * @returns {Promise<Partial<ProjectEntity>>}
	 * @memberof ProjectsService
	 * */
	public async getByUUID(projectEntity: Partial<ProjectEntity>): Promise<Partial<ProjectEntity>> {
		return await this.projectRepository.findOne(projectEntity);
	}
	/**
	 * Create a project
	 * @param {Partial<ProjectEntity>} projectEntity
	 * @returns {Promise<Partial<ProjectEntity>>}
	 * @memberof ProjectsService
	 * */
	public async create(projectEntity: Partial<ProjectEntity>): Promise<Partial<ProjectEntity>> {
		return await this.projectRepository.create(projectEntity);
	}
}
