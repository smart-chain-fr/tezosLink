"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORMBadQueryError = void 0;
var tslib_1 = require("tslib");
var ORMBadQueryError = /** @class */ (function (_super) {
    tslib_1.__extends(ORMBadQueryError, _super);
    function ORMBadQueryError(message, error) {
        var _this = _super.call(this, message) || this;
        _this.error = error;
        return _this;
    }
    return ORMBadQueryError;
}(Error));
exports.ORMBadQueryError = ORMBadQueryError;
//# sourceMappingURL=ORMBadQueryError.js.map