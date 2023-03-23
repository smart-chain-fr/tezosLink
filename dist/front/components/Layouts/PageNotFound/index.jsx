"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Button_1 = require("@Components/Elements/Button");
var Base_1 = tslib_1.__importDefault(require("@Components/Layouts/Base"));
var DefaultTemplate_1 = tslib_1.__importDefault(require("@Components/LayoutTemplates/DefaultTemplate"));
var unplugged_svg_1 = tslib_1.__importDefault(require("@Assets/icons/unplugged.svg"));
var image_1 = tslib_1.__importDefault(require("next/image"));
var cards_svg_1 = tslib_1.__importDefault(require("@Assets/icons/cards.svg"));
var link_1 = tslib_1.__importDefault(require("next/link"));
var classes_module_scss_1 = tslib_1.__importDefault(require("./classes.module.scss"));
var PageNotFound = /** @class */ (function (_super) {
    tslib_1.__extends(PageNotFound, _super);
    function PageNotFound() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PageNotFound.prototype.render = function () {
        return (<DefaultTemplate_1.default title={"Project Not Found"}>
                <div className={classes_module_scss_1.default["root"]}>
                    <image_1.default alt="Unplugged" height="50" src={unplugged_svg_1.default}/> Oops
                    <div className={classes_module_scss_1.default["text"]}>There isn't anything here...</div>
                    <div className={classes_module_scss_1.default["home-button"]}>
                        <link_1.default href="/">
                            <Button_1.Button text="Go to Home" icon={cards_svg_1.default}/>
                        </link_1.default>
                    </div>
                </div>
            </DefaultTemplate_1.default>);
    };
    return PageNotFound;
}(Base_1.default));
exports.default = PageNotFound;
//# sourceMappingURL=index.jsx.map