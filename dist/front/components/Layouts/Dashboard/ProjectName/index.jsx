"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var classes_module_scss_1 = tslib_1.__importDefault(require("./classes.module.scss"));
function ProjectName(props) {
    return <div className={classes_module_scss_1.default["root"]}>
        Project {props.name}
    </div>;
}
exports.default = ProjectName;
//# sourceMappingURL=index.jsx.map