"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ObjectHydrate_1 = tslib_1.__importDefault(require("@Common/helpers/ObjectHydrate"));
var MetricsRepository_1 = tslib_1.__importDefault(require("@Common/repositories/MetricsRepository"));
var ressources_1 = require("@Common/ressources");
var typedi_1 = require("typedi");
var MetricService = /** @class */ (function () {
    function MetricService(metricRepository) {
        this.metricRepository = metricRepository;
    }
    /**
     * @throws {Error} If metrics are undefined
     */
    MetricService.prototype.getByCriterias = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var metrics;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.metricRepository.findMany(query)];
                    case 1:
                        metrics = _a.sent();
                        return [2 /*return*/, ObjectHydrate_1.default.hydrate(new ressources_1.MetricEntity(), metrics)];
                }
            });
        });
    };
    /**
     * @throws {Error} If metric is undefined
     */
    MetricService.prototype.getByUUID = function (metricEntity) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var metric;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.metricRepository.findOne(metricEntity)];
                    case 1:
                        metric = _a.sent();
                        if (!metric)
                            return [2 /*return*/, null];
                        return [2 /*return*/, ObjectHydrate_1.default.hydrate(new ressources_1.MetricEntity(), metric)];
                }
            });
        });
    };
    /**
     *
     * @throws {Error} If metric cannot be created
     * @returns
     */
    MetricService.prototype.create = function (metricEntity) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var metric;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.metricRepository.create(metricEntity)];
                    case 1:
                        metric = _a.sent();
                        if (!metric)
                            return [2 /*return*/, null];
                        return [2 /*return*/, ObjectHydrate_1.default.hydrate(new ressources_1.MetricEntity(), metric)];
                }
            });
        });
    };
    /**
     *
     * @throws {Error} If metric is undefined
     * @returns
     */
    MetricService.prototype.getCountRpcPath = function (metricEntity, from, to) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var pathsCount;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.metricRepository.countRpcPathUsage(metricEntity.projectId, from, to)];
                    case 1:
                        pathsCount = _a.sent();
                        if (!pathsCount)
                            return [2 /*return*/, null];
                        return [2 /*return*/, pathsCount];
                }
            });
        });
    };
    /**
     *
     * @throws {Error} If metric is undefined
     * @returns
     */
    MetricService.prototype.getCountAllMetrics = function (metricEntity) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var count;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.metricRepository.countAll(metricEntity.projectId)];
                    case 1:
                        count = _a.sent();
                        if (isNaN(count))
                            return [2 /*return*/, null];
                        return [2 /*return*/, count];
                }
            });
        });
    };
    /**
     *
     * @throws {Error} If metric is undefined
     * @returns
     */
    MetricService.prototype.getLastMetrics = function (metricEntity, limit) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var lastMetric;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.metricRepository.findLastRequests(metricEntity.projectId, limit)];
                    case 1:
                        lastMetric = _a.sent();
                        return [2 /*return*/, ObjectHydrate_1.default.hydrate(new ressources_1.MetricEntity(), lastMetric)];
                }
            });
        });
    };
    /**
     *
     * @throws {Error} If metric is undefined
     * @returns
     */
    MetricService.prototype.getRequestsByDay = function (metricEntity, from, to) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var requestByDay;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.metricRepository.findRequestsByDay(metricEntity.projectId, from, to)];
                    case 1:
                        requestByDay = _a.sent();
                        return [2 /*return*/, ObjectHydrate_1.default.hydrate(new ressources_1.MetricEntity(), requestByDay)];
                }
            });
        });
    };
    /**
     *
     * @throws {Error} If metric is undefined
     * @returns
     */
    MetricService.prototype.removeThreeMontsOldMetrics = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var months;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        months = 3;
                        return [4 /*yield*/, this.metricRepository.removeOldMetricsBymonths(months)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MetricService = tslib_1.__decorate([
        (0, typedi_1.Service)(),
        tslib_1.__metadata("design:paramtypes", [MetricsRepository_1.default])
    ], MetricService);
    return MetricService;
}());
exports.default = MetricService;
//# sourceMappingURL=MetricService.js.map