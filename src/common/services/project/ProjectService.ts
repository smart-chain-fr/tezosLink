import ObjectHydrate from "@Common/helpers/ObjectHydrate";
import ProjectRepository from "@Common/repositories/ProjectRepository";
import { ProjectEntity } from "@Common/ressources";
import { type processFindManyQuery } from "prisma-query";
import { Service } from "typedi";

@Service()
export default class ProjectService {
	constructor(private projectRepository: ProjectRepository) {}

	/**
	 * @throws {Error} If projects are undefined
	 */
	public async getByCriterias(query: ReturnType<typeof processFindManyQuery>) {
		const projects = await this.projectRepository.findMany(query);
		return ObjectHydrate.hydrate<Partial<ProjectEntity>>(new ProjectEntity(), projects);
	}
    /**
	 * @throws {Error} If project is undefined
	 */
	public async getByUUID(projectEntity: Partial<ProjectEntity>) {
		const project = await this.projectRepository.findOne(projectEntity);
		if (!project) return null;
		return ObjectHydrate.hydrate<Partial<ProjectEntity>>(new ProjectEntity(), project);
	}
    /**
     * 
     * @throws {Error} If project cannot be created
     * @returns 
     */
	public async create(projectEntity: Partial<ProjectEntity>) {
		const project = await this.projectRepository.create(projectEntity);
		if (!project) throw new Error("Error while creating project");
		return ObjectHydrate.hydrate<Partial<ProjectEntity>>(new ProjectEntity(), project);
	}
}

