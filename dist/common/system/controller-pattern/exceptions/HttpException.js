"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var HttpCodes_1 = tslib_1.__importDefault(require("../HttpCodes"));
var HttpException = /** @class */ (function (_super) {
    tslib_1.__extends(HttpException, _super);
    function HttpException(message, httpCode) {
        if (httpCode === void 0) { httpCode = HttpCodes_1.default.UNKNOWN_ERROR; }
        var _this = _super.call(this, message) || this;
        _this.httpCode = httpCode;
        return _this;
    }
    return HttpException;
}(Error));
exports.default = HttpException;
//# sourceMappingURL=HttpException.js.map