"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentType = void 0;
var tslib_1 = require("tslib");
var ContentType;
(function (ContentType) {
    ContentType["JSON"] = "application/json";
    ContentType["FORM_DATA"] = "multipart/form-data;";
})(ContentType = exports.ContentType || (exports.ContentType = {}));
var BaseApiService = /** @class */ (function () {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    function BaseApiService() {
        this.backUrl = process.env["NEXT_PUBLIC_API_HOSTNAME"] + ':' + process.env['NEXT_PUBLIC_API_PORT'] + process.env['NEXT_PUBLIC_API_ROOT_URL'];
        this.proxyUrl = process.env["NEXT_PUBLIC_RPC_GATEWAY_HOSTNAME"] + ':' + process.env['NEXT_PUBLIC_RPC_GATEWAY_PORT'] + process.env['NEXT_PUBLIC_RPC_GATEWAY_ROOT_URL'];
    }
    BaseApiService.prototype.buildHeaders = function (contentType) {
        var headers = new Headers();
        if (contentType === ContentType.JSON) {
            headers.set("Content-Type", contentType);
        }
        return headers;
    };
    BaseApiService.prototype.buildBody = function (body) {
        return JSON.stringify(body);
    };
    BaseApiService.prototype.getRequest = function (url) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var request;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                request = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fetch(url, {
                                    method: "GET",
                                    headers: this.buildHeaders(ContentType.JSON),
                                })];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); };
                return [2 /*return*/, this.sendRequest(request)];
            });
        });
    };
    BaseApiService.prototype.postRequest = function (url, body) {
        if (body === void 0) { body = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var request;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                request = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fetch(url, {
                                    method: "POST",
                                    headers: this.buildHeaders(ContentType.JSON),
                                    body: this.buildBody(body),
                                })];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); };
                return [2 /*return*/, this.sendRequest(request)];
            });
        });
    };
    BaseApiService.prototype.putRequest = function (url, body) {
        if (body === void 0) { body = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var request;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                request = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fetch(url, {
                                    method: "PUT",
                                    headers: this.buildHeaders(ContentType.JSON),
                                    body: this.buildBody(body),
                                })];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); };
                return [2 /*return*/, this.sendRequest(request)];
            });
        });
    };
    BaseApiService.prototype.patchRequest = function (url, body) {
        if (body === void 0) { body = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var request;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                request = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fetch(url, {
                                    method: "PATCH",
                                    headers: this.buildHeaders(ContentType.JSON),
                                    body: this.buildBody(body),
                                })];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); };
                return [2 /*return*/, this.sendRequest(request)];
            });
        });
    };
    BaseApiService.prototype.deleteRequest = function (url, body) {
        if (body === void 0) { body = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var request;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                request = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fetch(url, {
                                    method: "DELETE",
                                    headers: this.buildHeaders(ContentType.JSON),
                                    body: this.buildBody(body),
                                })];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); };
                return [2 /*return*/, this.sendRequest(request)];
            });
        });
    };
    BaseApiService.prototype.putFormDataRequest = function (url, body) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var request;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                request = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fetch(url, {
                                    method: "PUT",
                                    headers: this.buildHeaders(ContentType.FORM_DATA),
                                    body: body,
                                })];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); };
                return [2 /*return*/, this.sendRequest(request)];
            });
        });
    };
    BaseApiService.prototype.sendRequest = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.processResponse(response, request)];
                }
            });
        });
    };
    BaseApiService.prototype.processResponse = function (response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var responseJson, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, response.json()];
                    case 1:
                        responseJson = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        responseJson = null;
                        return [3 /*break*/, 3];
                    case 3:
                        if (!response.ok) {
                            return [2 /*return*/, Promise.reject(response)];
                        }
                        return [2 /*return*/, responseJson];
                }
            });
        });
    };
    BaseApiService.prototype.onError = function (error) {
        console.error(error);
    };
    return BaseApiService;
}());
exports.default = BaseApiService;
//# sourceMappingURL=BaseApiService.js.map