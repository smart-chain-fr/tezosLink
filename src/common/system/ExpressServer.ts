import express, { Express, Router } from "express";
import { Service } from "typedi";
import ServerInterface, { IConfig } from "./ServerInterface";

@Service()
export default class ExpressServer implements ServerInterface {
	private router: Express = express();
	private subRouter: Router = express.Router();

	public getRouter(): Router {
		return this.subRouter;
	}

	public init(config: IConfig) {
		this.router.use(...config.middlwares);
		this.router.use(config.rootUrl, this.subRouter);
		if (config.errorHandler) this.router.use(config.errorHandler);

		this.router.listen(config.port, () => {
			console.table(
				[
					{
						"Entry label": config.label,
						Port: config.port,
						"Root url": config.rootUrl,
					},
				],
				["Entry label", "Port", "Root url"],
			);
		});
		return this;
	}
}

