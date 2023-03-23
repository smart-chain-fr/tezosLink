"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var class_validator_1 = require("class-validator");
var ProjectEntity = /** @class */ (function () {
    function ProjectEntity() {
    }
    tslib_1.__decorate([
        (0, class_validator_1.IsNotEmpty)(),
        tslib_1.__metadata("design:type", Number)
    ], ProjectEntity.prototype, "id", void 0);
    tslib_1.__decorate([
        (0, class_validator_1.IsNotEmpty)({ groups: ["create"] }),
        tslib_1.__metadata("design:type", String)
    ], ProjectEntity.prototype, "title", void 0);
    tslib_1.__decorate([
        (0, class_validator_1.IsNotEmpty)(),
        tslib_1.__metadata("design:type", String)
    ], ProjectEntity.prototype, "uuid", void 0);
    tslib_1.__decorate([
        (0, class_validator_1.IsDate)(),
        tslib_1.__metadata("design:type", Date)
    ], ProjectEntity.prototype, "createdAt", void 0);
    tslib_1.__decorate([
        (0, class_validator_1.IsDate)(),
        tslib_1.__metadata("design:type", Date)
    ], ProjectEntity.prototype, "updatedAt", void 0);
    tslib_1.__decorate([
        (0, class_validator_1.IsNotEmpty)({ groups: ["create"] }),
        tslib_1.__metadata("design:type", String)
    ], ProjectEntity.prototype, "network", void 0);
    tslib_1.__decorate([
        (0, class_validator_1.IsOptional)(),
        tslib_1.__metadata("design:type", Array)
    ], ProjectEntity.prototype, "metrics", void 0);
    return ProjectEntity;
}());
exports.default = ProjectEntity;
//# sourceMappingURL=ProjectEntity.js.map