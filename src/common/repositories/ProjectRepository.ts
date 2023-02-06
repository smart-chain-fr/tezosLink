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

	public async findMany(query?: QueryService<Partial<ProjectEntity>>): Promise<ProjectEntity[]> {
        const data = Object.assign({}, query);
        console.log(data?.query);
		return (this.model.findMany({ // WIP -- Prisma custom queries & pagniation
            orderBy: {  
				createdAt: "desc",
			},
		})) as Promise<ProjectEntity[]>;
	}
	public async findOne(projectEntity: Partial<ProjectEntity>): Promise<Partial<ProjectEntity>> {
        const data = Object.assign({}, projectEntity);
        if(!data) throw new Error("Project not found");
		return (this.model.findUnique({
			where: data
		})) as Promise<Partial<ProjectEntity>>;
	}

	public async create(projectEntity: Partial<ProjectEntity>): Promise<ProjectEntity> {
		const data = Object.assign({}, projectEntity);
        if(!data) throw new Error("Error while creating project");
		data.uuid = uuidv4();
		return (this.model.create({
			data: {
				uuid: data.uuid!,
				title: data.title!,
				network: data.network!,
			},
		})) as Promise<ProjectEntity> ;
	}
}

