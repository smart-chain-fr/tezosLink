import "module-alias/register";
import "reflect-metadata";
import dotenv from "dotenv";
import { Container } from "typedi";
import ExpressServer from "@Common/system/ExpressServer";
import routes from "@Api/index";
import cors from "cors";
import bodyParser from "body-parser";
import TezosLink from "@Common/databases/TezosLink";

dotenv.config();

const port = process.env["API_PORT"];
const rootUrl = process.env["API_ROOT_URL"];
const label = process.env["API_LABEL"] ?? "Unknown Service";

if (!port) throw new Error(`process.env Port is undefined`);
if (!rootUrl) throw new Error(`process.env RootUrl is undefined`);
Container.get(TezosLink).connect();
Container.get(ExpressServer).init({
	label,
	port: parseInt(port),
	rootUrl,
	middlwares: [
		cors({ origin: "*" }),
		bodyParser.urlencoded({ extended: true }),
		bodyParser.json(),
	]
});

routes.start();



