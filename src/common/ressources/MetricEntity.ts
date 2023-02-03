import { IsArray, IsNotEmpty, IsNumber, IsString, IsDate } from "class-validator";
import ProjectEntity from "./ProjectEntity";

export default class MetricEntity {
	@IsNumber()
	@IsNotEmpty()
	public id!: number;

	@IsString()
	public path!: string;

	@IsString()
    @IsNotEmpty()
	public uuid!: string;

    @IsString()
	@IsNotEmpty()
	public remote_address!: string;

    @IsDate()
	public date_requested!: Date;

    @IsNumber()
	@IsNotEmpty()
	public projectId!: number;

	@IsArray()
	public project!: ProjectEntity[];

	@IsDate()
	public createdAt!: Date;

    @IsDate()
	public updatedAt!: Date;
}
