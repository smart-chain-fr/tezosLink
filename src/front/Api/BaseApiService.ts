
export enum ContentType {
	JSON = "application/json",
	FORM_DATA = "multipart/form-data;",
}


export default abstract class BaseApiService {
	protected apiHostname = process.env["NEXT_PUBLIC_API_HOSTNAME"];
	protected apiPort = process.env["NEXT_PUBLIC_API_PORT"] || "";
	protected apiRootUrl = process.env["NEXT_PUBLIC_API_ROOT_URL"] || "";
	protected backUrl = this.apiHostname + (this.apiPort ? `:${this.apiPort}` : "") + this.apiRootUrl;
	
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	protected constructor() {}

	protected buildHeaders(contentType: ContentType) {
		const headers = new Headers();

		if (contentType === ContentType.JSON) {
			headers.set("Content-Type", contentType);
		}
		return headers;
	}

	protected buildBody(body: { [key: string]: unknown }): string {
		return JSON.stringify(body);
	}

	protected async getRequest<T>(url: URL) {
		const request = async () =>
			await fetch(url, {
				method: "GET",
				headers: this.buildHeaders(ContentType.JSON),
			});

		return this.sendRequest<T>(request);
	}

	protected async postRequest<T>(url: URL, body: { [key: string]: unknown } = {}) {
		const request = async () =>
			await fetch(url, {
				method: "POST",
				headers: this.buildHeaders(ContentType.JSON),
				body: this.buildBody(body),
			});

		return this.sendRequest<T>(request);
	}

	protected async putRequest<T>(url: URL, body: { [key: string]: unknown } = {}) {
		const request = async () =>
			await fetch(url, {
				method: "PUT",
				headers: this.buildHeaders(ContentType.JSON),
				body: this.buildBody(body),
			});

		return this.sendRequest<T>(request);
	}

	protected async patchRequest<T>(url: URL, body: { [key: string]: unknown } = {}) {
		const request = async () =>
			await fetch(url, {
				method: "PATCH",
				headers: this.buildHeaders(ContentType.JSON),
				body: this.buildBody(body),
			});

		return this.sendRequest<T>(request);
	}

	protected async deleteRequest<T>(url: URL, body: { [key: string]: unknown } = {}) {
		const request = async () =>
			await fetch(url, {
				method: "DELETE",
				headers: this.buildHeaders(ContentType.JSON),
				body: this.buildBody(body),
			});

		return this.sendRequest<T>(request);
	}

	protected async putFormDataRequest<T>(url: URL, body: FormData) {
		const request = async () =>
			await fetch(url, {
				method: "PUT",
				headers: this.buildHeaders(ContentType.FORM_DATA),
				body,
			});

		return this.sendRequest<T>(request);
	}

	private async sendRequest<T>(request: () => Promise<Response>): Promise<T> {
		const response = await request();
		return this.processResponse<T>(response, request);
	}

	protected async processResponse<T>(response: Response, request: () => Promise<Response>): Promise<T> {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let responseJson: any | null;
		try {
			responseJson = await response.json();
		} catch (err: unknown) {
			responseJson = null;
		}

		if (!response.ok) {
			return Promise.reject(response);
		}

		return responseJson as T;
	}

	protected onError(error: unknown) {
		console.error(error);
	}

}

export interface IResponse {
	http_status: number;
}
