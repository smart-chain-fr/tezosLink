"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Base_1 = tslib_1.__importDefault(require("@Components/Layouts/Base"));
var DefaultTemplate_1 = tslib_1.__importDefault(require("@Components/LayoutTemplates/DefaultTemplate"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var classes_module_scss_1 = tslib_1.__importDefault(require("./classes.module.scss"));
var Documentation = /** @class */ (function (_super) {
    tslib_1.__extends(Documentation, _super);
    function Documentation(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            menu: '',
            content: ''
        };
        return _this;
    }
    Documentation.prototype.render = function () {
        return (<DefaultTemplate_1.default title={"Documentation"}>
                <div className={classes_module_scss_1.default["root"]}>
                    <div className={(0, classnames_1.default)(classes_module_scss_1.default["left-side"], classes_module_scss_1.default["menu"])}>
                        <h2>Getting started</h2>
                        <div dangerouslySetInnerHTML={{ __html: this.state.menu }}/>
                    </div>
                    <div className={(0, classnames_1.default)(classes_module_scss_1.default["right-side"], classes_module_scss_1.default["content"])}>
                        <div dangerouslySetInnerHTML={{ __html: this.state.content }}/>
                    </div>
                </div>
            </DefaultTemplate_1.default>);
    };
    return Documentation;
}(Base_1.default));
exports.default = Documentation;
//# sourceMappingURL=index.jsx.map