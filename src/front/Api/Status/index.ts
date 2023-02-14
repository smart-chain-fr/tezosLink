import BaseApiService from "src/front/Api/BaseApiService";
import { IStatus } from "src/front/interfaces";
import { Service } from "typedi";

@Service()
export default class Status extends BaseApiService {
	private static instance: Status;
	private readonly baseURl = this.backUrl.concat("/status");

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

	public async getStatus(): Promise<IStatus[]> {
		const url = new URL(this.baseURl);
		try {
			return await this.getRequest<IStatus[]>(url);
		} catch (err) {
			this.onError(err);
			return Promise.reject(err);
		}
	}
}
