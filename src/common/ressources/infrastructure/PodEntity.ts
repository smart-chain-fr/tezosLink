import MetricInfrastructureEntity from "./MetricInfrastructureEntity";

export default class PodEntity {
	public uid!: string;
	
	public name!: string;

	public namespace!: string;

	public type!: string;

	public metricsInfrastructure?: MetricInfrastructureEntity[];

	public createdAt?: Date;

	public updatedAt?: Date;
}
