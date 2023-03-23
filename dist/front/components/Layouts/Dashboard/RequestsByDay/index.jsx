"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var classes_module_scss_1 = tslib_1.__importDefault(require("./classes.module.scss"));
var react_1 = tslib_1.__importDefault(require("react"));
// Dynamic import mandatory to avoid the error : window undefined
// https://stackoverflow.com/questions/68596778/next-js-window-is-not-defined
var dynamic_1 = tslib_1.__importDefault(require("next/dynamic"));
var Chart = (0, dynamic_1.default)(function () { return Promise.resolve().then(function () { return tslib_1.__importStar(require('react-apexcharts')); }); }, { ssr: false });
var RequestsByDay = /** @class */ (function (_super) {
    tslib_1.__extends(RequestsByDay, _super);
    function RequestsByDay(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            options: {
                chart: {
                    id: "basic-bar"
                },
                stroke: {
                    curve: 'smooth',
                    colors: ['#42E8E0']
                },
                markers: {
                    size: 2,
                    colors: ['#42E8E0'],
                },
                grid: {
                    xaxis: {
                        lines: {
                            show: false
                        }
                    },
                },
                xaxis: {
                    type: 'datetime',
                    labels: {
                        show: true,
                        rotate: 0,
                        style: {
                            colors: _this.props.requestsByDays.map(function () { return '#FFF'; }),
                            fontSize: '12px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 400,
                        },
                    },
                },
                yaxis: {
                    labels: {
                        show: true,
                        style: {
                            colors: ['#FFF'],
                            fontSize: '12px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 400,
                        },
                    },
                },
            },
            series: [
                {
                    name: 'Nb of request',
                    type: 'line',
                    data: _this.props.requestsByDays.map(function (rq) {
                        return { x: rq.date.getTime(), y: rq.value };
                    })
                }
            ],
            componentMount: false
        };
        return _this;
    }
    RequestsByDay.prototype.render = function () {
        return (<div className={classes_module_scss_1.default["root"]}>
            <div className={classes_module_scss_1.default["title"]}>Requests last 30 days</div>
            {this.state.componentMount === true &&
                <Chart options={this.state.options} series={this.state.series} type='line' height='95%' width='100%'/>}
        </div>);
    };
    RequestsByDay.prototype.componentDidMount = function () {
        // to avoid hydration error with ssr
        this.setState({ componentMount: true });
    };
    return RequestsByDay;
}(react_1.default.Component));
exports.default = RequestsByDay;
//# sourceMappingURL=index.jsx.map