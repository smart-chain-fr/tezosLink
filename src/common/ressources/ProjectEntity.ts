import { Exclude } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import MetricEntity from "./MetricEntity";

export default class ProjectEntity {
	@Exclude()
	public id!: number;

	@IsNotEmpty({ groups: ["create"] })
	public title!: string;

	public uuid!: string;

	public createdAt!: Date;

	public updatedAt!: Date;

	@IsNotEmpty({ groups: ["create"] })
	public network!: string;

	public metrics?: MetricEntity[];
}
