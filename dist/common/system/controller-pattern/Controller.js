"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var typedi_1 = tslib_1.__importDefault(require("typedi"));
var ExpressServer_1 = tslib_1.__importDefault(require("../ExpressServer"));
var ErrorCatch_1 = tslib_1.__importDefault(require("./ErrorCatch"));
/**
 * @description Decorator to supports defining requests handler for Express on the class. Its fully support TypeScript and dependency injection.
 */
function Controller() {
    return function (constructor) {
        var controller = typedi_1.default.get(constructor);
        if (!controller.expressRoutes || !Array.isArray(controller.expressRoutes))
            return;
        controller.expressRoutes.forEach(function (route) { return createRoute(controller, route); });
    };
}
function createRoute(controller, route) {
    var _a;
    var _this = this;
    var server = typedi_1.default.get(ExpressServer_1.default);
    var errorCatch = typedi_1.default.get(ErrorCatch_1.default);
    var args = tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray([], route.frontMiddlewares, true), [
        function (req, res, next) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, route.func.call(controller, req, res)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        errorCatch.handle(req, res, next, error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); }
    ], false), route.backMiddlewares, true);
    (_a = server.getRouter())[route.type].apply(_a, tslib_1.__spreadArray([route.path], args, false));
}
exports.default = Controller;
//# sourceMappingURL=Controller.js.map