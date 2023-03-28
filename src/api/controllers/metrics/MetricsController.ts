import { type Response, type Request } from "express";
import { Controller, Get } from "@ControllerPattern/index";
import { Service } from "typedi";
import { processFindManyQuery } from "prisma-query";
import ApiController from "@Common/system/controller-pattern/ApiController";
import MetricsService from "@Services/metric/MetricsService";
import { IsDateString, IsInt, IsOptional, IsUUID, Min, validate, validateOrReject, IsNotEmpty } from "class-validator";
import { plainToClass } from "class-transformer";

export class RequestsQuery {
	@IsUUID()
	uuid!: string;

	@IsDateString()
	from!: string;

	@IsDateString()
	to!: string;
}
export class queryProcessFindManyQuery {
	@IsUUID()
	@IsNotEmpty()
	projectUuid!: string;

	@IsOptional()
	@IsInt()
	@Min(0)
	skip?: number;

	@IsOptional()
	@IsInt()
	@Min(1)
	take?: number;
}

@Controller()
@Service()
export default class MetricsController extends ApiController {
	constructor(private metricsService: MetricsService) {
		super();
	}
	//Get metrics using a query
	@Get("/metrics")
	protected async get(req: Request, res: Response) {
		const query = processFindManyQuery(req.query);

		const metricsQuery = plainToClass(queryProcessFindManyQuery, {
			projectUuid: query.where ? query.where.projectUuid : null,
			skip: query.skip,
			take: query.take,
		});

		const errors = await validate(metricsQuery);
		if (errors.length > 0) {
			this.httpBadRequest(res, errors);
			return;
		}

		const metrics = await this.metricsService.getByCriterias({
			where: {
				...query.where,
				projectUuid: metricsQuery.projectUuid,
			},
			skip: metricsQuery.skip,
			take: metricsQuery.take,
			orderBy: query.orderBy,
			include: query.include,
		});

		this.httpSuccess(res, metrics);
	}

	@Get("/metrics/my-requests")
	protected async getByRequestsByDay(req: Request, res: Response) {
		const query = plainToClass(RequestsQuery, req.query);

		const errors = await validate(query);
		if (errors.length > 0) {
			this.httpBadRequest(res, errors);
			return;
		}

		const metrics = await this.metricsService.getRequestsByDay(query.uuid, new Date(query.from), new Date(query.to));
		this.httpSuccess(res, metrics);
	}

	//Get types of requests using a query
	@Get("/metrics/type-of-requests")
	protected async getRpcUsage(req: Request, res: Response) {
		const query = plainToClass(RequestsQuery, req.query);
		try {
			await validateOrReject(query, { forbidUnknownValues: false });
		} catch (error) {
			this.httpBadRequest(res, error);
			return;
		}

		const metrics = await this.metricsService.getCountRpcPath(query.uuid, new Date(query.from), new Date(query.to));
		this.httpSuccess(res, metrics);
	}

	//Get count-Requests using a query
	@Get("/metrics/count-requests")
	protected async getCountRequests(req: Request, res: Response) {
		const query = plainToClass(RequestsQuery, req.query);
		try {
			await validateOrReject(query, { forbidUnknownValues: false });
		} catch (error) {
			this.httpBadRequest(res, error);
			return;
		}
		const metrics = await this.metricsService.getCountAllMetricsByCriterias(query.uuid, new Date(query.from), new Date(query.to));
		if (isNaN(metrics)) {
			this.httpNotFoundRequest(res);
			return;
		}
		this.httpSuccess(res, { count: metrics });
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
