import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsDate } from "class-validator";
import MetricEntity from "./MetricEntity";

export default class ProjectEntity {
	@IsNumber()
	@IsNotEmpty()
	public id!: number;

	@IsOptional()
	@IsString()
	public title?: string;

	@IsString()
    @IsNotEmpty()
	public uuid!: string;

	@IsDate()
	public createdAt!: Date;

    @IsDate()
	public updatedAt!: Date;

	@IsString()
	@IsNotEmpty()
	public network!: string;

	@IsOptional()
	@IsArray()
	public metrics?: MetricEntity[];
}