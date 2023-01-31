import express, { Express, Router } from "express";
import { RequestHandlerParams } from "express-serve-static-core"
import { Service } from "typedi";

interface IConfig {
  label: string;
  port: number;
  rootUrl: string;
  middlwares: RequestHandlerParams[];
}

@Service()
export default class ExpressServer {
  private router: Express = express();
  private subRouter: Router = express.Router();
  constructor() { }

  public getRouter(): Router { return this.subRouter; }

  public init(config: IConfig) {

    this.router.use(...(config.middlwares));
    this.router.use(config.rootUrl, this.subRouter);

    this.router.listen(config.port, () => {
      console.log(`${config.label} Service listening on port ${config.port}`);
    });
    return this;
  }
}