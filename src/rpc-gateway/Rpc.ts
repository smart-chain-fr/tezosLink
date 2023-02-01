import { type Response, type Request } from "express";
import { Controller, Get } from "@ControllerPattern/index";
import { Service } from "typedi";
import BaseController from "@Common/system/controller-pattern/BaseController";

@Controller()
@Service()
export default class Rpc extends BaseController {
	@Get("/")
	protected get(req: Request, res: Response) {
		res.send("Hello World Rpc!");
	}
}
