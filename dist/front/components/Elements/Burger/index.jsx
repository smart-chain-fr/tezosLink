"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var classes_module_scss_1 = tslib_1.__importDefault(require("./classes.module.scss"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
function Burger(_a) {
    var state = _a.state, callback = _a.callback;
    return (<div className={classes_module_scss_1.default["root"]} onClick={function () { return callback(); }}>
			<div className={classes_module_scss_1.default["box"]}>
				<div className={(0, classnames_1.default)(classes_module_scss_1.default["inner-top"], classes_module_scss_1.default["inner"], classes_module_scss_1.default[String(state)])}/>
				<div className={(0, classnames_1.default)(classes_module_scss_1.default["inner-middle"], classes_module_scss_1.default["inner"], classes_module_scss_1.default[String(state)])}/>
				<div className={(0, classnames_1.default)(classes_module_scss_1.default["inner-bottom"], classes_module_scss_1.default["inner"], classes_module_scss_1.default[String(state)])}/>
			</div>
		</div>);
}
exports.default = Burger;
//# sourceMappingURL=index.jsx.map