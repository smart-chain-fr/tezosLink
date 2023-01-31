import { Service } from "typedi";
import Server from "../common/system/ExpressServer";
import { Response, Request } from "express";
@Service()
export default class Page2 {
  constructor(server: Server) {
    server.getRouter().get("/page2", (req, res) => this.get(req, res));
  }

  private get(req: Request, res: Response) {
    res.send("Hello World Page2!");
    console.log(req.query);
  }
}
