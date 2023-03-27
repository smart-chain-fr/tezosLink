import ProjectEntity from "../projects/ProjectEntity";

export default class MetricEntity {
	public uuid!: string;

	public path!: string;

	public remoteAddress!: string;

	public dateRequested!: Date;

	public node!: string;

	public status!: string;

	public projectUuid!: string;

	public project!: ProjectEntity;

	public createdAt?: Date;

	public updatedAt?: Date;
}
