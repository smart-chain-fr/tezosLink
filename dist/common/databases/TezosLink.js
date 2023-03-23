"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var typedi_1 = require("typedi");
var database_1 = tslib_1.__importDefault(require("@Common/system/database"));
var dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
var TezosLink = /** @class */ (function () {
    function TezosLink() {
        this.dbProvider = new database_1.default({
            name: this.getDatabaseName(),
        });
    }
    TezosLink.prototype.getClient = function () {
        return this.dbProvider.getClient();
    };
    TezosLink.prototype.connect = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dbProvider.connect()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.dbProvider.getClient()];
                }
            });
        });
    };
    TezosLink.prototype.getDatabaseName = function () {
        var name = process.env["DATABASE_NAME"];
        if (!name)
            throw new Error("Database name is undefined!. Add name of db in the url.");
        return name;
    };
    TezosLink = tslib_1.__decorate([
        (0, typedi_1.Service)(),
        tslib_1.__metadata("design:paramtypes", [])
    ], TezosLink);
    return TezosLink;
}());
exports.default = TezosLink;
//# sourceMappingURL=TezosLink.js.map