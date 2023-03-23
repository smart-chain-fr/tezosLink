"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classes_module_scss_1 = tslib_1.__importDefault(require("./classes.module.scss"));
var logo_svg_1 = tslib_1.__importDefault(require("@Assets/images/logo.svg"));
var image_1 = tslib_1.__importDefault(require("next/image"));
var Footer = /** @class */ (function (_super) {
    tslib_1.__extends(Footer, _super);
    function Footer(props) {
        return _super.call(this, props) || this;
    }
    Footer.prototype.render = function () {
        return (<div className={classes_module_scss_1.default["root"]}>
                <div className={classes_module_scss_1.default["grid"]}>
                    <image_1.default alt="logo" src={logo_svg_1.default}/>
                    <div>
                        <p>About Tezos Link</p>
                        <a href="https://github.com/octo-technology/tezos-link" target="_blank">
                            Github
                        </a>
                        <a href="mailto:beta@octo.com" target="_blank">
                            Support
                        </a>
                        <a href="https://www.reddit.com/r/tezos/" target="_blank">
                            Reddit
                        </a>
                    </div>
                    <div>
                        <p>About OCTO</p>
                        <a href="https://octo.com" target="_blank">
                            Homepage
                        </a>
                        <a href="https://blog.octo.com" target="_blank">
                            Our blog
                        </a>
                    </div>
                    <div>
                        <p>About the devs</p>
                        <a href="https://www.linkedin.com/in/aymeric-bethencourt-96665046/" target="_blank">
                            Aymeric Bethencourt
                        </a>
                        <a href="https://www.linkedin.com/in/adrien-boulay-2679aa113/" target="_blank">
                            Adrien Boulay
                        </a>
                        <a href="https://www.linkedin.com/in/loup-theron-b1785397/" target="_blank">
                            Loup Theron
                        </a>
                    </div>
                </div>
            </div>);
    };
    return Footer;
}(react_1.default.Component));
exports.default = Footer;
//# sourceMappingURL=index.jsx.map