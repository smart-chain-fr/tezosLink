import { type Response, type Request } from "express";
import { Controller, Get } from "@ControllerPattern/index";
import { Service } from "typedi";
import { processFindManyQuery } from "prisma-query";
import ApiController from "@Common/system/controller-pattern/ApiController";
import MetricsService from "@Services/metric/MetricsService";
import { validateOrReject } from "class-validator";

@Controller()
@Service()
export default class MetricsController extends ApiController {
	constructor(private metricsService: MetricsService) {
		super();
	}

	@Get("/metrics")
	protected async get(req: Request, res: Response) {
		const query = processFindManyQuery(req.query);
		try {
			await validateOrReject(query, { forbidUnknownValues: false });
		} catch (error) {
			this.httpBadRequest(res, error);
			return;
		}
		this.httpSuccess(res, await this.metricsService.getByCriterias(query));
	}

	//Get requestsByDay using a query
	@Get("/metrics/my-requests")
	protected async getByRequestsByDay(req: Request, res: Response) {
		const query = processFindManyQuery(req.query);
		try {
			await validateOrReject(query, { forbidUnknownValues: false });
		} catch (error) {
			this.httpBadRequest(res, error);
			return;
		}
		const metrics = await this.metricsService.getRequestsByDay(query.where.uuid, new Date(query.where.from), new Date(query.where.to));
		this.httpSuccess(res, metrics);
	}

	//Get count-Requests using a query
	@Get("/metrics/count-requests")
	protected async getCountRequests(req: Request, res: Response) {
		const query = processFindManyQuery(req.query);
		try {
			await validateOrReject(query, { forbidUnknownValues: false });
		} catch (error) {
			this.httpBadRequest(res, error);
			return;
		}
		const metrics = await this.metricsService.getCountAllMetricsByCriterias(query.where.uuid, new Date(query.where.from), new Date(query.where.to));
		if (isNaN(metrics)) {
			this.httpNotFoundRequest(res);
			return;
		}
		this.httpSuccess(res, { count: metrics });
	}

	//Get types of requests using a query
	@Get("/metrics/type-of-requests")
	protected async getRpcUsage(req: Request, res: Response) {
		const query = processFindManyQuery(req.query);
		try {
			await validateOrReject(query, { forbidUnknownValues: false });
		} catch (error) {
			this.httpBadRequest(res, error);
			return;
		}

		const metrics = await this.metricsService.getCountRpcPath(query.where.uuid, new Date(query.where.from), new Date(query.where.to));
		this.httpSuccess(res, metrics);
	}

	//Get requests for the world map component using a query
	@Get("/metrics/world-map")
	protected async getWorldMap(req: Request, res: Response) {
		const metrics = await this.metricsService.worldMapMetrics();
		if (!metrics) {
			this.httpNotFoundRequest(res);
			return;
		}
		this.httpSuccess(res, metrics);
	}

	//Get paths available in the database
	@Get("/metrics/paths")
	protected async getPaths(req: Request, res: Response) {
		const paths = await this.metricsService.getPathDictionary();
		if (!paths) {
			this.httpNotFoundRequest(res);
			return;
		}
		this.httpSuccess(res, paths);
	}
}
