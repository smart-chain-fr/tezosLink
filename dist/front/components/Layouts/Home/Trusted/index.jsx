"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var classes_module_scss_1 = tslib_1.__importDefault(require("./classes.module.scss"));
var Button_1 = require("@Components/Elements/Button");
var accenture_svg_1 = tslib_1.__importDefault(require("@Assets/images/accenture.svg"));
var nomadic_svg_1 = tslib_1.__importDefault(require("@Assets/images/nomadic.svg"));
var plus_card_svg_1 = tslib_1.__importDefault(require("@Assets/icons/plus-card.svg"));
var tq_svg_1 = tslib_1.__importDefault(require("@Assets/images/tq.svg"));
var image_1 = tslib_1.__importDefault(require("next/image"));
function Trusted() {
    return <div className={classes_module_scss_1.default["root"]}>
    <h1>Trusted by hundreds of developers</h1>
    <h3>
      Used worldwide by dozens of production applications without having to install or manage a single node.
    </h3>
    <div className={classes_module_scss_1.default["grid"]}>
      <image_1.default alt="accenture" src={accenture_svg_1.default}/>
      <image_1.default alt="nomadic" src={nomadic_svg_1.default}/>
      <image_1.default alt="tq" src={tq_svg_1.default}/>
    </div>
    <div className={classes_module_scss_1.default["button"]}>
      <a href="mailto:beta@octo.com" target="_blank">
        <Button_1.Button text="CONTACT US FOR ENTERPRISE INFOS" icon={plus_card_svg_1.default}/>
      </a>
    </div>
  </div>;
}
exports.default = Trusted;
//# sourceMappingURL=index.jsx.map