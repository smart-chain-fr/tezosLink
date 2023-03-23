"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_2 = require("react");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var classes_module_scss_1 = tslib_1.__importDefault(require("./classes.module.scss"));
var image_1 = tslib_1.__importDefault(require("next/image"));
var PRIMARY = 'primary';
function Button(props) {
    var _a = (0, react_2.useState)(false), clicked = _a[0], setClicked = _a[1];
    var clickCallback = function () {
        setClicked(true);
        setTimeout(function () { return setClicked(false); }, 1000);
    };
    var buttonClasses = clicked ? 'clicked' : '';
    return (<div className={(0, classnames_1.default)(classes_module_scss_1.default["root"], classes_module_scss_1.default[props.color], classes_module_scss_1.default[buttonClasses])} onClick={function () {
            clickCallback();
            props.onClick && props.onClick();
        }}>
      <div className={classes_module_scss_1.default["text"]}>{props.text}</div>
      {props.icon && <image_1.default className={(0, classnames_1.default)(classes_module_scss_1.default["icon"], classes_module_scss_1.default[props.color])} src={props.icon} alt="icon"/>}
    </div>);
}
exports.Button = Button;
Button.defaultProps = {
    icon: undefined,
    color: PRIMARY,
};
//# sourceMappingURL=index.jsx.map