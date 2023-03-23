"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var class_validator_1 = require("class-validator");
var ProjectEntity_1 = tslib_1.__importDefault(require("./ProjectEntity"));
var MetricEntity = /** @class */ (function () {
    function MetricEntity() {
    }
    tslib_1.__decorate([
        (0, class_validator_1.IsNotEmpty)(),
        tslib_1.__metadata("design:type", Number)
    ], MetricEntity.prototype, "id", void 0);
    tslib_1.__decorate([
        (0, class_validator_1.IsNotEmpty)(({ groups: ["create"] })),
        tslib_1.__metadata("design:type", String)
    ], MetricEntity.prototype, "path", void 0);
    tslib_1.__decorate([
        (0, class_validator_1.IsNotEmpty)(({ groups: ["create"] })),
        tslib_1.__metadata("design:type", String)
    ], MetricEntity.prototype, "uuid", void 0);
    tslib_1.__decorate([
        (0, class_validator_1.IsNotEmpty)(({ groups: ["create"] })),
        tslib_1.__metadata("design:type", String)
    ], MetricEntity.prototype, "remote_address", void 0);
    tslib_1.__decorate([
        (0, class_validator_1.IsNotEmpty)(({ groups: ["create"] })),
        tslib_1.__metadata("design:type", Date)
    ], MetricEntity.prototype, "date_requested", void 0);
    tslib_1.__decorate([
        (0, class_validator_1.IsNotEmpty)(({ groups: ["create"] })),
        tslib_1.__metadata("design:type", Number)
    ], MetricEntity.prototype, "projectId", void 0);
    tslib_1.__decorate([
        (0, class_validator_1.IsNotEmpty)(({ groups: ["create"] })),
        tslib_1.__metadata("design:type", ProjectEntity_1.default)
    ], MetricEntity.prototype, "project", void 0);
    tslib_1.__decorate([
        (0, class_validator_1.IsDate)(),
        tslib_1.__metadata("design:type", Date)
    ], MetricEntity.prototype, "createdAt", void 0);
    tslib_1.__decorate([
        (0, class_validator_1.IsDate)(),
        tslib_1.__metadata("design:type", Date)
    ], MetricEntity.prototype, "updatedAt", void 0);
    return MetricEntity;
}());
exports.default = MetricEntity;
//# sourceMappingURL=MetricEntity.js.map