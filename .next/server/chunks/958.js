exports.id = 958;
exports.ids = [958];
exports.modules = {

/***/ 7319:
/***/ ((module) => {

// Exports
module.exports = {
	"root": "classes_root__9Kfqp",
	"fadeInFromLeft": "classes_fadeInFromLeft__HRao2",
	"component": "classes_component__QpXrL",
	"error": "classes_error__YJAHz",
	"success": "classes_success__0YWhR",
	"status": "classes_status__6zFYC",
	"zoomIn": "classes_zoomIn__nzF5a",
	"icon": "classes_icon__anVTn",
	"errorMsg": "classes_errorMsg__6GWK8",
	"slideDown": "classes_slideDown__5sGrP",
	"slideRightEnter": "classes_slideRightEnter__nucVm",
	"slideRightExit": "classes_slideRightExit___Gmg5",
	"slideLeftEnter": "classes_slideLeftEnter__yJIou",
	"slideLeftExit": "classes_slideLeftExit__JzpRd",
	"fadeIn": "classes_fadeIn__Jxh2v",
	"fadeInFromRight": "classes_fadeInFromRight__N747w",
	"fadeInFromTop": "classes_fadeInFromTop__pgurU",
	"fadeInFromBottom": "classes_fadeInFromBottom__NqqVj"
};


/***/ }),

/***/ 7958:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ InputField)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
// EXTERNAL MODULE: ./src/front/components/Elements/InputField/classes.module.scss
var classes_module = __webpack_require__(7319);
var classes_module_default = /*#__PURE__*/__webpack_require__.n(classes_module);
// EXTERNAL MODULE: external "classnames"
var external_classnames_ = __webpack_require__(9003);
var external_classnames_default = /*#__PURE__*/__webpack_require__.n(external_classnames_);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
;// CONCATENATED MODULE: ./src/front/assets/icons/input-error.svg
/* harmony default export */ const input_error = ({"src":"/_next/static/media/input-error.cf7d81f2.svg","height":20,"width":20});
;// CONCATENATED MODULE: ./src/front/assets/icons/input-success.svg
/* harmony default export */ const input_success = ({"src":"/_next/static/media/input-success.ffc8811b.svg","height":20,"width":20});
;// CONCATENATED MODULE: ./src/front/components/Elements/InputField/index.tsx







class InputField extends (external_react_default()).Component {
    constructor(props){
        super(props);
    }
    render() {
        return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: external_classnames_default()((classes_module_default()).root),
                    children: [
                        this.props.icon && /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                            className: (classes_module_default()).icon,
                            alt: this.props.icon,
                            src: this.props.icon
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("input", {
                            className: external_classnames_default()((classes_module_default()).component, (classes_module_default())[this.props.inputStatus]),
                            ref: this.props.inputRef,
                            type: this.props.type,
                            name: this.props.name,
                            placeholder: this.props.placeholder,
                            value: this.props.value,
                            onChange: this.props.onChange,
                            onBlur: this.props.onBlur,
                            autoComplete: this.props.name
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: external_classnames_default()((classes_module_default()).status, (classes_module_default())[this.props.inputStatus]),
                            children: [
                                this.props.inputStatus === "success" && /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                    alt: "success icon",
                                    src: input_success
                                }),
                                this.props.inputStatus === "error" && /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                    alt: "error icon",
                                    src: input_error
                                })
                            ]
                        })
                    ]
                }),
                this.props.errorMsg && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: (classes_module_default()).errorMsg,
                    children: this.props.errorMsg
                })
            ]
        });
    }
}


/***/ })

};
;