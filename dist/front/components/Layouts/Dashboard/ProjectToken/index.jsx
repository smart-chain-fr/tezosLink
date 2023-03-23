"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var link_1 = tslib_1.__importDefault(require("next/link"));
var classes_module_scss_1 = tslib_1.__importDefault(require("./classes.module.scss"));
var TokenCopy_1 = tslib_1.__importDefault(require("../TokenCopy"));
function ProjectName(props) {
    return <div className={classes_module_scss_1.default["root"]}>
        <div className={classes_module_scss_1.default["title"]}>private token</div>
        <TokenCopy_1.default token={props.token}/>
        <p>
          Make sure to <b>save this token</b>, it is both your <b>access to this dashboard</b> and the <b>API key</b> to
          interact with the proxy.
        </p>
        <p>You can find information about how to use our gateway here : <link_1.default href={"/documentation"}>documentation</link_1.default>.</p>
    </div>;
}
exports.default = ProjectName;
//# sourceMappingURL=index.jsx.map