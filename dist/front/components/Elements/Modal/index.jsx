"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var classes_module_scss_1 = tslib_1.__importDefault(require("./classes.module.scss"));
function Modal(props) {
    return (<>
        <div className={classes_module_scss_1.default["overlay"]}/>
        <div className={classes_module_scss_1.default["root"]}>
            <div className={classes_module_scss_1.default["title"]} id={'modal-title'}><h2>{props.title}</h2></div>
            {props.children}
        </div>
    </>);
}
exports.default = Modal;
//# sourceMappingURL=index.jsx.map