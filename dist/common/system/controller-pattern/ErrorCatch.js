"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var typedi_1 = require("typedi");
/**
 * Capture primitive errors to preserve application crash
 */
var ErrorCatch = /** @class */ (function () {
    function ErrorCatch() {
    }
    ErrorCatch.prototype.handle = function (request, response, next) {
        var _a;
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        next((_a = args[args.length - 1]) !== null && _a !== void 0 ? _a : "Unknown Error");
    };
    ErrorCatch = tslib_1.__decorate([
        (0, typedi_1.Service)(),
        tslib_1.__metadata("design:paramtypes", [])
    ], ErrorCatch);
    return ErrorCatch;
}());
exports.default = ErrorCatch;
//# sourceMappingURL=ErrorCatch.js.map