import Container from "typedi";
import ExpressServer from "../ExpressServer";

interface StRoute {
	type: "get" | "post" | "delete" | "put";
	path: string;
	func: (...args: any[]) => any;
}

/**
 * @description Decorator to supports defining requests handler for Express on the class. Its fully support TypeScript and dependency injection.
 */
export function Controller() {
	return <T extends { new (...args: any[]): {} }>(constructor: T) => {
		const server: ExpressServer = Container.get(ExpressServer);
		const controller = Container.get(constructor) as any;

		if (controller.__expressRoutes && Array.isArray(controller.__expressRoutes)) {
			controller.__expressRoutes.forEach((route: StRoute) => {
				server.getRouter()[route.type](route.path, (...args) => route.func.apply(controller, args));
			});
		}
	};
}

export function MethodsAny(type: StRoute["type"], value: string) {
	return (target: any, memberName: string, propertyDescriptor: PropertyDescriptor) => {
		(target.constructor.prototype.__expressRoutes as StRoute[]) ??= [];
		const routes: StRoute[] = target.constructor.prototype.__expressRoutes;
		routes.push({
			type: type,
			path: value,
			func: propertyDescriptor.value,
		});
	};
}

/**
 * @description Decorator Method GET
 */
export const Get = MethodsAny.bind(null, "get");

/**
 * @description Decorator Method POST
 */
export const Post = MethodsAny.bind(null, "post");

/**
 * @description Decorator Method DELETE
 */
export const Delete = MethodsAny.bind(null, "delete");

/**
 * @description Decorator Method PUT
 */
export const Put = MethodsAny.bind(null, "put");
