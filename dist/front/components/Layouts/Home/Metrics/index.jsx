"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var classes_module_scss_1 = tslib_1.__importDefault(require("./classes.module.scss"));
var metrics_png_1 = tslib_1.__importDefault(require("@Assets/images/metrics.png"));
var image_1 = tslib_1.__importDefault(require("next/image"));
function Metrics() {
    return <div className={classes_module_scss_1.default["root"]}>
    <h1>Insights from your app</h1>
    <h3>The Tezos Link dashboard allows you to get valuable statistics from your utilization of the APIs</h3>
    <image_1.default alt="metrics" src={metrics_png_1.default} width={1139}/>
  </div>;
}
exports.default = Metrics;
//# sourceMappingURL=index.jsx.map