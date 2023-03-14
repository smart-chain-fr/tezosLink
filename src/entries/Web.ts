import "module-alias/register";
import "reflect-metadata";
import { Container } from "typedi";
import NextServer from "@Common/system/NextJs";
import { FrontendVariables } from "@Front/config/VariablesFront";
import dotenv from "dotenv";

(async () => {
	try {
		dotenv.config();
		const frontVariables = Container.get(FrontendVariables);

		const port = frontVariables.WEB_PORT;
		const rootUrl = frontVariables.WEB_ROOT_URL;
		const label = frontVariables.WEB_LABEL ?? "Unknown Service";

		Container.get(NextServer).init({
			label,
			isDev: false,
			port: parseInt(port),
			rootUrl,
		});
	} catch (e) {
		console.error(e);
	}
})();

