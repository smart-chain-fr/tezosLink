import ProjectEntity from "../projects/ProjectEntity";

export default class MetricEntity {
	public uuid!: string;

	public path!: string;

	public remote_address!: string;

	public date_requested!: Date;

	public projectUuid!: string;

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

