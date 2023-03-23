"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var link_1 = tslib_1.__importDefault(require("next/link"));
var react_1 = tslib_1.__importDefault(require("react"));
var image_1 = tslib_1.__importDefault(require("next/image"));
var classes_module_scss_1 = tslib_1.__importDefault(require("./classes.module.scss"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var login_svg_1 = tslib_1.__importDefault(require("@Assets/icons/login.svg"));
var cards_svg_1 = tslib_1.__importDefault(require("@Assets/icons/cards.svg"));
var plus_card_svg_1 = tslib_1.__importDefault(require("@Assets/icons/plus-card.svg"));
var documentation_svg_1 = tslib_1.__importDefault(require("@Assets/icons/documentation.svg"));
var router_1 = require("next/router");
var Drawer = /** @class */ (function (_super) {
    tslib_1.__extends(Drawer, _super);
    function Drawer(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { Links: [{ name: "See my project", link: "/show-project", icon: login_svg_1.default },
                { name: "Create", link: "/new-project", icon: plus_card_svg_1.default },
                { name: "Status", link: "/status", icon: cards_svg_1.default },
                { name: "Documentation", link: "/documentation", icon: documentation_svg_1.default },
            ]
        };
        return _this;
    }
    Drawer.prototype.render = function () {
        var _this = this;
        return <>
            <div className={(0, classnames_1.default)(classes_module_scss_1.default[String(this.props.status)], classes_module_scss_1.default["shadow"])} onClick={this.props.hideCallback}/>
            <div className={(0, classnames_1.default)(classes_module_scss_1.default[String(this.props.status)], classes_module_scss_1.default["root"])}>
                <h1>Menu</h1>
                {this.state.Links.map(function (link, index) { return _this.renderItem(link, index); })}
            </div>
        </>;
    };
    Drawer.prototype.renderItem = function (link, index) {
        return <div key={index} className={(0, classnames_1.default)(classes_module_scss_1.default["item"], classes_module_scss_1.default[this.isCurrentPath(link.link)])}>
            <link_1.default href={link.link} onClick={this.props.hideCallback}>
                <image_1.default alt="icon" src={link.icon}/>
                {link.name}
            </link_1.default>
        </div>;
    };
    Drawer.prototype.isCurrentPath = function (link) {
        if (this.props.router.pathname === link)
            return 'current-path';
        return 'other-path';
    };
    return Drawer;
}(react_1.default.Component));
exports.default = (0, router_1.withRouter)(Drawer);
//# sourceMappingURL=index.jsx.map