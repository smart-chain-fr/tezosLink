"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var TezosLink_1 = tslib_1.__importDefault(require("@Common/databases/TezosLink"));
var ORMBadQueryError_1 = require("@Common/system/database/exceptions/ORMBadQueryError");
var typedi_1 = require("typedi");
var MetricRepository = /** @class */ (function () {
    function MetricRepository(database) {
        this.database = database;
    }
    Object.defineProperty(MetricRepository.prototype, "model", {
        get: function () {
            return this.database.getClient().metric;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MetricRepository.prototype, "instanceDb", {
        get: function () {
            return this.database.getClient();
        },
        enumerable: false,
        configurable: true
    });
    MetricRepository.prototype.findMany = function (query) {
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
    MetricRepository.prototype.findOne = function (metricEntity) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data;
            return tslib_1.__generator(this, function (_a) {
                try {
                    data = tslib_1.__assign({}, metricEntity);
                    return [2 /*return*/, this.model.findUnique({ where: data })];
                }
                catch (error) {
                    throw new ORMBadQueryError_1.ORMBadQueryError(error.message, error);
                }
                return [2 /*return*/];
            });
        });
    };
    MetricRepository.prototype.create = function (metricEntity) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data;
            return tslib_1.__generator(this, function (_a) {
                try {
                    data = tslib_1.__assign({}, metricEntity);
                    return [2 /*return*/, this.model.create({
                            data: {
                                path: data.path,
                                uuid: data.uuid,
                                remote_address: data.remote_address,
                                date_requested: data.date_requested,
                                project: {
                                    connect: {
                                        id: data.id,
                                    },
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
    // Create many metrics in bulk
    MetricRepository.prototype.createMany = function (metricEntity) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data_1, result_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                try {
                    data_1 = tslib_1.__assign({}, metricEntity);
                    result_1 = [];
                    this.instanceDb.$transaction(function (transaction) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var _i, data_2, item, _a, _b;
                        return tslib_1.__generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    _i = 0, data_2 = data_1;
                                    _c.label = 1;
                                case 1:
                                    if (!(_i < data_2.length)) return [3 /*break*/, 4];
                                    item = data_2[_i];
                                    if (!item)
                                        return [3 /*break*/, 3];
                                    _b = (_a = result_1).push;
                                    return [4 /*yield*/, transaction.metric.create({
                                            data: {
                                                path: item.path,
                                                uuid: item.uuid,
                                                remote_address: item.remote_address,
                                                date_requested: item.date_requested,
                                                project: {
                                                    connect: {
                                                        id: item.id,
                                                    },
                                                },
                                            },
                                        })];
                                case 2:
                                    _b.apply(_a, [_c.sent()]);
                                    _c.label = 3;
                                case 3:
                                    _i++;
                                    return [3 /*break*/, 1];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/, result_1];
                }
                catch (error) {
                    throw new ORMBadQueryError_1.ORMBadQueryError(error.message, error);
                }
                return [2 /*return*/];
            });
        });
    };
    // Count Rpc path usage for a specific project
    MetricRepository.prototype.countRpcPathUsage = function (projectId, from, to) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                try {
                    return [2 /*return*/, this.model.groupBy({
                            by: ["path"],
                            _count: {
                                path: true,
                            },
                            where: {
                                projectId: projectId,
                                date_requested: {
                                    gte: from,
                                    lte: to,
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
    // Last requests for a specific project
    MetricRepository.prototype.findLastRequests = function (projectId, limit) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                try {
                    return [2 /*return*/, this.model.findMany({
                            where: {
                                projectId: projectId,
                            },
                            take: limit,
                            orderBy: {
                                date_requested: "desc",
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
    // Find Requests by Day for a specific project
    MetricRepository.prototype.findRequestsByDay = function (projectId, from, to) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result, response, _i, _a, item;
            return tslib_1.__generator(this, function (_b) {
                try {
                    result = [];
                    response = this.model.groupBy({
                        by: ["date_requested"],
                        _count: {
                            date_requested: true,
                        },
                        where: {
                            projectId: projectId,
                            date_requested: {
                                gte: from,
                                lte: to,
                            },
                        },
                    });
                    for (_i = 0, _a = response; _i < _a.length; _i++) {
                        item = _a[_i];
                        result.push({
                            date_requested: item.date_requested,
                            count: item._count.date_requested,
                        });
                    }
                    return [2 /*return*/, result];
                }
                catch (error) {
                    throw new ORMBadQueryError_1.ORMBadQueryError(error.message, error);
                }
                return [2 /*return*/];
            });
        });
    };
    // Count all metrics by criterias for a specific project
    MetricRepository.prototype.countAll = function (projectId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                try {
                    return [2 /*return*/, this.model.count({
                            where: {
                                projectId: projectId,
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
    // Remove Three months old metrics
    MetricRepository.prototype.removeOldMetricsBymonths = function (months) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var date;
            return tslib_1.__generator(this, function (_a) {
                try {
                    date = new Date();
                    date.setMonth(date.getMonth() - months);
                    this.model.deleteMany({
                        where: {
                            date_requested: {
                                lte: date,
                            },
                        },
                    });
                }
                catch (error) {
                    throw new ORMBadQueryError_1.ORMBadQueryError(error.message, error);
                }
                return [2 /*return*/];
            });
        });
    };
    MetricRepository = tslib_1.__decorate([
        (0, typedi_1.Service)(),
        tslib_1.__metadata("design:paramtypes", [TezosLink_1.default])
    ], MetricRepository);
    return MetricRepository;
}());
exports.default = MetricRepository;
//# sourceMappingURL=MetricsRepository.js.map