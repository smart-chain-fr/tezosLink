import ProjectEntity from "./ProjectEntity";

export default class MetricEntity {
	public id!: number;

	public path!: string;

	public uuid!: string;

	public remote_address!: string;

	public date_requested!: Date;

	public projectId!: number;

	public project!: ProjectEntity;

	public createdAt?: Date;

	public updatedAt?: Date;

	set remoteAddress(remote_address: string) {
		this.remote_address = remote_address;
	}

	get remoteAddress() {
		return this.remote_address;
	}

	set dateRequested(date_requested: Date) {
		this.date_requested = date_requested;
	}

	get dateRequested() {
		return this.date_requested;
	}
}

