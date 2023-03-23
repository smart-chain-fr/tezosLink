"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var HttpException_1 = tslib_1.__importDefault(require("@Common/system/controller-pattern/exceptions/HttpException"));
var HttpCodes_1 = tslib_1.__importDefault(require("@Common/system/controller-pattern/HttpCodes"));
function errorHandler(error, req, response, next) {
    var errorStatus = error["status"];
    /**
     * Used on when try to parse json on request
     */
    if (error instanceof SyntaxError && errorStatus === 400 && "body" in error) {
        response.status(HttpCodes_1.default.BAD_REQUEST).send({
            body: error["body"],
            type: error,
        });
        return;
    }
    if (error instanceof HttpException_1.default) {
        response.status(error.httpCode).send(error.message);
        return;
    }
    next(error);
}
exports.default = errorHandler;
//# sourceMappingURL=ErrorHandler.js.map