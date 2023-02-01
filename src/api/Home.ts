import { type Response, type Request } from "express";
import { Controller, Get } from "@ControllerPattern/index";
import { Service } from "typedi";
import BaseController from "@ControllerPattern/BaseController";

@Controller()
@Service()
export default class Home extends BaseController {
	@Get("/")
	@Get("/massi", [], [])
	protected get(req: Request, res: Response) {
		res.send("Hello World Massi!");
	}
}