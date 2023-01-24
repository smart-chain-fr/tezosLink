
export enum ContentType {
	JSON = "application/json",
	FORM_DATA = "multipart/form-data;",
}

export enum EHTTPMethod {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE",
}

export default abstract class BaseApiService {

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
				method: EHTTPMethod.GET,
				headers: this.buildHeaders(ContentType.JSON),
			});

		return this.sendRequest<T>(request);
	}

	protected async postRequest<T>(url: URL, body: { [key: string]: unknown } = {}) {
		const request = async () =>
			await fetch(url, {
				method: EHTTPMethod.POST,
				headers: this.buildHeaders(ContentType.JSON),
				body: this.buildBody(body),
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

		return responseJson as T;
	}

	
}

export interface IResponse {
	http_status: number;
}
