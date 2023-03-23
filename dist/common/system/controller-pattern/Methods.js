"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Put = exports.Delete = exports.Post = exports.Get = void 0;
function MethodsAny(type, path, frontMiddlewares, backMiddlewares) {
    if (frontMiddlewares === void 0) { frontMiddlewares = []; }
    if (backMiddlewares === void 0) { backMiddlewares = []; }
    return function (target, memberName, propertyDescriptor) {
        var _a;
        var _b;
        var func = propertyDescriptor.value;
        var constructor = target.constructor;
        (_a = (_b = constructor.prototype).expressRoutes) !== null && _a !== void 0 ? _a : (_b.expressRoutes = []);
        constructor.prototype.expressRoutes.push({ type: type, path: path, func: func, frontMiddlewares: frontMiddlewares, backMiddlewares: backMiddlewares });
    };
}
/**
 * @description Decorator Method GET
 */
exports.Get = MethodsAny.bind(null, "get");
/**
 * @description Decorator Method POST
 */
exports.Post = MethodsAny.bind(null, "post");
/**
 * @description Decorator Method DELETE
 */
exports.Delete = MethodsAny.bind(null, "delete");
/**
 * @description Decorator Method PUT
 */
exports.Put = MethodsAny.bind(null, "put");
//# sourceMappingURL=Methods.js.map