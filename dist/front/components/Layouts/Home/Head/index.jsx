"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var link_1 = tslib_1.__importDefault(require("next/link"));
var image_1 = tslib_1.__importDefault(require("next/image"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var torus_cables_svg_1 = tslib_1.__importDefault(require("@Assets/images/torus-cables.svg"));
var torus_bg_svg_1 = tslib_1.__importDefault(require("@Assets/images/torus-bg.svg"));
var torus_fg_svg_1 = tslib_1.__importDefault(require("@Assets/images/torus-fg.svg"));
var particle_svg_1 = tslib_1.__importDefault(require("@Assets/images/particle.svg"));
var torus_logo_svg_1 = tslib_1.__importDefault(require("@Assets/images/torus-logo.svg"));
var plus_card_svg_1 = tslib_1.__importDefault(require("@Assets/icons/plus-card.svg"));
var classes_module_scss_1 = tslib_1.__importDefault(require("./classes.module.scss"));
var Button_1 = require("@Components/Elements/Button");
function Head() {
    return <div className={classes_module_scss_1.default["root"]}>
    <div className={classes_module_scss_1.default["left-panel"]}>
      <div className={classes_module_scss_1.default["left-content"]}>
        <h1>Your gateway to the tezos network</h1>
        <h3>Free and scalable API access to the Tezos network<br />and usage analytics for your projects</h3>
        <div className={classes_module_scss_1.default["button"]}>
          <link_1.default href="/new-project">
            <Button_1.Button text="NEW PROJECT" icon={plus_card_svg_1.default}/>
          </link_1.default>
        </div>
      </div>
    </div>
    <div className={classes_module_scss_1.default["right-panel"]}>
      <image_1.default alt="torus" className={classes_module_scss_1.default["torus-cables"]} src={torus_cables_svg_1.default}/>
      <image_1.default alt="torus" className={classes_module_scss_1.default["torus-bg"]} src={torus_bg_svg_1.default}/>
      <image_1.default alt="meteor" className={(0, classnames_1.default)(classes_module_scss_1.default["meteor"], classes_module_scss_1.default["meteor1"])} src={particle_svg_1.default}/>
      <image_1.default alt="meteor" className={(0, classnames_1.default)(classes_module_scss_1.default["meteor"], classes_module_scss_1.default["meteor2"])} src={particle_svg_1.default}/>
      <image_1.default alt="meteor" className={(0, classnames_1.default)(classes_module_scss_1.default["meteor"], classes_module_scss_1.default["meteor3"])} src={particle_svg_1.default}/>
      <image_1.default alt="meteor" className={(0, classnames_1.default)(classes_module_scss_1.default["meteor"], classes_module_scss_1.default["meteor4"])} src={particle_svg_1.default}/>
      <image_1.default alt="torus" className={classes_module_scss_1.default["torus-fg"]} src={torus_fg_svg_1.default}/>
      <image_1.default alt="torus" className={classes_module_scss_1.default["torus-logo"]} src={torus_logo_svg_1.default}/>
    </div>
  </div>;
}
exports.default = Head;
//# sourceMappingURL=index.jsx.map