import "module-alias/register";
import "reflect-metadata";
import dotenv from "dotenv";
import { Container } from "typedi";
import ExpressServer from "@Common/system/ExpressServer";
import routes from "@Api/controllers/index";
import cors from "cors";
import bodyParser from "body-parser";
import TezosLink from "@Common/databases/TezosLink";
import errorHandler from "@Api/middlewares/ErrorHandler";

dotenv.config();

const port = process.env["NEXT_PUBLIC_API_PORT"];
const rootUrl = process.env["NEXT_PUBLIC_API_ROOT_URL"];
const label = process.env["NEXT_PUBLIC_API_LABEL"] ?? "Unknown Service";

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
	],
	errorHandler,
});

routes.start();



