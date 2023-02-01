import { type Response, type Request, type NextFunction } from "express";

import Container from "typedi";
import ExpressServer from "../ExpressServer";
import type BaseController from "./BaseController";
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
	const args = [
		...route.frontMiddlewares,
		async (req: Request, res: Response, next: NextFunction) => {
			await route.func.call(controller, req, res);
			next();
		},
		...route.backMiddlewares,
	];
	server.getRouter()[route.type](route.path, ...args);
}

export default Controller;

