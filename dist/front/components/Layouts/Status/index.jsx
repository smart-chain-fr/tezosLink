"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var StatusNode_1 = tslib_1.__importDefault(require("../../Elements/StatusNode"));
var StatusProxy_1 = tslib_1.__importDefault(require("../../Elements/StatusProxy"));
var Base_1 = tslib_1.__importDefault(require("@Components/Layouts/Base"));
var DefaultTemplate_1 = tslib_1.__importDefault(require("@Components/LayoutTemplates/DefaultTemplate"));
var classes_module_scss_1 = tslib_1.__importDefault(require("./classes.module.scss"));
var StatusLayout = /** @class */ (function (_super) {
    tslib_1.__extends(StatusLayout, _super);
    function StatusLayout(props) {
        return _super.call(this, props) || this;
    }
    StatusLayout.prototype.render = function () {
        return (<DefaultTemplate_1.default title={"Status"}>
				<div className={classes_module_scss_1.default["root"]}>
					<div className={classes_module_scss_1.default["content"]}>
						<h2>Services status</h2>
						<StatusProxy_1.default proxyStatus={this.props.MainnetProxyStatus} network={"Mainnet"} date={this.props.Date}/>
						<StatusNode_1.default nodeArchiveStatus={this.props.MainnetArchiveStatus} nodeRollingStatus={this.props.MainnetRollingStatus} network={"Mainnet"}/>
						<StatusProxy_1.default proxyStatus={this.props.TestnetProxyStatus} network={this.props.TestnetName} date={this.props.Date}/>
						<StatusNode_1.default nodeArchiveStatus={this.props.TestnetArchiveStatus} nodeRollingStatus={this.props.TestnetRollingStatus} network={this.props.TestnetName}/>
					</div>
				</div>
			</DefaultTemplate_1.default>);
    };
    return StatusLayout;
}(Base_1.default));
exports.default = StatusLayout;
//# sourceMappingURL=index.jsx.map