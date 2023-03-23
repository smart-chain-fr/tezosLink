"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var typedi_1 = require("typedi");
var ProxyController_1 = tslib_1.__importDefault(require("./ProxyController"));
exports.default = {
    start: function () {
        typedi_1.Container.get(ProxyController_1.default);
    }
};
//# sourceMappingURL=index.js.map