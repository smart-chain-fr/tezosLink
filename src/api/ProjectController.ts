import { type Response, type Request } from "express";
import { Controller, Get, Post } from "@ControllerPattern/index";
import { Inject, Service } from "typedi";
import { ProjectEntity } from "@Common/ressources";
import { IsNotEmpty, IsString, Validate, validateOrReject } from "class-validator";
import ProjectService from "@Services/project/ProjectService";
import ApiController from "./ApiController";
import { QueryService } from "@Services/BaseService";
import IsValidUuid from "@Common/system/class-validators/IsValidUuid";
import ObjectHydrate from "@Common/helpers/ObjectHydrate";

 class Params {
	@IsString()
	@IsNotEmpty()
	@Validate(IsValidUuid)
	public uuid!: string;
}

@Controller()
@Service()
export default class ProjectController extends ApiController {
	constructor(@Inject() private projectService: ProjectService) {
		super();
	}

	@Get("/project")
	protected async get(req: Request, res: Response) {
		let query = this.buildQueryAsObject<Partial<ProjectEntity>>(req);
		try {
			await validateOrReject(QueryService.createFrom<Partial<ProjectEntity>>(query), { forbidUnknownValues: true });
		} catch (error) {
			this.httpBadRequest(res, error);
			return;
		}
		this.httpSuccess(res, await this.projectService.find(query));
	}

	@Get("/project/:uuid")
	protected async getByUUID(req: Request, res: Response) {
			const { uuid } = req.params as Partial<Params>;
			const params = new Params();
			params.uuid = uuid!; 
		try {
			await validateOrReject(params, { forbidUnknownValues: true });
		} catch (error) {
			this.httpBadRequest(res, error);
			return;
		}
		this.httpSuccess(res, await this.projectService.findOne(params));
	}

	@Post("/project")
	protected async post(req: Request, res: Response) {
		const projectEntity = new ProjectEntity();
		ObjectHydrate.hydrate(projectEntity, req.body);
		try {
			await validateOrReject(projectEntity, { skipMissingProperties: true });
		} catch (error) {
			this.httpBadRequest(res, error);
			return;
		}
		this.httpCreated(res, await this.projectService.create(projectEntity));
	}
}

