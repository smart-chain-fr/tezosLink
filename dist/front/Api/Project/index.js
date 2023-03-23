"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var BaseApiService_1 = tslib_1.__importDefault(require("src/front/Api/BaseApiService"));
var typedi_1 = require("typedi");
var Project = /** @class */ (function (_super) {
    tslib_1.__extends(Project, _super);
    function Project() {
        var _this = _super.call(this) || this;
        _this.baseURl = _this.backUrl.concat('/projects');
        return _this;
    }
    Project_1 = Project;
    Project.getInstance = function () {
        if (!this.instance) {
            return new Project_1();
        }
        else {
            return this.instance;
        }
    };
    Project.prototype.getAllProject = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = new URL(this.baseURl);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.getRequest(url)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        err_1 = _a.sent();
                        this.onError(err_1);
                        return [2 /*return*/, Promise.reject(err_1)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Project.prototype.getOneProject = function (uuid) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = new URL(this.baseURl.concat('/').concat(uuid));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.getRequest(url)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        err_2 = _a.sent();
                        this.onError(err_2);
                        return [2 /*return*/, Promise.reject(err_2)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Project.prototype.postProject = function (params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, err_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = new URL(this.baseURl);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.postRequest(url, params)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        err_3 = _a.sent();
                        this.onError(err_3);
                        return [2 /*return*/, Promise.reject(err_3)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    var Project_1;
    Project = Project_1 = tslib_1.__decorate([
        (0, typedi_1.Service)(),
        tslib_1.__metadata("design:paramtypes", [])
    ], Project);
    return Project;
}(BaseApiService_1.default));
exports.default = Project;
//# sourceMappingURL=index.js.map