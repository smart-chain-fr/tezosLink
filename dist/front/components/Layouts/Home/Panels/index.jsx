"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var link_1 = tslib_1.__importDefault(require("next/link"));
var classes_module_scss_1 = tslib_1.__importDefault(require("./classes.module.scss"));
var books_svg_1 = tslib_1.__importDefault(require("@Assets/icons/books.svg"));
var arrow_black_svg_1 = tslib_1.__importDefault(require("@Assets/icons/arrow-black.svg"));
var arrow_white_svg_1 = tslib_1.__importDefault(require("@Assets/icons/arrow-white.svg"));
var support_svg_1 = tslib_1.__importDefault(require("@Assets/icons/support.svg"));
var image_1 = tslib_1.__importDefault(require("next/image"));
function Panels() {
    return <div className={classes_module_scss_1.default["root"]}>
    <link_1.default href="/documentation">
      <div className={classes_module_scss_1.default["panel1"]}>
        <image_1.default className="logo" alt="books" src={books_svg_1.default}/>
        <div>
          <h3>DOCUMENTATION</h3>
          <p>Learn how to use Tezos Link</p>
        </div>
        <image_1.default className="arrow" alt="arrow" src={arrow_black_svg_1.default}/>
      </div>
    </link_1.default>
    <a href="mailto:beta@octo.com" target="_blank">
      <div className={classes_module_scss_1.default["panel2"]}>
        <image_1.default className="logo" alt="books" src={support_svg_1.default}/>
        <div>
          <h3>SUPPORT</h3>
          <p>Ask us your questions</p>
        </div>
        <image_1.default className="arrow" alt="arrow" src={arrow_white_svg_1.default}/>
      </div>
    </a>
  </div>;
}
exports.default = Panels;
//# sourceMappingURL=index.jsx.map