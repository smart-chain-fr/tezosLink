import "module-alias/register";
import "reflect-metadata";
import dotenv from "dotenv";
import { Container } from "typedi";
import NextServer from "@Common/system/NextJs";

dotenv.config();

const port = process.env["WEB_PORT"]; 
const rootUrl = process.env["WEB_ROOT_URL"];
const label = process.env["WEB_LABEL"] ?? "Unknown Service";

if (!port) throw new Error(`process.env Port is undefined`);
if (!rootUrl) throw new Error(`process.env RootUrl is undefined`);

Container.get(NextServer).init({
	label,
	isDev: process.env.NODE_ENV !== 'production',
	port: parseInt(port),
	rootUrl,
});