"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Button_1 = require("@Components/Elements/Button");
var password_svg_1 = tslib_1.__importDefault(require("@Assets/icons/password.svg"));
var copy_svg_1 = tslib_1.__importDefault(require("@Assets/icons/copy.svg"));
var InputField_1 = tslib_1.__importDefault(require("@Components/Elements/InputField"));
var react_1 = require("react");
var classes_module_scss_1 = tslib_1.__importDefault(require("./classes.module.scss"));
function ProjectName(props) {
    var _a = (0, react_1.useState)('Copy to clipboard'), copySuccess = _a[0], setCopySuccess = _a[1];
    var textAreaRef = (0, react_1.useRef)(null);
    var copyToClipboard = function () {
        // @ts-ignore
        textAreaRef.current.select();
        setCopySuccess('Copied!');
        navigator.clipboard.writeText(props.token);
    };
    return <div className={classes_module_scss_1.default["root"]}>
        <InputField_1.default type="text" inputStatus="neutral" inputRef={textAreaRef} icon={password_svg_1.default} value={props.token} name="token" onChange={function () { }} onBlur={function () { }}/>
        <Button_1.Button onClick={copyToClipboard} text={copySuccess} icon={copy_svg_1.default}/>
    </div>;
}
exports.default = ProjectName;
//# sourceMappingURL=index.jsx.map