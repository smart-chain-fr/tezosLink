import { type Response, type Request, type NextFunction } from "express";
import Container from "typedi";
import ExpressServer from "../ExpressServer";
import type BaseController from "./BaseController";
import ErrorCatch from "./ErrorCatch";
import { StRoute } from "./StRoute";

/**
 * @description Decorator to supports defining requests handler for Express on the class. Its fully support TypeScript and dependency injection.
 */
function Controller() {
	return <T extends { new (...args: any[]): BaseController }>(constructor: T) => {
		const controller = Container.get(constructor);
		if (!controller.expressRoutes || !Array.isArray(controller.expressRoutes)) return;
		controller.expressRoutes.forEach((route) => createRoute(controller, route));
	};
}

function createRoute(controller: any, route: StRoute) {
	const server: ExpressServer = Container.get(ExpressServer);
	const errorCatch = Container.get(ErrorCatch);
	const args = [
		...route.frontMiddlewares,
		async (req: Request, res: Response, next: NextFunction) => {
			try {
				await route.func.call(controller, req, res);
			} catch (error) {
				errorCatch.handle(req, res, next, error);
			}
		},
		...route.backMiddlewares,
	];
	server.getRouter()[route.type](route.path, ...args);
}

export default Controller;

