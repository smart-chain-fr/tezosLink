"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var classes_module_scss_1 = tslib_1.__importDefault(require("./classes.module.scss"));
var react_1 = tslib_1.__importDefault(require("react"));
// Dynamic import mandatory to avoid the error : window undefined
// https://stackoverflow.com/questions/68596778/next-js-window-is-not-defined
var dynamic_1 = tslib_1.__importDefault(require("next/dynamic"));
var Card_1 = tslib_1.__importDefault(require("@Components/Elements/Card"));
var Chart = (0, dynamic_1.default)(function () { return Promise.resolve().then(function () { return tslib_1.__importStar(require('react-apexcharts')); }); }, { ssr: false });
var RpcUsage = /** @class */ (function (_super) {
    tslib_1.__extends(RpcUsage, _super);
    function RpcUsage(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            options: {
                labels: _this.props.rpcUsage.map(function (element) { return element.label; }),
                legend: {
                    show: false
                },
                stroke: {
                    show: false
                },
                dataLabels: {
                    enabled: false,
                },
                plotOptions: {
                    pie: {
                        donut: {
                            size: '75%',
                            labels: {
                                show: true,
                                value: {
                                    color: 'grey',
                                    fontSize: '2.5em'
                                },
                                total: {
                                    showAlways: true,
                                    show: true,
                                    label: "TOTAL REQUESTS",
                                    color: 'grey',
                                    fontSize: '1em'
                                }
                            }
                        }
                    }
                }
            },
            series: _this.props.rpcUsage.map(function (element) { return element.value; }),
            componentMount: false
        };
        _this.renderContent = _this.renderContent.bind(_this);
        return _this;
    }
    RpcUsage.prototype.render = function () {
        return (<div className={classes_module_scss_1.default["root"]}>
        <Card_1.default title="rpc usage" content={<this.renderContent />} data={this.props.rpcUsage.length > 0}/>
    </div>);
    };
    RpcUsage.prototype.renderContent = function () {
        return <>
            <div className={classes_module_scss_1.default["container"]}>
              {this.state.componentMount === true &&
                <Chart options={this.state.options} series={this.state.series} type='donut' height='160%' width='100%'/>}
            </div>
          </>;
    };
    RpcUsage.prototype.componentDidMount = function () {
        // to avoid hydration error with ssr
        this.setState({ componentMount: true });
    };
    return RpcUsage;
}(react_1.default.Component));
exports.default = RpcUsage;
//# sourceMappingURL=index.jsx.map