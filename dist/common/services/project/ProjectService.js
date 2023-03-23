"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ObjectHydrate_1 = tslib_1.__importDefault(require("@Common/helpers/ObjectHydrate"));
var ProjectRepository_1 = tslib_1.__importDefault(require("@Common/repositories/ProjectRepository"));
var ressources_1 = require("@Common/ressources");
var typedi_1 = require("typedi");
var ProjectService = /** @class */ (function () {
    function ProjectService(projectRepository) {
        this.projectRepository = projectRepository;
    }
    /**
     * @throws {Error} If projects are undefined
     */
    ProjectService.prototype.getByCriterias = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var projects;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.projectRepository.findMany(query)];
                    case 1:
                        projects = _a.sent();
                        return [2 /*return*/, ObjectHydrate_1.default.hydrate(new ressources_1.ProjectEntity(), projects)];
                }
            });
        });
    };
    /**
     * @throws {Error} If project is undefined
     */
    ProjectService.prototype.getByUUID = function (projectEntity) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var project;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.projectRepository.findOne(projectEntity)];
                    case 1:
                        project = _a.sent();
                        if (!project)
                            return [2 /*return*/, null];
                        return [2 /*return*/, ObjectHydrate_1.default.hydrate(new ressources_1.ProjectEntity(), project)];
                }
            });
        });
    };
    /**
     *
     * @throws {Error} If project cannot be created
     * @returns
     */
    ProjectService.prototype.create = function (projectEntity) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var project;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.projectRepository.create(projectEntity)];
                    case 1:
                        project = _a.sent();
                        if (!project)
                            return [2 /*return*/, null];
                        return [2 /*return*/, ObjectHydrate_1.default.hydrate(new ressources_1.ProjectEntity(), project)];
                }
            });
        });
    };
    ProjectService = tslib_1.__decorate([
        (0, typedi_1.Service)(),
        tslib_1.__metadata("design:paramtypes", [ProjectRepository_1.default])
    ], ProjectService);
    return ProjectService;
}());
exports.default = ProjectService;
//# sourceMappingURL=ProjectService.js.map