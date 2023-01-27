import express, {Express} from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import { Service } from "typedi";

@Service()
export default class Server {
    private router: Express = express();
    constructor() {
    }
    public getRouter(): Express { return this.router; }
    public init(){
        this.router.use(
            cors({ origin: "*" }),
            bodyParser.urlencoded({ extended: true }),
            bodyParser.json()
        );
        this.router.listen(process.env["API_PORT"], () => {
            console.log(`Api listening on port ${process.env["API_PORT"]}`);
          });
        return this;
    }
  }