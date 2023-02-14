import { IsNotEmpty, IsDate } from "class-validator";
import ProjectEntity from "./ProjectEntity";

export default class MetricEntity {
	@IsNotEmpty()
	public id!: number;
	
	@IsNotEmpty(({groups: ["create"]}))
	public path!: string;

    @IsNotEmpty(({groups: ["create"]}))
	public uuid!: string;

	@IsNotEmpty(({groups: ["create"]}))
	public remote_address!: string;

    @IsNotEmpty(({groups: ["create"]}))
	public date_requested!: Date;

	@IsNotEmpty(({groups: ["create"]}))
	public projectId!: number;

	@IsNotEmpty(({groups: ["create"]}))
	public project!: ProjectEntity;

	@IsDate()
	public createdAt?: Date;

    @IsDate()
	public updatedAt?: Date;
}
