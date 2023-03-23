"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var HttpCodes_1 = tslib_1.__importDefault(require("@Common/system/controller-pattern/HttpCodes"));
var BaseController = /** @class */ (function () {
    function BaseController() {
        this.httpCode = HttpCodes_1.default;
    }
    BaseController.prototype.httpSuccess = function (response, responseData) {
        if (responseData === void 0) { responseData = null; }
        return this.httpResponse(response, HttpCodes_1.default.SUCCESS, responseData);
    };
    BaseController.prototype.httpCreated = function (response, responseData) {
        if (responseData === void 0) { responseData = null; }
        return this.httpResponse(response, HttpCodes_1.default.CREATED, responseData);
    };
    BaseController.prototype.httpBadRequest = function (response, responseData) {
        if (responseData === void 0) { responseData = "Http Bad Request"; }
        return this.httpResponse(response, HttpCodes_1.default.BAD_REQUEST, responseData);
    };
    BaseController.prototype.httpNotFoundRequest = function (response, responseData) {
        if (responseData === void 0) { responseData = "Not Found"; }
        return this.httpResponse(response, HttpCodes_1.default.NOT_FOUND, responseData);
    };
    BaseController.prototype.httpInternaleError = function (response, responseData) {
        if (responseData === void 0) { responseData = "http Internal Server Error"; }
        return this.httpResponse(response, HttpCodes_1.default.INTERNAL_ERROR, responseData);
    };
    BaseController.prototype.httpNotImplemented = function (response, responseData) {
        if (responseData === void 0) { responseData = "http Internal Server Error"; }
        return this.httpResponse(response, HttpCodes_1.default.NOT_IMPLEMENTED, responseData);
    };
    BaseController.prototype.httpResponse = function (response, httpCode, responseData) {
        if (responseData === void 0) { responseData = {}; }
        if (responseData instanceof Error) {
            throw responseData;
        }
        return response.status(httpCode).send(responseData);
    };
    return BaseController;
}());
exports.default = BaseController;
//# sourceMappingURL=BaseController.js.map