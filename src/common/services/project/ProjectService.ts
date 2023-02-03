import ObjectHydrate from "@Common/helpers/ObjectHydrate";
import ProjectRepository from "@Common/repositories/ProjectRepository";
import { ProjectEntity } from "@Common/ressources";
import { QueryService } from "@Services/BaseService";
import { Service } from "typedi";

@Service()
export default class ProjectService {
    constructor(private projectRepository: ProjectRepository) {   
	}

	public async find(query: QueryService<Partial<ProjectEntity>>) {
		const projects = await this.projectRepository.findMany(query);
		if (!projects) throw new Error("Projects are undefined");
		return ObjectHydrate.hydrate<Partial<ProjectEntity>>(new ProjectEntity(), projects);
	}

    public async findByUUID(projectEntity: Partial<ProjectEntity>) {
        const project = await this.projectRepository.findOne(projectEntity);
        if (!project) throw new Error("Project not found");
        return ObjectHydrate.hydrate<Partial<ProjectEntity>>(new ProjectEntity(), project);
    }

    public async create(projectEntity: Partial<ProjectEntity>) {
        const project = await this.projectRepository.create(projectEntity);
        if (!project) throw new Error("Error while creating project");
        return ObjectHydrate.hydrate<Partial<ProjectEntity>>(new ProjectEntity(), project);
        
    }
    

}