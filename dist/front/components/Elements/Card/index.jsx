"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var classes_module_scss_1 = tslib_1.__importDefault(require("./classes.module.scss"));
function Card(props) {
    return <div className={classes_module_scss_1.default["root"]}>
        <div className={classes_module_scss_1.default["title"]}>{props.title}</div>
            {props.data ?
            props.content :
            <div className={classes_module_scss_1.default["no-data"]}>No data</div>}
    </div>;
}
exports.default = Card;
//# sourceMappingURL=index.jsx.map