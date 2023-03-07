import "module-alias/register";
import "reflect-metadata";
import { Container } from "typedi";
import ExpressServer from "@Common/system/ExpressServer";
import routes from "@RpcGateway/controllers/index";
import cors from "cors";
import bodyParser from "body-parser";
import errorHandler from "@Api/middlewares/ErrorHandler";
import { BackendVariables } from "@Common/config/Variables";

(async () => {
	const variables = await Container.get(BackendVariables).validate();

	const port = variables.RPC_GATEWAY_PORT;
	const rootUrl = variables.RPC_GATEWAY_ROOT_URL;
	const label = variables.RPC_GATEWAY_LABEL ?? "Unknown Service";

	Container.get(ExpressServer).init({
		label,
		port: parseInt(port),
		rootUrl,
		middlwares: [cors({ origin: "*" }), bodyParser.urlencoded({ extended: true }), bodyParser.json()],
		errorHandler,
	});

	routes.start();
})();

