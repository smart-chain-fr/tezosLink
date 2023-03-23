"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Built_1 = tslib_1.__importDefault(require("./Built"));
var GetStarted_1 = tslib_1.__importDefault(require("./GetStarted"));
var Head_1 = tslib_1.__importDefault(require("./Head"));
var Metrics_1 = tslib_1.__importDefault(require("./Metrics"));
var Panels_1 = tslib_1.__importDefault(require("./Panels"));
var Trusted_1 = tslib_1.__importDefault(require("./Trusted"));
var Base_1 = tslib_1.__importDefault(require("@Components/Layouts/Base"));
var DefaultTemplate_1 = tslib_1.__importDefault(require("@Components/LayoutTemplates/DefaultTemplate"));
var classes_module_scss_1 = tslib_1.__importDefault(require("./classes.module.scss"));
var Footer_1 = tslib_1.__importDefault(require("./Footer"));
var Home = /** @class */ (function (_super) {
    tslib_1.__extends(Home, _super);
    function Home() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Home.prototype.render = function () {
        return (<DefaultTemplate_1.default title={"HomePage"}>
				<div className={classes_module_scss_1.default["root"]}>
                    <Head_1.default />
                    <Built_1.default />
                    <Trusted_1.default />
                    <Metrics_1.default />
                    <Panels_1.default />
                    <GetStarted_1.default />
					<Footer_1.default />
				</div>
			</DefaultTemplate_1.default>);
    };
    return Home;
}(Base_1.default));
exports.default = Home;
//# sourceMappingURL=index.jsx.map