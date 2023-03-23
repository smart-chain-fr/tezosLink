"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@Front/index.scss");
var DefaultLayout_1 = require("@Components/LayoutTemplates/DefaultLayout");
var MyApp = (function (_a) {
    var _b;
    var Component = _a.Component, pageProps = _a.pageProps;
    var getLayout = (_b = Component.getLayout) !== null && _b !== void 0 ? _b : (function (page) { return <DefaultLayout_1.DefaultLayout children={page}></DefaultLayout_1.DefaultLayout>; });
    return getLayout(<Component {...pageProps}/>);
});
exports.default = MyApp;
//# sourceMappingURL=_app.jsx.map