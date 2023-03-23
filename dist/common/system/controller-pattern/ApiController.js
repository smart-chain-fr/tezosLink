"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseStatusCodes = void 0;
var tslib_1 = require("tslib");
var typedi_1 = require("typedi");
var BaseController_1 = tslib_1.__importDefault(require("@Common/system/controller-pattern/BaseController"));
var HttpCodes_1 = tslib_1.__importDefault(require("@Common/system/controller-pattern/HttpCodes"));
exports.ResponseStatusCodes = HttpCodes_1.default;
var ApiController = /** @class */ (function (_super) {
    tslib_1.__extends(ApiController, _super);
    function ApiController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ApiController = tslib_1.__decorate([
        (0, typedi_1.Service)()
    ], ApiController);
    return ApiController;
}(BaseController_1.default));
exports.default = ApiController;
//# sourceMappingURL=ApiController.js.map