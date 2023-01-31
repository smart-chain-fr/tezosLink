
import { type Response, type Request } from "express";
import { Controller, Get } from "@ControllerPattern/index";
import { Service } from "typedi";

@Controller()
@Service()
export default class Page2 {

	@Get("/page2")
	protected get(req: Request, res: Response) {
		res.send("Hello World Page2!");
	}
}