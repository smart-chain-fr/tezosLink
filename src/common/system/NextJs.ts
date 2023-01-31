import express, { Express } from 'express';
import { Service } from "typedi";
import next, { } from "next";
import url from "url";

interface IConfig {
  label: string;
  isDev: boolean;
  port: number;
  rootUrl: string;
}

@Service()
export default class Server {
  private router: Express = express();
  constructor() { }

  public getRouter(): Express { return this.router; }

  public init(config: IConfig) {

    const app = next({ dev: config.isDev });
    const handler = app.getRequestHandler();
    app.prepare().then(() => {

      const subRouter = express.Router();
      subRouter.get("/*", async (req, res) => {
        const parsedUrl = url.parse(req.url, true);
        await handler(req, res, parsedUrl);
      });

      this.router.use(config.rootUrl, subRouter);

      this.router.listen(config.port, () => {
        console.log(`Service listening on port ${config.port}`);
      });
    });

    return this;
  }
}