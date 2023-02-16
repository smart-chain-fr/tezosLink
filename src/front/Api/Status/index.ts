import BaseApiService from "src/front/Api/BaseApiService";
import { IHealth, IStatus } from "src/front/interfaces";
import { Service } from "typedi";

@Service()
export default class Status extends BaseApiService {
	private static instance: Status;
	private readonly baseURl = this.proxyUrl.concat("/status");
	private readonly healthURl = this.proxyUrl.concat("/health");

	private constructor() {
		super();
	}

	public static getInstance() {
		if (!this.instance) {
			return new Status();
		} else {
			return this.instance;
		}
	}

	public async getHealth(): Promise<IHealth> {
		const url = new URL(this.healthURl);
		try {
			return await this.getRequest<IHealth>(url);
		} catch (err) {
			this.onError(err);
			return Promise.reject(err);
		}
	}

	public async getStatus(): Promise<IStatus> {
		const url = new URL(this.baseURl);
		try {
			return await this.getRequest<IStatus>(url);
		} catch (err) {
			this.onError(err);
			return Promise.reject(err);
		}
	}
}
