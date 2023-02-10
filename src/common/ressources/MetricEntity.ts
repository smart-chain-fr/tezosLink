import { IsNotEmpty, IsDate } from "class-validator";
import ProjectEntity from "./ProjectEntity";

export default class MetricEntity {
	@IsNotEmpty()
	public id!: number;
	
	@IsNotEmpty()
	public path!: string;

    @IsNotEmpty()
	public uuid!: string;

	@IsNotEmpty()
	public remote_address!: string;

    @IsDate()
	public date_requested!: Date;

	@IsNotEmpty()
	public projectId!: number;

	@IsNotEmpty()
	public project!: ProjectEntity;

	@IsDate()
	public createdAt?: Date;

    @IsDate()
	public updatedAt?: Date;
}
