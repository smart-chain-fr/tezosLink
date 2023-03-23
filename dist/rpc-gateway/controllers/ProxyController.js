"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentType = void 0;
var tslib_1 = require("tslib");
var dotenv_1 = tslib_1.__importDefault(require("dotenv"));
var index_1 = require("@ControllerPattern/index");
var typedi_1 = require("typedi");
var ApiController_1 = tslib_1.__importDefault(require("@Common/system/controller-pattern/ApiController"));
var axios_1 = tslib_1.__importDefault(require("axios"));
dotenv_1.default.config();
var ContentType;
(function (ContentType) {
    ContentType["JSON"] = "application/json";
    ContentType["FORM_DATA"] = "multipart/form-data;";
})(ContentType = exports.ContentType || (exports.ContentType = {}));
var ProxyController = /** @class */ (function (_super) {
    tslib_1.__extends(ProxyController, _super);
    function ProxyController() {
        return _super.call(this) || this;
    }
    ProxyController.prototype.buildHeaders = function (contentType) {
        var headers = new Headers();
        if (contentType === ContentType.JSON) {
            headers.set("Content-Type", contentType);
        }
        return headers;
    };
    ProxyController.prototype.getHealth = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.httpSuccess(res, { status: "success" });
                return [2 /*return*/];
            });
        });
    };
    ProxyController.prototype.getStatus = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var archiveNodeStatus, rollingNodeStatus, archiveTestURL, archiveTestResponse, err_1, rollingTestURL, rollingTestResponse, err_2, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        archiveNodeStatus = false;
                        rollingNodeStatus = false;
                        archiveTestURL = new URL("".concat(process.env["ARCHIVE_NODES_URL"], "/chains/main/blocks/head"));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.get(archiveTestURL.toString())];
                    case 2:
                        archiveTestResponse = _a.sent();
                        if (archiveTestResponse.status >= this.httpCode.SUCCESS && archiveTestResponse.status < this.httpCode.BAD_REQUEST) {
                            archiveNodeStatus = true;
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        this.httpBadRequest(res, err_1);
                        return [2 /*return*/];
                    case 4:
                        rollingTestURL = new URL("".concat(process.env["ROLLING_NODES_URL"], "/chains/main/blocks/head"));
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, axios_1.default.get(rollingTestURL.toString())];
                    case 6:
                        rollingTestResponse = _a.sent();
                        if (rollingTestResponse.status >= this.httpCode.SUCCESS && rollingTestResponse.status < this.httpCode.BAD_REQUEST) {
                            rollingNodeStatus = true;
                        }
                        return [3 /*break*/, 8];
                    case 7:
                        err_2 = _a.sent();
                        this.httpBadRequest(res, err_2);
                        return [2 /*return*/];
                    case 8:
                        data = {
                            archive_node: archiveNodeStatus,
                            rolling_node: rollingNodeStatus,
                        };
                        this.httpSuccess(res, data);
                        return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        (0, index_1.Get)("/health"),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], ProxyController.prototype, "getHealth", null);
    tslib_1.__decorate([
        (0, index_1.Get)("/status"),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], ProxyController.prototype, "getStatus", null);
    ProxyController = tslib_1.__decorate([
        (0, index_1.Controller)(),
        (0, typedi_1.Service)(),
        tslib_1.__metadata("design:paramtypes", [])
    ], ProxyController);
    return ProxyController;
}(ApiController_1.default));
exports.default = ProxyController;
//# sourceMappingURL=ProxyController.js.map