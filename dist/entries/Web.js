"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("module-alias/register");
require("reflect-metadata");
var dotenv_1 = tslib_1.__importDefault(require("dotenv"));
var typedi_1 = require("typedi");
var NextJs_1 = tslib_1.__importDefault(require("@Common/system/NextJs"));
dotenv_1.default.config();
var port = process.env.WEB_PORT; //["WEB_PORT"];
var rootUrl = process.env["WEB_ROOT_URL"];
var label = (_a = process.env["WEB_LABEL"]) !== null && _a !== void 0 ? _a : "Unknown Service";
if (!port)
    throw new Error("process.env Port is undefined");
if (!rootUrl)
    throw new Error("process.env RootUrl is undefined");
typedi_1.Container.get(NextJs_1.default).init({
    label: label,
    isDev: process.env.NODE_ENV !== 'production',
    port: parseInt(port),
    rootUrl: rootUrl,
});
//# sourceMappingURL=Web.js.map