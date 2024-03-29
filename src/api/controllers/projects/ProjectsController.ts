import { type Response, type Request } from "express";
import { Controller, Get, Post } from "@ControllerPattern/index";
import { Service } from "typedi";
import { ProjectEntity } from "@Common/ressources";
import { IsNotEmpty, IsString, IsUUID, validateOrReject } from "class-validator";
import ProjectsService from "@Services/project/ProjectsService";
import ObjectHydrate from "@Common/helpers/ObjectHydrate";
import { processFindManyQuery } from "prisma-query";
import ApiController from "@Common/system/controller-pattern/ApiController";

class Params {
	@IsString()
	@IsNotEmpty()
	@IsUUID()
	public uuid!: string;
}

@Controller()
@Service()
export default class ProjectsController extends ApiController {
	constructor(private projectService: ProjectsService) {
		super();
	}

	@Get("/projects")
	protected async get(req: Request, res: Response) {
		const query = processFindManyQuery(req.query);
		this.httpSuccess(res, await this.projectService.getByCriterias(query));
	}

	@Get("/projects/:uuid")
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

		const project = await this.projectService.getByUUID(params);
		if (!project) {
			this.httpNotFoundRequest(res);
			return;
		}
		this.httpSuccess(res, project);
	}

	@Post("/projects")
	protected async post(req: Request, res: Response) {
		const projectEntity = new ProjectEntity();
		ObjectHydrate.hydrate(projectEntity, req.body);
		try {
			await validateOrReject(projectEntity, { whitelist: true, forbidNonWhitelisted: true, groups: ["create"] });
		} catch (error) {
			this.httpBadRequest(res, error);
			return;
		}
		this.httpCreated(res, await this.projectService.create(projectEntity));
	}
}
