"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var classes_module_scss_1 = tslib_1.__importDefault(require("./classes.module.scss"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var image_1 = tslib_1.__importDefault(require("next/image"));
function BuiltArg(props) {
    return <div className={(0, classnames_1.default)(classes_module_scss_1.default["root"], props.side === 'left' ? classes_module_scss_1.default["reverse"] : '')}>
    <image_1.default className={classes_module_scss_1.default["img"]} alt={props.image_alt} src={props.image_src}/>
    <div>
      <div className={classes_module_scss_1.default["title"]}>{props.title}</div>
      <div className={classes_module_scss_1.default["description"]}>{props.description}</div>
    </div>
  </div>;
}
exports.default = BuiltArg;
//# sourceMappingURL=index.jsx.map