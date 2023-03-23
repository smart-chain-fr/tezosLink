"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Base_1 = tslib_1.__importDefault(require("@Components/Layouts/Base"));
var DefaultTemplate_1 = tslib_1.__importDefault(require("@Components/LayoutTemplates/DefaultTemplate"));
var classes_module_scss_1 = tslib_1.__importDefault(require("./classes.module.scss"));
var Selector_1 = tslib_1.__importDefault(require("./Selector"));
var router_1 = require("next/router");
var user_svg_1 = tslib_1.__importDefault(require("@Assets/icons/user.svg"));
var InputField_1 = tslib_1.__importDefault(require("../../Elements/InputField"));
var Button_1 = require("@Components/Elements/Button");
var sign_up_svg_1 = tslib_1.__importDefault(require("@Assets/icons/sign-up.svg"));
var Project_1 = tslib_1.__importDefault(require("src/front/Api/Project"));
var NewProject = /** @class */ (function (_super) {
    tslib_1.__extends(NewProject, _super);
    function NewProject(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            network: 'MAINNET',
            name: '',
            inputStatus: 'neutral',
            errorMsg: ''
        };
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.handleChangeInput = _this.handleChangeInput.bind(_this);
        _this.handleBlur = _this.handleBlur.bind(_this);
        _this.checkName = _this.checkName.bind(_this);
        _this.handleChangeSelector = _this.handleChangeSelector.bind(_this);
        return _this;
    }
    NewProject.prototype.render = function () {
        return (<DefaultTemplate_1.default title={"Create Project"}>
                <div className={classes_module_scss_1.default["root"]}>
                    <h1>New Project</h1>
                    <div>
                        <Selector_1.default options={['MAINNET', 'TESTNET']} defaultOption={this.state.network} selectCallback={this.handleChangeSelector}/>
                        <InputField_1.default inputStatus={this.state.inputStatus} errorMsg={this.state.errorMsg} onChange={this.handleChangeInput} onBlur={this.handleBlur} type="text" icon={user_svg_1.default} name="title" placeholder="Project title"/>
                        <Button_1.Button text="Create project" icon={sign_up_svg_1.default} onClick={this.handleSubmit}/>
                    </div>
                </div>
            </DefaultTemplate_1.default>);
    };
    NewProject.prototype.handleChangeSelector = function (option) {
        if (option !== undefined)
            this.setState({ network: option });
    };
    NewProject.prototype.handleBlur = function () {
        this.checkName(this.state.name);
    };
    NewProject.prototype.handleChangeInput = function (event) {
        this.setState({ name: event.target.value });
        if (this.state.inputStatus !== 'neutral') {
            this.checkName(event.target.value);
        }
    };
    NewProject.prototype.handleSubmit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uuid;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.checkName(this.state.name)) return [3 /*break*/, 2];
                        return [4 /*yield*/, Project_1.default.getInstance().postProject({ title: this.state.name, network: this.state.network })];
                    case 1:
                        uuid = (_a.sent()).uuid;
                        this.props.router.push("/dashboard/" + uuid + "?ft=true");
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    NewProject.prototype.checkName = function (name) {
        if (name === "") {
            this.setState({ errorMsg: "Project ID is required", inputStatus: 'error' });
        }
        else if (name.length < 3) {
            this.setState({ errorMsg: "Must have at least 3 characters", inputStatus: 'error' });
        }
        else {
            this.setState({ errorMsg: "", inputStatus: 'success' });
            return true;
        }
        return false;
    };
    return NewProject;
}(Base_1.default));
exports.default = (0, router_1.withRouter)(NewProject);
//# sourceMappingURL=index.jsx.map