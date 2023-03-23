"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var classes_module_scss_1 = tslib_1.__importDefault(require("./classes.module.scss"));
var react_1 = tslib_1.__importDefault(require("react"));
var Card_1 = tslib_1.__importDefault(require("@Components/Elements/Card"));
var LastRequests = /** @class */ (function (_super) {
    tslib_1.__extends(LastRequests, _super);
    function LastRequests(props) {
        var _this = _super.call(this, props) || this;
        _this.renderContent = _this.renderContent.bind(_this);
        return _this;
    }
    LastRequests.prototype.render = function () {
        return <div className={classes_module_scss_1.default["root"]}>
                <Card_1.default title="Last Request" content={<this.renderContent />} data={this.props.lastRequests && this.props.lastRequests.length > 0}/>
            </div>;
    };
    LastRequests.prototype.showRequests = function (request, isFirst) {
        var stringLength = isFirst ? 40 : 60;
        if (request.length > stringLength) {
            return request.substring(0, stringLength) + '...';
        }
        return request;
    };
    LastRequests.prototype.renderContent = function () {
        var _this = this;
        return (<>
            <div className={classes_module_scss_1.default["list"]}>
                {this.props.lastRequests.slice(0, 5).map(function (request, index) {
                return (<div className={classes_module_scss_1.default["item"]} key={index}>
                            <div className={classes_module_scss_1.default["tooltip"]} data-tooltip={request}>
                                {_this.showRequests(request, index === 0)}
                            </div>
                        </div>);
            })}
            </div>
        </>);
    };
    return LastRequests;
}(react_1.default.Component));
exports.default = LastRequests;
//# sourceMappingURL=index.jsx.map