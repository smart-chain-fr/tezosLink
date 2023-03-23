"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Button_1 = require("@Components/Elements/Button");
var Base_1 = tslib_1.__importDefault(require("@Components/Layouts/Base"));
var DefaultTemplate_1 = tslib_1.__importDefault(require("@Components/LayoutTemplates/DefaultTemplate"));
var classes_module_scss_1 = tslib_1.__importDefault(require("./classes.module.scss"));
var LastRequests_1 = tslib_1.__importDefault(require("./LastRequests"));
var ProjectName_1 = tslib_1.__importDefault(require("./ProjectName"));
var ProjectToken_1 = tslib_1.__importDefault(require("./ProjectToken"));
var RequestsByDay_1 = tslib_1.__importDefault(require("./RequestsByDay"));
var RpcUsage_1 = tslib_1.__importDefault(require("./RpcUsage"));
var ModalCreatedProject_1 = tslib_1.__importDefault(require("./ModalCreatedProject"));
var Dashboard = /** @class */ (function (_super) {
    tslib_1.__extends(Dashboard, _super);
    function Dashboard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            showModal: _this.props.firstTime
        };
        _this.closeModal = _this.closeModal.bind(_this);
        return _this;
    }
    Dashboard.prototype.render = function () {
        return (<DefaultTemplate_1.default title={"Dashboard"}>
                <div className={classes_module_scss_1.default["root"]}>
                    <div className={classes_module_scss_1.default["top"]}>
                        <div className={classes_module_scss_1.default["left"]}>
                            <div className={classes_module_scss_1.default["header"]}>
                                <div className={classes_module_scss_1.default["title"]}>
                                    <h1>Dashboard</h1>
                                </div>
                                <Button_1.Button text={this.props.network} color="secondary"/>
                            </div>
                            <RequestsByDay_1.default requestsByDays={this.props.requestByDays}/>
                        </div>
                        <div className={classes_module_scss_1.default["right"]}>
                            <ProjectName_1.default name={this.props.title}/>
                            <ProjectToken_1.default token={this.props.uuid}/>
                        </div>
                    </div>
                    <div className={classes_module_scss_1.default["bottom"]}>
                        <RpcUsage_1.default rpcTotalCount={this.props.rpcTotalCount} rpcUsage={this.props.rpcUsage}/>
                        <LastRequests_1.default lastRequests={this.props.lastRequests}/>
                    </div>
                </div>
                {this.state.showModal && <ModalCreatedProject_1.default uuid={this.props.uuid} closeModal={this.closeModal}/>}
            </DefaultTemplate_1.default>);
    };
    Dashboard.prototype.closeModal = function () {
        this.setState({ showModal: false });
    };
    return Dashboard;
}(Base_1.default));
exports.default = Dashboard;
//# sourceMappingURL=index.jsx.map