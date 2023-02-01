
import { type Response, type Request } from "express";
import { Controller, Get } from "@ControllerPattern/index";
import { Service } from "typedi";
import BaseController from "@Common/system/controller-pattern/BaseController";

@Controller()
@Service()
export default class Page2 extends BaseController {

	@Get("/page2")
	protected get(req: Request, res: Response) {
		res.send("Hello World Page2!");
	}
}