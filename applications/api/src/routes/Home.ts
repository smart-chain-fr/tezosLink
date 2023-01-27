import { Service } from "typedi";
import Server from "../Server";
import { Response, Request } from "express";
@Service()
export default class Home {
  constructor(server: Server) {
    server.getRouter().get("/", (req, res) => this.get(req, res));
  }

  private get(req: Request, res: Response) {
    res.send("Hello World Massi!");
    console.log(req.query);
  }
}
