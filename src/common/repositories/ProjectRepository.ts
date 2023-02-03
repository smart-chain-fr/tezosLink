import TezosLink from "@Common/databases/TezosLink";
import { ProjectEntity } from "@Common/ressources";
import { Service } from "typedi";
import { v4 as uuidv4 } from "uuid";
@Service()
export default class ProjectRepository {
	constructor(private database: TezosLink) {}
	protected get model() {
		return this.database.getClient().project;
	}

	public async findMany(): Promise<any> {
		return (await this.model.findMany({
			orderBy: {
				createdAt: "desc",
			},
		})) as any;
	}
	public async findOne(_uuid: string): Promise<Partial<ProjectEntity | null>> {
        if(!_uuid) throw new Error("Uuid is undefined");
		return (await this.model.findUnique({
			where: {
				uuid: _uuid,
			},
		})) as Partial<ProjectEntity | null>;
	}

	public async create(projectEntity: Partial<ProjectEntity>): Promise<ProjectEntity> {
		const data = Object.assign({}, projectEntity);
		data.uuid = uuidv4();
		return (await this.model.create({
			data: {
				uuid: data.uuid!,
				title: data.title!,
				network: data.network!,
			},
		})) as ProjectEntity;
	}
}

