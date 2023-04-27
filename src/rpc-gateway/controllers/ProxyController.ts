import { type Response, type Request } from "express";
import { Controller, Get } from "@ControllerPattern/index";
import { Service } from "typedi";
import ApiController from "@Common/system/controller-pattern/ApiController";
import ProxyService, { RpcRequest } from "@Services/proxy/ProxyService";
import { validateOrReject } from "class-validator";
import ObjectHydrate from "@Common/helpers/ObjectHydrate";

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

	@Get("/:uuid/*")
	protected async proxy(req: Request, res: Response) {
		const remoteAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
		const ip = Array.isArray(remoteAddress) ? remoteAddress[0] : remoteAddress?.split(",")[0];
		const path = req.params[0]!.replace(/[\s/\\]+$/, "");
		const rpcRequest = ObjectHydrate.hydrate<RpcRequest>(new RpcRequest(), {
			uuid: req.params["uuid"]!,
			path: path,
			remoteAddress: ip ? ip : "",
		});

		// Define a function that proxies the request and handles errors
		const proxyRequest = async (rpcRequest: RpcRequest) => {
			try {
				await validateOrReject(rpcRequest, { skipMissingProperties: true, whitelist: true });
				const result = await this.proxyService.proxy(rpcRequest, true);
				this.httpSuccess(res, result);
			} catch (err) {
				if (rpcRequest.path.length != 0) await this.proxyService.proxy(rpcRequest, false);
				this.httpBadRequest(res, err);
			}
		};

		// Call the proxyRequest function
		await proxyRequest(rpcRequest);
	}
}
