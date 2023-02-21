import BaseApiService from "src/front/Api/BaseApiService";
import { IHttpReponse, IStatus } from "src/front/interfaces";
import { Service } from "typedi";

@Service()
export default class Status extends BaseApiService {
	private static instance: Status;

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

	public async getHealthByUrl(url: string): Promise<IHttpReponse> {
		const healthUrl = new URL(url.concat("/health"));
		try {
			return await this.getRequest<IHttpReponse>(healthUrl);
		} catch (err) {
			this.onError(err);
			return Promise.reject(err);
		}
	}

	public async getStatusByUrl(url: string): Promise<IStatus> {
		const statusUrl = new URL(url.concat("/status"));
		try {
			return await this.getRequest<IStatus>(statusUrl);
		} catch (err) {
			this.onError(err);
			return Promise.reject(err);
		}
	}
}

