"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = tslib_1.__importDefault(require("express"));
var typedi_1 = require("typedi");
var next_1 = tslib_1.__importDefault(require("next"));
var url_1 = tslib_1.__importDefault(require("url"));
var Server = /** @class */ (function () {
    function Server() {
        this.router = (0, express_1.default)();
    }
    Server.prototype.getRouter = function () {
        return this.router;
    };
    Server.prototype.init = function (config) {
        var _this = this;
        var app = (0, next_1.default)({ dev: config.isDev });
        var handler = app.getRequestHandler();
        app.prepare().then(function () {
            var subRouter = express_1.default.Router();
            subRouter.get("/*", function (req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var parsedUrl;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            parsedUrl = url_1.default.parse(req.url, true);
                            return [4 /*yield*/, handler(req, res, parsedUrl)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            _this.router.use(config.rootUrl, subRouter);
            _this.router.listen(config.port, function () {
                console.table([
                    {
                        "Entry label": config.label,
                        Port: config.port,
                        "Root url": config.rootUrl,
                    },
                ], ["Entry label", "Port", "Root url"]);
            });
        });
        return this;
    };
    Server = tslib_1.__decorate([
        (0, typedi_1.Service)(),
        tslib_1.__metadata("design:paramtypes", [])
    ], Server);
    return Server;
}());
exports.default = Server;
//# sourceMappingURL=NextJs.js.map