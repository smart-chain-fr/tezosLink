import { type Response, type Request } from "express";
import { Controller, Get } from "@ControllerPattern/index";
import { Service } from "typedi";
import ApiController from "@Common/system/controller-pattern/ApiController";
import TypeOfRequestService from "@Services/dictionaries/PathService";

@Controller()
@Service()
export default class TypeOfRequestController extends ApiController {
	constructor(private typeOfRequestService: TypeOfRequestService) {
		super();
	}

	@Get("/types-of-requests")
	protected async getTypeOfRequests(req: Request, res: Response) {
		const paths = await this.typeOfRequestService.getAllPaths();
		if (!paths || paths.length === 0) {
			this.httpNotFoundRequest(res);
			return;
		}
		this.httpSuccess(res, paths);
	}
}
