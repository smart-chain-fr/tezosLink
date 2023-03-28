import { type Response, type Request } from "express";
import { Controller, Get } from "@ControllerPattern/index";
import { Service } from "typedi";
import ApiController from "@Common/system/controller-pattern/ApiController";
import { IsString, IsNotEmpty, validateOrReject } from "class-validator";
import PodService from "@Services/infrastructure/PodService";
import { processFindManyQuery } from "prisma-query";
import MetricsInfrastructureService from "@Services/infrastructure/MetricInfrastructureService";

class ParamsType {
	@IsString()
	@IsNotEmpty()
	public type!: string;
}

class ParamsName {
	@IsString()
	@IsNotEmpty()
	public name!: string;
}

@Controller()
@Service()
export default class MetricsController extends ApiController {
	constructor(private podService: PodService, private metricsInfrastructureService: MetricsInfrastructureService) {
		super();
	}

	@Get("/deployments/:type")
	protected async getDeploymentsStats(req: Request, res: Response) {
		const { type } = req.params as Partial<ParamsType>;
		const params = new ParamsType();
		params.type = type!;
		try {
			await validateOrReject(params, { forbidUnknownValues: true });
		} catch (error) {
			this.httpBadRequest(res, error);
			return;
		}

		const deployemts = await this.podService.getDeployedTezosLinkPods(params.type);
		this.httpSuccess(res, deployemts);
	}

	@Get("/pods/:name")
	protected async getPodByName(req: Request, res: Response) {
		const { name } = req.params as Partial<ParamsName>;
		const params = new ParamsName();
		params.name = name!;
		try {
			await validateOrReject(params, { forbidUnknownValues: true });
		} catch (error) {
			this.httpNotFoundRequest(res, error);
			return;
		}

		const deployemts = await this.podService.getOnePodAndMetrics(params);
		if (!deployemts) {
			this.httpNotFoundRequest(res);
			return;
		}
		this.httpSuccess(res, deployemts);
	}

	@Get("/pods")
	protected async get(req: Request, res: Response) {
		const query = processFindManyQuery(req.query);
		try {
			await validateOrReject(query, { forbidUnknownValues: false });
		} catch (error) {
			this.httpBadRequest(res, error);
			return;
		}
		this.httpSuccess(res, await this.podService.getByCriterias(query));
	}

	@Get("/pods/:name/metrics")
	protected async getPodMetrics(req: Request, res: Response) {
		const { name } = req.params as Partial<ParamsName>;
		const params = new ParamsName();
		params.name = name!;
		const query = processFindManyQuery(req.query);
		query.where = { ...query.where, podName: params.name };
		try {
			await validateOrReject(params, { forbidUnknownValues: true });
		} catch (error) {
			this.httpBadRequest(res, error);
			return;
		}
		this.httpSuccess(res, await this.metricsInfrastructureService.getByCriterias(query));
	}
}
