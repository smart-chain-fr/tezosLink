import { Service } from "typedi";
import Server from "../common/system/ExpressServer";
import { Response, Request } from "express";
@Service()
export default class Rpc {
  constructor(server: Server) {
    server.getRouter().get("/", (req, res) => this.get(req, res));
  }

  private get(req: Request, res: Response) {
    res.send("Hello World Rpc!");
    console.log(req.query);
  }
}
