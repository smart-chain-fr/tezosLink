import { StRoute } from "./StRoute";
import { Response } from "express";
import HttpCodes from "@Common/system/controller-pattern/HttpCodes";


type IResponseData = {} | string | number | boolean | null | unknown;


export default abstract class BaseController {
	public expressRoutes!: StRoute[];
	public httpCode: typeof HttpCodes = HttpCodes;

	protected httpSuccess(response: Response, responseData: IResponseData = null) {
		return this.httpResponse(response, HttpCodes.SUCCESS, responseData);
	}

	protected httpCreated(response: Response, responseData: IResponseData = null) {
		return this.httpResponse(response, HttpCodes.CREATED, responseData);
	}

	protected httpBadRequest(response: Response, responseData: IResponseData = "Http Bad Request") {
		return this.httpResponse(response, HttpCodes.BAD_REQUEST, responseData);
	}

	protected httpInternaleError(response: Response, responseData: IResponseData = "http Internal Server Error") {
		return this.httpResponse(response, HttpCodes.INTERNAL_ERROR, responseData);
	}

	protected httpNotImplemented(response: Response, responseData: IResponseData = "http Internal Server Error") {
		return this.httpResponse(response, HttpCodes.NOT_IMPLEMENTED, responseData);
	}

	protected httpResponse(response: Response, httpCode: HttpCodes, responseData: IResponseData = {}) {
		if (responseData instanceof Error) {
			throw responseData;
		}
		return response.status(httpCode).send(responseData);
	}
}
