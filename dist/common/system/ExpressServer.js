"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = tslib_1.__importDefault(require("express"));
var typedi_1 = require("typedi");
var ExpressServer = /** @class */ (function () {
    function ExpressServer() {
        this.router = (0, express_1.default)();
        this.subRouter = express_1.default.Router();
    }
    ExpressServer.prototype.getRouter = function () {
        return this.subRouter;
    };
    ExpressServer.prototype.init = function (config) {
        var _a;
        (_a = this.router).use.apply(_a, config.middlwares);
        this.router.use(config.rootUrl, this.subRouter);
        if (config.errorHandler)
            this.router.use(config.errorHandler);
        this.router.listen(config.port, function () {
            console.table([
                {
                    "Entry label": config.label,
                    Port: config.port,
                    "Root url": config.rootUrl,
                },
            ], ["Entry label", "Port", "Root url"]);
        });
        return this;
    };
    ExpressServer = tslib_1.__decorate([
        (0, typedi_1.Service)()
    ], ExpressServer);
    return ExpressServer;
}());
exports.default = ExpressServer;
//# sourceMappingURL=ExpressServer.js.map