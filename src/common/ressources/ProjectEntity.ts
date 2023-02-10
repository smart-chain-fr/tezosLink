import { IsNotEmpty, IsOptional, IsDate } from "class-validator";
import MetricEntity from "./MetricEntity";

export default class ProjectEntity {
	@IsNotEmpty()
	public id!: number;

	@IsNotEmpty({groups: ["create"]})
	public title!: string;

    @IsNotEmpty()
	public uuid!: string;

	@IsDate()
	public createdAt!: Date;

    @IsDate()
	public updatedAt!: Date;

	@IsNotEmpty({groups: ["create"]})
	public network!: string;

	@IsOptional()
	public metrics?: MetricEntity[];
}