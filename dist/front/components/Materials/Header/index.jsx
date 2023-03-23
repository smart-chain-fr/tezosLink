"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var link_1 = tslib_1.__importDefault(require("next/link"));
var react_1 = tslib_1.__importDefault(require("react"));
var image_1 = tslib_1.__importDefault(require("next/image"));
var link_logo_svg_1 = tslib_1.__importDefault(require("@Assets/link_logo.svg"));
var logo_svg_1 = tslib_1.__importDefault(require("@Assets/logo.svg"));
var classes_module_scss_1 = tslib_1.__importDefault(require("./classes.module.scss"));
var Button_1 = require("@Components/Elements/Button");
var Burger_1 = tslib_1.__importDefault(require("@Components/Elements/Burger"));
var Drawer_1 = tslib_1.__importDefault(require("@Components/Elements/Drawer"));
var login_svg_1 = tslib_1.__importDefault(require("@Assets/icons/login.svg"));
var plus_card_svg_1 = tslib_1.__importDefault(require("@Assets/icons/plus-card.svg"));
var Header = /** @class */ (function (_super) {
    tslib_1.__extends(Header, _super);
    function Header(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            status: false,
        };
        _this.switchStatus = _this.switchStatus.bind(_this);
        return _this;
    }
    Header.prototype.render = function () {
        return (<>
      <Drawer_1.default status={this.state.status} hideCallback={this.switchStatus}/>
      <div className={classes_module_scss_1.default["root"]}>
        <Burger_1.default state={this.state.status} callback={this.switchStatus}/>
        <div className={classes_module_scss_1.default["menu"]}>
          <link_1.default href="/">
            <image_1.default alt="TEZOS LINK" src={link_logo_svg_1.default}/>
          </link_1.default>
        </div>
        <div className={classes_module_scss_1.default["triangle-under-logo"]}></div>
        <div className={classes_module_scss_1.default["logo"]}>
          <link_1.default href="/">
            <image_1.default alt="entire stack" src={logo_svg_1.default}/>
          </link_1.default>
        </div>
        <div className={classes_module_scss_1.default["button"]}>
          <link_1.default href="/show-project">
            <Button_1.Button color="transparent" text="MY PROJECT" icon={login_svg_1.default}/>
          </link_1.default>
          <link_1.default href="/new-project">
            <Button_1.Button text="CREATE" icon={plus_card_svg_1.default}/>
          </link_1.default>
        </div>
      </div>
      </>);
    };
    Header.prototype.switchStatus = function () {
        this.state.status ? this.setState({ status: false }) : this.setState({ status: true });
    };
    return Header;
}(react_1.default.Component));
exports.default = Header;
//# sourceMappingURL=index.jsx.map