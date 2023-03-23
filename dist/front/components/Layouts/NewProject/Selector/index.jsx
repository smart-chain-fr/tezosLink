"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classes_module_scss_1 = tslib_1.__importDefault(require("./classes.module.scss"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var Selector = /** @class */ (function (_super) {
    tslib_1.__extends(Selector, _super);
    function Selector(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            selectedIndex: _this.props.options.indexOf(_this.props.defaultOption) || 0,
            open: "close"
        };
        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }
    Selector.prototype.render = function () {
        var _this = this;
        return <div className={(0, classnames_1.default)(classes_module_scss_1.default["root"], classes_module_scss_1.default[this.state.open])} onClick={this.handleClick}>
            <select data-menu defaultValue={this.state.selectedIndex}>
                {this.props.options.map(function (option, key) { return (<option key={key}>{option}</option>); })}
            </select>
            <div className={classes_module_scss_1.default["selector"]}>
                <em></em>
                <ul style={{ transform: "translateY(-".concat(this.state.selectedIndex * 36, "px)") }}>
                    {this.props.options.map(function (option) { return (<li key={option}>{option}</li>); })}
                </ul>
            </div>
            <ul style={{ transform: "translateY(-".concat(this.state.selectedIndex * 36, "px)") }}>
                {this.props.options.map(function (option, i) { return (<li key={option} onClick={function () { return _this.handleSelect(i); }}>
                        {option}
                    </li>); })}
            </ul>
        </div>;
    };
    Selector.prototype.handleClick = function () {
        this.state.open === "open" ? this.setState({ open: "close" }) : this.setState({ open: "open" });
    };
    Selector.prototype.handleSelect = function (index) {
        this.props.selectCallback(this.props.options[index]);
        this.setState({ selectedIndex: index });
    };
    return Selector;
}(react_1.default.Component));
exports.default = Selector;
//# sourceMappingURL=index.jsx.map