"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var class_transformer_1 = require("class-transformer");
var ObjectHydrate = /** @class */ (function () {
    function ObjectHydrate() {
    }
    ObjectHydrate.hydrate = function (object, from) {
        return (0, class_transformer_1.plainToClassFromExist)(object, from);
    };
    return ObjectHydrate;
}());
exports.default = ObjectHydrate;
//# sourceMappingURL=ObjectHydrate.js.map