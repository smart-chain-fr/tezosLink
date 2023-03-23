"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpCodes;
(function (HttpCodes) {
    HttpCodes[HttpCodes["SUCCESS"] = 200] = "SUCCESS";
    HttpCodes[HttpCodes["CREATED"] = 201] = "CREATED";
    HttpCodes[HttpCodes["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpCodes[HttpCodes["INTERNAL_ERROR"] = 500] = "INTERNAL_ERROR";
    HttpCodes[HttpCodes["UNKNOWN_ERROR"] = 520] = "UNKNOWN_ERROR";
    HttpCodes[HttpCodes["NOT_IMPLEMENTED"] = 501] = "NOT_IMPLEMENTED";
    HttpCodes[HttpCodes["NOT_FOUND"] = 404] = "NOT_FOUND";
})(HttpCodes || (HttpCodes = {}));
exports.default = HttpCodes;
//# sourceMappingURL=HttpCodes.js.map