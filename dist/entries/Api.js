"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("module-alias/register");
require("reflect-metadata");
var dotenv_1 = tslib_1.__importDefault(require("dotenv"));
var typedi_1 = require("typedi");
var ExpressServer_1 = tslib_1.__importDefault(require("@Common/system/ExpressServer"));
var index_1 = tslib_1.__importDefault(require("@Api/controllers/index"));
var cors_1 = tslib_1.__importDefault(require("cors"));
var body_parser_1 = tslib_1.__importDefault(require("body-parser"));
var TezosLink_1 = tslib_1.__importDefault(require("@Common/databases/TezosLink"));
var ErrorHandler_1 = tslib_1.__importDefault(require("@Api/middlewares/ErrorHandler"));
dotenv_1.default.config();
var port = process.env["NEXT_PUBLIC_API_PORT"];
var rootUrl = process.env["NEXT_PUBLIC_API_ROOT_URL"];
var label = (_a = process.env["NEXT_PUBLIC_API_LABEL"]) !== null && _a !== void 0 ? _a : "Unknown Service";
if (!port)
    throw new Error("process.env Port is undefined");
if (!rootUrl)
    throw new Error("process.env RootUrl is undefined");
typedi_1.Container.get(TezosLink_1.default).connect();
typedi_1.Container.get(ExpressServer_1.default).init({
    label: label,
    port: parseInt(port),
    rootUrl: rootUrl,
    middlwares: [
        (0, cors_1.default)({ origin: "*" }),
        body_parser_1.default.urlencoded({ extended: true }),
        body_parser_1.default.json(),
    ],
    errorHandler: ErrorHandler_1.default,
});
index_1.default.start();
//# sourceMappingURL=Api.js.map