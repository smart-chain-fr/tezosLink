"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classes_module_scss_1 = tslib_1.__importDefault(require("./classes.module.scss"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var image_1 = tslib_1.__importDefault(require("next/image"));
var input_error_svg_1 = tslib_1.__importDefault(require("@Assets/icons/input-error.svg"));
var input_success_svg_1 = tslib_1.__importDefault(require("@Assets/icons/input-success.svg"));
var InputField = /** @class */ (function (_super) {
    tslib_1.__extends(InputField, _super);
    function InputField(props) {
        return _super.call(this, props) || this;
    }
    InputField.prototype.render = function () {
        return <>
            <div className={(0, classnames_1.default)(classes_module_scss_1.default["root"])}>
                {this.props.icon && <image_1.default className={classes_module_scss_1.default["icon"]} alt={this.props.icon} src={this.props.icon}/>}
                <input className={(0, classnames_1.default)(classes_module_scss_1.default["component"], classes_module_scss_1.default[this.props.inputStatus])} ref={this.props.inputRef} type={this.props.type} name={this.props.name} placeholder={this.props.placeholder} value={this.props.value} onChange={this.props.onChange} onBlur={this.props.onBlur} autoComplete={this.props.name}/>
                <div className={(0, classnames_1.default)(classes_module_scss_1.default["status"], classes_module_scss_1.default[this.props.inputStatus])}>
                    {this.props.inputStatus === "success" &&
                <image_1.default alt="success icon" src={input_success_svg_1.default}/>}
                    {this.props.inputStatus === "error" &&
                <image_1.default alt="error icon" src={input_error_svg_1.default}/>}
                </div>
            </div>
            {this.props.errorMsg && <div className={classes_module_scss_1.default["errorMsg"]}>{this.props.errorMsg}</div>}
        </>;
    };
    return InputField;
}(react_1.default.Component));
exports.default = InputField;
//# sourceMappingURL=index.jsx.map