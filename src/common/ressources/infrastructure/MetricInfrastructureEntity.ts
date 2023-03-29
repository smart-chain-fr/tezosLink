import PodEntity from "./PodEntity";

export default class MetricInfrastructureEntity {
	public uuid!: string;

	public podUid!: string;

	public value!: string;

	public dateRequested!: Date;

	public type!: string;

	public pod!: PodEntity;

	public createdAt?: Date;

	public updatedAt?: Date;
}

