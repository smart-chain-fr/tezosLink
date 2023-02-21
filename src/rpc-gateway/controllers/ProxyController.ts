import { type Response, type Request } from "express";
import { Controller, Get } from "@ControllerPattern/index";
import { Service } from "typedi";
import ApiController from "@Common/system/controller-pattern/ApiController";
import ProxyService from "@Services/proxy/ProxyService";


export enum ContentType {
	JSON = "application/json",
	FORM_DATA = "multipart/form-data;",
}

@Controller()
@Service()
export default class ProxyController extends ApiController {
	constructor(private proxyService: ProxyService) {
		super();
	}

	@Get("/health")
	protected async getHealth(req: Request, res: Response) {
		const health = this.proxyService.getHttpServerResponse();
		this.httpSuccess(res, health);
	}

	@Get("/status")
	protected async getStatus(req: Request, res: Response) {
		const status = await this.proxyService.getNodesStatus();
		if (!status) {
			this.httpNotFoundRequest(res, status);
		}
		this.httpSuccess(res, status);
	}
}

