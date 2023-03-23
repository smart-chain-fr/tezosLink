"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var Header_1 = tslib_1.__importDefault(require("@Components/Materials/Header"));
var classes_module_scss_1 = tslib_1.__importDefault(require("./classes.module.scss"));
var DefaultTemplate = /** @class */ (function (_super) {
    tslib_1.__extends(DefaultTemplate, _super);
    function DefaultTemplate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DefaultTemplate.prototype.render = function () {
        return (<>
				<Header_1.default />
				<div className={classes_module_scss_1.default["root"]}>
					<div className={classes_module_scss_1.default["content"]}>{this.props.children}</div>
				</div>
			</>);
    };
    DefaultTemplate.prototype.componentDidMount = function () {
        window.document.title = this.props.title;
        if (this.props.scrollTop !== null) {
            window.scrollTo(0, this.props.scrollTop);
        }
    };
    DefaultTemplate.defaultProps = {
        scrollTop: 0,
    };
    return DefaultTemplate;
}(react_1.default.Component));
exports.default = DefaultTemplate;
//# sourceMappingURL=index.jsx.map