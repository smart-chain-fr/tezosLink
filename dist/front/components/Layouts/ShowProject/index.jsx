"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Base_1 = tslib_1.__importDefault(require("@Components/Layouts/Base"));
var DefaultTemplate_1 = tslib_1.__importDefault(require("@Components/LayoutTemplates/DefaultTemplate"));
var classes_module_scss_1 = tslib_1.__importDefault(require("./classes.module.scss"));
var InputField_1 = tslib_1.__importDefault(require("../../Elements/InputField"));
var Button_1 = require("@Components/Elements/Button");
var login_svg_1 = tslib_1.__importDefault(require("@Assets/icons/login.svg"));
var router_1 = require("next/router");
var SignInProject = /** @class */ (function (_super) {
    tslib_1.__extends(SignInProject, _super);
    function SignInProject(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            projectUuid: "",
            errorMsg: "",
            inputStatus: 'neutral'
        };
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.handleChangeInput = _this.handleChangeInput.bind(_this);
        _this.checkUuid = _this.checkUuid.bind(_this);
        _this.handleBlur = _this.handleBlur.bind(_this);
        return _this;
    }
    SignInProject.prototype.render = function () {
        return (<DefaultTemplate_1.default title={"See My Project"}>
                <div className={classes_module_scss_1.default["root"]}>
                    <h1>See my project</h1>
                    <div>
                        <InputField_1.default errorMsg={this.state.errorMsg} inputStatus={this.state.inputStatus} onChange={this.handleChangeInput} onBlur={this.handleBlur} type="text" icon={login_svg_1.default} name="uuid" placeholder="e4efba4d-47e6-42a5-905e-589d3f673853"/>
                        <Button_1.Button text="Access to my project" icon={login_svg_1.default} onClick={this.handleSubmit}/>
                    </div>
                </div>
            </DefaultTemplate_1.default>);
    };
    SignInProject.prototype.handleChangeInput = function (event) {
        this.setState({ projectUuid: event.target.value });
        if (this.state.inputStatus !== 'neutral') {
            this.checkUuid(event.target.value);
        }
    };
    SignInProject.prototype.handleSubmit = function () {
        if (this.checkUuid(this.state.projectUuid)) {
            this.props.router.push('/dashboard/' + this.state.projectUuid + "?ft=false");
        }
    };
    SignInProject.prototype.handleBlur = function () {
        this.checkUuid(this.state.projectUuid);
    };
    SignInProject.prototype.checkUuid = function (uuid) {
        if (uuid === "") {
            this.setState({ errorMsg: "Project ID is required", inputStatus: 'error' });
        }
        else if (uuid.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')) {
            this.setState({ errorMsg: "", inputStatus: 'success' });
            return true;
        }
        else {
            this.setState({ errorMsg: "Must be a valid UUID", inputStatus: 'error' });
        }
        return false;
    };
    return SignInProject;
}(Base_1.default));
exports.default = (0, router_1.withRouter)(SignInProject);
//# sourceMappingURL=index.jsx.map