"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var TezosLink_1 = tslib_1.__importDefault(require("@Common/databases/TezosLink"));
var ORMBadQueryError_1 = require("@Common/system/database/exceptions/ORMBadQueryError");
var typedi_1 = require("typedi");
var uuid_1 = require("uuid");
var ProjectRepository = /** @class */ (function () {
    function ProjectRepository(database) {
        this.database = database;
    }
    Object.defineProperty(ProjectRepository.prototype, "model", {
        get: function () {
            return this.database.getClient().project;
        },
        enumerable: false,
        configurable: true
    });
    ProjectRepository.prototype.findMany = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                try {
                    return [2 /*return*/, this.model.findMany(query)];
                }
                catch (error) {
                    throw new ORMBadQueryError_1.ORMBadQueryError(error.message, error);
                }
                return [2 /*return*/];
            });
        });
    };
    ProjectRepository.prototype.findOne = function (projectEntity) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data;
            return tslib_1.__generator(this, function (_a) {
                try {
                    data = tslib_1.__assign({}, projectEntity);
                    return [2 /*return*/, this.model.findUnique({
                            where: data,
                            include: {
                                // Include metrics & count
                                Metrics: true,
                                _count: {
                                    select: { Metrics: true },
                                },
                            },
                        })];
                }
                catch (error) {
                    throw new ORMBadQueryError_1.ORMBadQueryError(error.message, error);
                }
                return [2 /*return*/];
            });
        });
    };
    ProjectRepository.prototype.create = function (projectEntity) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data;
            return tslib_1.__generator(this, function (_a) {
                try {
                    data = tslib_1.__assign({}, projectEntity);
                    data.uuid = (0, uuid_1.v4)();
                    return [2 /*return*/, this.model.create({
                            data: {
                                uuid: data.uuid,
                                title: data.title,
                                network: data.network,
                            },
                            include: {
                                // Include metrics
                                Metrics: true,
                            },
                        })];
                }
                catch (error) {
                    throw new ORMBadQueryError_1.ORMBadQueryError(error.message, error);
                }
                return [2 /*return*/];
            });
        });
    };
    ProjectRepository = tslib_1.__decorate([
        (0, typedi_1.Service)(),
        tslib_1.__metadata("design:paramtypes", [TezosLink_1.default])
    ], ProjectRepository);
    return ProjectRepository;
}());
exports.default = ProjectRepository;
//# sourceMappingURL=ProjectRepository.js.map