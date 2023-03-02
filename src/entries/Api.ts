import "module-alias/register";
import "reflect-metadata";
import { Container } from "typedi";
import ExpressServer from "@Common/system/ExpressServer";
import routes from "@Api/controllers/index";
import cors from "cors";
import bodyParser from "body-parser";
import TezosLink from "@Common/databases/TezosLink";
import errorHandler from "@Api/middlewares/ErrorHandler";
import { BackendVariables } from "@Common/config/Variables";

(async () => {
	try {
		const variables = await Container.get(BackendVariables).validate();

		const port = variables.NEXT_PUBLIC_API_PORT;
		const rootUrl = variables.NEXT_PUBLIC_API_ROOT_URL;
		const label = variables.NEXT_PUBLIC_API_LABEL ?? "Unknown Service";
		
		Container.get(TezosLink).connect();
		Container.get(ExpressServer).init({
			label,
			port: parseInt(port),
			rootUrl,
			middlwares: [cors({ origin: "*" }), bodyParser.urlencoded({ extended: true }), bodyParser.json()],
			errorHandler,
		});

		routes.start();
	} catch (e) {
		console.error(e);
	}
})();

