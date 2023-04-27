import BaseController from "./BaseController";
import { StRoute } from "./StRoute";

function MethodsAny(type: StRoute["type"], path: string, frontMiddlewares: StRoute["frontMiddlewares"] = [], backMiddlewares: StRoute["backMiddlewares"] = []) {
	return (target: any, memberName: string, propertyDescriptor: PropertyDescriptor) => {
		const func = propertyDescriptor.value;
		const constructor: typeof BaseController = target.constructor;
		constructor.prototype.expressRoutes ??= [];
		constructor.prototype.expressRoutes.push({ type, path, func, frontMiddlewares, backMiddlewares });
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

