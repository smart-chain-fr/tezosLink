"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dotenv_1 = tslib_1.__importDefault(require("dotenv"));
var client_1 = require("@prisma/client");
dotenv_1.default.config();
var DbProvider = /** @class */ (function () {
    function DbProvider(config) {
        this.config = config;
        this.client = new client_1.PrismaClient({
            datasources: {
                db: {
                    url: "postgres://".concat(process.env["DATABASE_USER"], ":").concat(process.env["DATABASE_PASSWORD"], "@").concat(process.env["DATABASE_HOSTNAME"], ":").concat(process.env["DATABASE_PORT"], "/").concat(process.env["DATABASE_NAME"]),
                },
            },
        });
    }
    DbProvider.prototype.connect = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.$connect()];
                    case 1:
                        _a.sent();
                        console.info("\u26A1\uFE0F[Prisma]: Connected to ".concat(this.config.name)); // A Logger middleware is to be added here
                        return [2 /*return*/];
                }
            });
        });
    };
    DbProvider.prototype.getClient = function () {
        return this.client;
    };
    DbProvider.prototype.disconnect = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.$disconnect()];
                    case 1:
                        _a.sent();
                        console.info("\u26A1\uFE0F[Prisma]: Disconnected from ".concat(this.config.name)); // A Logger middleware is to be added here
                        return [2 /*return*/];
                }
            });
        });
    };
    return DbProvider;
}());
exports.default = DbProvider;
//# sourceMappingURL=DbProvider.js.map