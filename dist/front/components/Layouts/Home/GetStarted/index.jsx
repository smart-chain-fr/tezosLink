"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var link_1 = tslib_1.__importDefault(require("next/link"));
var classes_module_scss_1 = tslib_1.__importDefault(require("./classes.module.scss"));
var mini_torus_png_1 = tslib_1.__importDefault(require("@Assets/images/mini-torus.png"));
var Button_1 = require("@Components/Elements/Button");
var plus_card_svg_1 = tslib_1.__importDefault(require("@Assets/icons/plus-card.svg"));
var image_1 = tslib_1.__importDefault(require("next/image"));
function GetStarted() {
    return <div className={classes_module_scss_1.default["root"]}>
        <h1>Connect to TEZOS now</h1>
        <div className={classes_module_scss_1.default["button"]}>
            <link_1.default href="/new-project">
                <Button_1.Button text="GET STARTED" icon={plus_card_svg_1.default}/>
            </link_1.default>
        </div>
        <image_1.default className={classes_module_scss_1.default["left"]} alt="torus" src={mini_torus_png_1.default} height={300}/>
        <image_1.default className={classes_module_scss_1.default["right"]} alt="torus" src={mini_torus_png_1.default} height={300}/>
    </div>;
}
exports.default = GetStarted;
//# sourceMappingURL=index.jsx.map