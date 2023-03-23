"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var index_1 = require("@ControllerPattern/index");
var typedi_1 = require("typedi");
var ressources_1 = require("@Common/ressources");
var class_validator_1 = require("class-validator");
var ProjectService_1 = tslib_1.__importDefault(require("@Services/project/ProjectService"));
var ObjectHydrate_1 = tslib_1.__importDefault(require("@Common/helpers/ObjectHydrate"));
var prisma_query_1 = require("prisma-query");
var ApiController_1 = tslib_1.__importDefault(require("@Common/system/controller-pattern/ApiController"));
var Params = /** @class */ (function () {
    function Params() {
    }
    tslib_1.__decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsUUID)(),
        tslib_1.__metadata("design:type", String)
    ], Params.prototype, "uuid", void 0);
    return Params;
}());
var ProjectController = /** @class */ (function (_super) {
    tslib_1.__extends(ProjectController, _super);
    function ProjectController(projectService) {
        var _this = _super.call(this) || this;
        _this.projectService = projectService;
        return _this;
    }
    ProjectController.prototype.get = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var query, _a, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        query = (0, prisma_query_1.processFindManyQuery)(req.query);
                        _a = this.httpSuccess;
                        _b = [res];
                        return [4 /*yield*/, this.projectService.getByCriterias(query)];
                    case 1:
                        _a.apply(this, _b.concat([_c.sent()]));
                        return [2 /*return*/];
                }
            });
        });
    };
    ProjectController.prototype.getByUUID = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uuid, params, error_1, project;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uuid = req.params.uuid;
                        params = new Params();
                        params.uuid = uuid;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, (0, class_validator_1.validateOrReject)(params, { forbidUnknownValues: true })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        this.httpBadRequest(res, error_1);
                        return [2 /*return*/];
                    case 4: return [4 /*yield*/, this.projectService.getByUUID(params)];
                    case 5:
                        project = _a.sent();
                        if (!project) {
                            this.httpNotFoundRequest(res);
                            return [2 /*return*/];
                        }
                        this.httpSuccess(res, project);
                        return [2 /*return*/];
                }
            });
        });
    };
    ProjectController.prototype.post = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var projectEntity, error_2, _a, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        projectEntity = new ressources_1.ProjectEntity();
                        ObjectHydrate_1.default.hydrate(projectEntity, req.body);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, (0, class_validator_1.validateOrReject)(projectEntity, { whitelist: true, forbidNonWhitelisted: true, groups: ["create"] })];
                    case 2:
                        _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _c.sent();
                        this.httpBadRequest(res, error_2);
                        return [2 /*return*/];
                    case 4:
                        _a = this.httpCreated;
                        _b = [res];
                        return [4 /*yield*/, this.projectService.create(projectEntity)];
                    case 5:
                        _a.apply(this, _b.concat([_c.sent()]));
                        return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        (0, index_1.Get)("/projects"),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], ProjectController.prototype, "get", null);
    tslib_1.__decorate([
        (0, index_1.Get)("/projects/:uuid"),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], ProjectController.prototype, "getByUUID", null);
    tslib_1.__decorate([
        (0, index_1.Post)("/projects"),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], ProjectController.prototype, "post", null);
    ProjectController = tslib_1.__decorate([
        (0, index_1.Controller)(),
        (0, typedi_1.Service)(),
        tslib_1.__metadata("design:paramtypes", [ProjectService_1.default])
    ], ProjectController);
    return ProjectController;
}(ApiController_1.default));
exports.default = ProjectController;
//# sourceMappingURL=ProjectController.js.map