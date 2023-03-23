"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var classes_module_scss_1 = tslib_1.__importDefault(require("./classes.module.scss"));
function StatusProxy(props) {
    return <div className={classes_module_scss_1.default["StatusViewHeader"]}>
    {props.proxyStatus ? <div className={classes_module_scss_1.default["StatusViewIndicatorGreen"]}/> : <div className={classes_module_scss_1.default["StatusViewIndicatorRed"]}/>}
    <div className={classes_module_scss_1.default["StatusViewTitle"]}>Proxy service for {props.network} is {props.proxyStatus ? 'online' : 'offline'}.</div>
    <div className={classes_module_scss_1.default["StatusViewSubtitle"]}>As of {props.date}.</div>
  </div>;
}
exports.default = StatusProxy;
//# sourceMappingURL=index.jsx.map