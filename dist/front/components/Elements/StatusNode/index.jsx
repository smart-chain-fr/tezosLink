"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var classes_module_scss_1 = tslib_1.__importDefault(require("./classes.module.scss"));
function StatusNode(props) {
    return <div className={classes_module_scss_1.default["StatusViewHeader"]}>
  {(props.nodeArchiveStatus && props.nodeRollingStatus) ? <div className={classes_module_scss_1.default["StatusViewIndicatorGreen"]}/> : <div className={classes_module_scss_1.default["StatusViewIndicatorRed"]}/>}
    <div className={classes_module_scss_1.default["StatusViewTitle"]}>Nodes RPC services for {props.network} are {(props.nodeArchiveStatus && props.nodeRollingStatus) ? 'online' : 'offline'}.</div>
    <div className={classes_module_scss_1.default["StatusViewSubtitle"]}>{props.nodeArchiveStatus ? <div className={classes_module_scss_1.default["StatusViewIndicatorGreenLittle"]}/> : <div className={classes_module_scss_1.default["StatusViewIndicatorRedLittle"]}/>} Archive nodes are {props.nodeArchiveStatus ? 'online' : 'offline'}.</div>
    <div className={classes_module_scss_1.default["StatusViewSubtitle"]}>{props.nodeRollingStatus ? <div className={classes_module_scss_1.default["StatusViewIndicatorGreenLittle"]}/> : <div className={classes_module_scss_1.default["StatusViewIndicatorRedLittle"]}/>} Rolling nodes are {props.nodeRollingStatus ? 'online' : 'offline'}.</div>
  </div>;
}
exports.default = StatusNode;
//# sourceMappingURL=index.jsx.map