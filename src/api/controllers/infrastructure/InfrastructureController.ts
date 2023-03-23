import { type Response, type Request } from "express";
import { Controller, Get } from "@ControllerPattern/index";
import { Service } from "typedi";
import ApiController from "@Common/system/controller-pattern/ApiController";
import { IsString, IsNotEmpty, validateOrReject } from "class-validator";
import PodService from "@Services/infrastructure/PodService";

class Params {
	@IsString()
	@IsNotEmpty()
	public type!: string;
}

@Controller()
@Service()
export default class MetricsController extends ApiController {
	constructor(private podService: PodService) {
		super();
	}

	@Get("/deployments/:type")
	protected async getDeploymentsStats(req: Request, res: Response) {
		const { type } = req.params as Partial<Params>;
		const params = new Params();
		params.type = type!;
		try {
			await validateOrReject(params, { forbidUnknownValues: true });
		} catch (error) {
			this.httpBadRequest(res, error);
			return;
		}

		const deployemts = await this.podService.getDeployedTezosLinkPods(params.type);
		if (!deployemts) {
			this.httpNotFoundRequest(res);
			return;
		}
		this.httpSuccess(res, deployemts);
	}

	@Get("/pods/:type")
	protected async getPods(req: Request, res: Response) {
		const { type } = req.params as Partial<Params>;
		const params = new Params();
		params.type = type!;
		try {
			await validateOrReject(params, { forbidUnknownValues: true });
		} catch (error) {
			this.httpBadRequest(res, error);
			return;
		}

		const deployemts = await this.podService.getPodsAndMetrics(params.type);
		if (!deployemts) {
			this.httpNotFoundRequest(res);
			return;
		}
		this.httpSuccess(res, deployemts);
	}
}
