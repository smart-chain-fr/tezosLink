import "module-alias/register";
import "reflect-metadata";
import { Container } from "typedi";
import NextServer from "@Common/system/NextJs";
import { BackendVariables } from "@Common/config/Variables";

(async () => {
	try {
		const variables = await Container.get(BackendVariables).validate();

		const port = variables.WEB_PORT;
		const rootUrl = variables.WEB_ROOT_URL;
		const label = variables.WEB_LABEL ?? "Unknown Service";

		Container.get(NextServer).init({
			label,
			isDev: variables.NODE_ENV !== "production",
			port: parseInt(port),
			rootUrl,
		});
	} catch (e) {
		console.error(e);
	}
})();

