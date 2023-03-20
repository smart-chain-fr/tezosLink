import { IsNotEmpty } from "class-validator";
import MetricEntity from "../metrics/MetricEntity";

export default class ProjectEntity {
	public uuid!: string;
	
	@IsNotEmpty({ groups: ["create"] })
	public title!: string;

	public createdAt!: Date;

	public updatedAt!: Date;

	@IsNotEmpty({ groups: ["create"] })
	public network!: string;

	public metrics?: MetricEntity[];
}

