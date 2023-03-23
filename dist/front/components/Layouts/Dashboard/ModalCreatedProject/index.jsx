"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var classes_module_scss_1 = tslib_1.__importDefault(require("./classes.module.scss"));
var Button_1 = require("@Components/Elements/Button");
var Modal_1 = tslib_1.__importDefault(require("@Components/Elements/Modal"));
var TokenCopy_1 = tslib_1.__importDefault(require("../TokenCopy"));
var Confettis_1 = tslib_1.__importDefault(require("../Confettis"));
var react_1 = tslib_1.__importDefault(require("react"));
var ModalCreatedProject = /** @class */ (function (_super) {
    tslib_1.__extends(ModalCreatedProject, _super);
    function ModalCreatedProject(props) {
        var _this = _super.call(this, props) || this;
        _this.renderModal = _this.renderModal.bind(_this);
        return _this;
    }
    ModalCreatedProject.prototype.render = function () {
        return <Modal_1.default title="Well Down!" children={<this.renderModal />}/>;
    };
    ModalCreatedProject.prototype.renderModal = function () {
        return <>
                <Confettis_1.default />
                <>
                    <h3>Usage</h3>
                    <p>
                        We've generated a Project ID for you, this identifier is both your <b>login to this dashboard</b> and
                        <b> your credential to access the request URL.</b>
                    </p>
                    <div className={classes_module_scss_1.default["code"]}>{'curl https://<network>.tezoslink.net/v1/YOUR-PROJECT-ID'}</div>
                    <h3>Your Project ID</h3>
                    <b>Make sure to save the following Project ID:</b>
                    <TokenCopy_1.default token={this.props.uuid}/>
                    <Button_1.Button color={'secondary'} onClick={this.props.closeModal} text="Got it!"/>
                </>
            </>;
    };
    return ModalCreatedProject;
}(react_1.default.Component));
exports.default = ModalCreatedProject;
//# sourceMappingURL=index.jsx.map