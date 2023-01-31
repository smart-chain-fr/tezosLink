import "module-alias/register";
import "reflect-metadata";
import dotenv from "dotenv";
import { Container } from "typedi";
import ExpressServer from "@Common/system/ExpressServer";
import routes from "@RpcGateway/index";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const port = process.env["RPC_GATEWAY_PORT"];
const rootUrl = process.env["RPC_GATEWAY_ROOT_URL"];
const label = process.env["RPC_GATEWAY_LABEL"] ?? "Unknown Service";

if (!port) throw new Error(`process.env Port is undefined`);
if (!rootUrl) throw new Error(`process.env RootUrl is undefined`);

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

