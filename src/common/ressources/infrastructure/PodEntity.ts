import MetricInfrastructureEntity from "./MetricInfrastructureEntity";

export default class PodEntity {
	public name!: string;

	public metricsInfrastructure?: MetricInfrastructureEntity[];

	public active?: boolean;

	public createdAt?: Date;

	public updatedAt?: Date;
}
