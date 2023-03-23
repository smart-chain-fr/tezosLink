"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var classes_module_scss_1 = tslib_1.__importDefault(require("./classes.module.scss"));
var BuiltArg_1 = tslib_1.__importDefault(require("../BuiltArg"));
var arg1_svg_1 = tslib_1.__importDefault(require("@Assets/images/arg1.svg"));
var arg2_svg_1 = tslib_1.__importDefault(require("@Assets/images/arg2.svg"));
var arg3_svg_1 = tslib_1.__importDefault(require("@Assets/images/arg3.svg"));
var architecture_png_1 = tslib_1.__importDefault(require("@Assets/images/architecture.png"));
function Built() {
    var args = [
        {
            title: "BUILT FOR DEVELOPERS",
            description: "Connect your app immediately with our instant access APIs. We support RPC over HTTPS interfaces, providing high speed connections to the Tezos network.",
            image_src: arg1_svg_1.default,
            image_alt: "tezos",
            side: "left"
        },
        {
            title: "BUILT FOR EASE",
            description: "Start using Tezos Link with a single URL. Our 24/7 team of experts is ready to handle all network changes and upgrades so you can focus on building your applications.",
            image_src: arg2_svg_1.default,
            image_alt: "tezos",
            side: "right"
        },
        {
            title: "BUILT FOR BUILDERS",
            description: "We believe in a future powered by decentralized networks and protocols. We provide world-class infrastructure for developers so you can spend your time building and creating.",
            image_src: arg3_svg_1.default,
            image_alt: "tezos",
            side: "left"
        },
        {
            title: "SCALABLE",
            description: <p>Our architecture supports the workload required by your project, by scaling up Tezos nodes when we see an increase of requests. The infrastructure is open-sourced in our<a href="https://github.com/octo-technology/tezos-link" target="_blank"> Github project</a></p>,
            image_src: architecture_png_1.default,
            image_alt: "tezos",
            side: "right"
        },
    ];
    return <div className={classes_module_scss_1.default["root"]}>
    <div className={classes_module_scss_1.default["content"]}>
      <h1>Develop now with our Tezos APIs</h1>
      <h3>
        Tezos Link's infrastructure will ensure your decentralized application scales to meet your user demand.
      </h3>
      {args.map(function (arg, key) {
            return <BuiltArg_1.default key={key} {...arg}/>;
        })}
    </div>
  </div>;
}
exports.default = Built;
//# sourceMappingURL=index.jsx.map