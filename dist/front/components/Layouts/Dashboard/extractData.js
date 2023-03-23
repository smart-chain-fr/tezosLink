"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastRequest = exports.getRequestByDays = exports.getRpcUsage = void 0;
function getRpcUsage(metrics) {
    var rpcUsage = [];
    if (metrics === undefined)
        return rpcUsage;
    metrics.map(function (metric) {
        if (!rpcUsage.some(function (rpc) { return rpc.label === metric.path; })) {
            rpcUsage.push({
                label: metric.path,
                value: metrics.filter(function (m) { return m.path === metric.path; }).length
            });
        }
    });
    return rpcUsage;
}
exports.getRpcUsage = getRpcUsage;
function getRequestByDays(metrics) {
    var requestByDay = [];
    if (metrics === undefined)
        return requestByDay;
    metrics.map(function (metric) {
        if (!requestByDay.some(function (request) { return request.date === metric.date_requested; })) {
            requestByDay.push({
                date: metric.date_requested,
                value: metrics.filter(function (m) { return m.date_requested === metric.date_requested; }).length
            });
        }
    });
    return requestByDay;
}
exports.getRequestByDays = getRequestByDays;
function getLastRequest(metrics, nbOfRequest) {
    var lastRequest = [];
    if (metrics === undefined)
        return lastRequest;
    return metrics === null || metrics === void 0 ? void 0 : metrics.slice(0, nbOfRequest).map(function (metric) { return metric.path; });
}
exports.getLastRequest = getLastRequest;
//# sourceMappingURL=extractData.js.map