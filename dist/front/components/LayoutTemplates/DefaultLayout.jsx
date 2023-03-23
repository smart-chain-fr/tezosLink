"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultLayout = void 0;
var tslib_1 = require("tslib");
var head_1 = tslib_1.__importDefault(require("next/head"));
var DefaultLayout = function (_a) {
    var children = _a.children;
    return (<>
      <head_1.default>
        <title>Tezos Link</title>
        <link rel="shortcut icon" href="/favicon-16x16.png"/>
      </head_1.default>
      <main>{children}</main>
    </>);
};
exports.DefaultLayout = DefaultLayout;
//# sourceMappingURL=DefaultLayout.jsx.map