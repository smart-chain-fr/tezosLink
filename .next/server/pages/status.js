(() => {
var exports = {};
exports.id = 465;
exports.ids = [465];
exports.modules = {

/***/ 9515:
/***/ ((module) => {

// Exports
module.exports = {
	"StatusViewHeader": "classes_StatusViewHeader__zRzJR",
	"StatusViewIndicatorGreen": "classes_StatusViewIndicatorGreen__2VNZq",
	"StatusViewIndicatorGreenLittle": "classes_StatusViewIndicatorGreenLittle__khQUE",
	"StatusViewIndicatorRed": "classes_StatusViewIndicatorRed__nXNoV",
	"StatusViewIndicatorRedLittle": "classes_StatusViewIndicatorRedLittle__X7dVX",
	"StatusViewTitle": "classes_StatusViewTitle__7V_EJ",
	"StatusViewSubtitle": "classes_StatusViewSubtitle__fGyY_"
};


/***/ }),

/***/ 344:
/***/ ((module) => {

// Exports
module.exports = {
	"StatusViewHeader": "classes_StatusViewHeader__TVuz8",
	"StatusViewIndicatorGreen": "classes_StatusViewIndicatorGreen__WeCia",
	"StatusViewIndicatorRed": "classes_StatusViewIndicatorRed__X9eJh",
	"StatusViewTitle": "classes_StatusViewTitle__oVg8c",
	"StatusViewSubtitle": "classes_StatusViewSubtitle__ilI4s"
};


/***/ }),

/***/ 1617:
/***/ ((module) => {

// Exports
module.exports = {
	"root": "classes_root__c8RoG",
	"fadeInFromLeft": "classes_fadeInFromLeft__o1hdC",
	"content": "classes_content__XcPKt",
	"slideRightEnter": "classes_slideRightEnter__JLko4",
	"slideRightExit": "classes_slideRightExit__pMWPH",
	"slideLeftEnter": "classes_slideLeftEnter__uVvha",
	"slideLeftExit": "classes_slideLeftExit__Sk1TY",
	"fadeIn": "classes_fadeIn__Dkj2Z",
	"fadeInFromRight": "classes_fadeInFromRight__dElWI",
	"fadeInFromTop": "classes_fadeInFromTop__Us4Lg",
	"fadeInFromBottom": "classes_fadeInFromBottom__j8OW9"
};


/***/ }),

/***/ 2610:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Status)
/* harmony export */ });
/* harmony import */ var _swc_helpers_src_ts_decorate_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1395);
/* harmony import */ var src_front_Api_BaseApiService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8319);
/* harmony import */ var typedi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4585);
/* harmony import */ var typedi__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typedi__WEBPACK_IMPORTED_MODULE_1__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_swc_helpers_src_ts_decorate_mjs__WEBPACK_IMPORTED_MODULE_2__]);
_swc_helpers_src_ts_decorate_mjs__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




let Status = class Status1 extends src_front_Api_BaseApiService__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z {
    baseURl = this.proxyUrl.concat("/status");
    healthURl = this.proxyUrl.concat("/health");
    constructor(){
        super();
    }
    static getInstance() {
        if (!this.instance) {
            return new Status();
        } else {
            return this.instance;
        }
    }
    async getHealth() {
        const url = new URL(this.healthURl);
        try {
            return await this.getRequest(url);
        } catch (err) {
            this.onError(err);
            return Promise.reject(err);
        }
    }
    async getStatus() {
        const url = new URL(this.baseURl);
        try {
            return await this.getRequest(url);
        } catch (err) {
            this.onError(err);
            return Promise.reject(err);
        }
    }
};
Status = (0,_swc_helpers_src_ts_decorate_mjs__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,typedi__WEBPACK_IMPORTED_MODULE_1__.Service)(),
    (0,_swc_helpers_src_ts_decorate_mjs__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:type", Function),
    (0,_swc_helpers_src_ts_decorate_mjs__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:paramtypes", [])
], Status);


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1769:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ StatusLayout)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./src/front/components/Elements/StatusNode/classes.module.scss
var classes_module = __webpack_require__(9515);
var classes_module_default = /*#__PURE__*/__webpack_require__.n(classes_module);
;// CONCATENATED MODULE: ./src/front/components/Elements/StatusNode/index.tsx


function StatusNode(props) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (classes_module_default()).StatusViewHeader,
        children: [
            props.nodeArchiveStatus && props.nodeRollingStatus ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: (classes_module_default()).StatusViewIndicatorGreen
            }) : /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: (classes_module_default()).StatusViewIndicatorRed
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: (classes_module_default()).StatusViewTitle,
                children: [
                    "Nodes RPC services for ",
                    props.network,
                    " are ",
                    props.nodeArchiveStatus && props.nodeRollingStatus ? "online" : "offline",
                    "."
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: (classes_module_default()).StatusViewSubtitle,
                children: [
                    props.nodeArchiveStatus ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: (classes_module_default()).StatusViewIndicatorGreenLittle
                    }) : /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: (classes_module_default()).StatusViewIndicatorRedLittle
                    }),
                    " Archive nodes are ",
                    props.nodeArchiveStatus ? "online" : "offline",
                    "."
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: (classes_module_default()).StatusViewSubtitle,
                children: [
                    props.nodeRollingStatus ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: (classes_module_default()).StatusViewIndicatorGreenLittle
                    }) : /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: (classes_module_default()).StatusViewIndicatorRedLittle
                    }),
                    " Rolling nodes are ",
                    props.nodeRollingStatus ? "online" : "offline",
                    "."
                ]
            })
        ]
    });
}

// EXTERNAL MODULE: ./src/front/components/Elements/StatusProxy/classes.module.scss
var StatusProxy_classes_module = __webpack_require__(344);
var StatusProxy_classes_module_default = /*#__PURE__*/__webpack_require__.n(StatusProxy_classes_module);
;// CONCATENATED MODULE: ./src/front/components/Elements/StatusProxy/index.tsx


function StatusProxy(props) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (StatusProxy_classes_module_default()).StatusViewHeader,
        children: [
            props.proxyStatus ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: (StatusProxy_classes_module_default()).StatusViewIndicatorGreen
            }) : /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: (StatusProxy_classes_module_default()).StatusViewIndicatorRed
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: (StatusProxy_classes_module_default()).StatusViewTitle,
                children: [
                    "Proxy service for ",
                    props.network,
                    " is ",
                    props.proxyStatus ? "online" : "offline",
                    "."
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: (StatusProxy_classes_module_default()).StatusViewSubtitle,
                children: [
                    "As of ",
                    props.date,
                    "."
                ]
            })
        ]
    });
}

// EXTERNAL MODULE: ./src/front/components/Layouts/Base/index.tsx
var Base = __webpack_require__(5900);
// EXTERNAL MODULE: ./src/front/components/LayoutTemplates/DefaultTemplate/index.tsx + 6 modules
var DefaultTemplate = __webpack_require__(5467);
// EXTERNAL MODULE: ./src/front/components/Layouts/Status/classes.module.scss
var Status_classes_module = __webpack_require__(1617);
var Status_classes_module_default = /*#__PURE__*/__webpack_require__.n(Status_classes_module);
;// CONCATENATED MODULE: ./src/front/components/Layouts/Status/index.tsx






class StatusLayout extends Base/* default */.Z {
    constructor(props){
        super(props);
    }
    render() {
        return /*#__PURE__*/ jsx_runtime_.jsx(DefaultTemplate/* default */.Z, {
            title: "Status",
            children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: (Status_classes_module_default()).root,
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: (Status_classes_module_default()).content,
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                            children: "Services status"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(StatusProxy, {
                            proxyStatus: this.props.MainnetProxyStatus,
                            network: "Mainnet",
                            date: this.props.Date
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(StatusNode, {
                            nodeArchiveStatus: this.props.MainnetArchiveStatus,
                            nodeRollingStatus: this.props.MainnetRollingStatus,
                            network: "Mainnet"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(StatusProxy, {
                            proxyStatus: this.props.TestnetProxyStatus,
                            network: this.props.TestnetName,
                            date: this.props.Date
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(StatusNode, {
                            nodeArchiveStatus: this.props.TestnetArchiveStatus,
                            nodeRollingStatus: this.props.TestnetRollingStatus,
                            network: this.props.TestnetName
                        })
                    ]
                })
            })
        });
    }
}


/***/ }),

/***/ 7162:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Route),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Front_Api_Status__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2610);
/* harmony import */ var _Front_components_Layouts_Status__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1769);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Front_Api_Status__WEBPACK_IMPORTED_MODULE_1__]);
_Front_Api_Status__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



function Route(currentStatus) {
    const props = {
        MainnetProxyStatus: currentStatus.archive_node,
        MainnetArchiveStatus: currentStatus.archive_node,
        MainnetRollingStatus: currentStatus.rolling_node,
        TestnetName: "LIMANET",
        TestnetProxyStatus: currentStatus.archive_node,
        TestnetArchiveStatus: currentStatus.archive_node,
        TestnetRollingStatus: currentStatus.rolling_node,
        Date: new Date(Date.now()).toLocaleString()
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Front_components_Layouts_Status__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
        ...props
    });
}
const getServerSideProps = async ()=>{
    const instance = _Front_Api_Status__WEBPACK_IMPORTED_MODULE_1__/* ["default"].getInstance */ .Z.getInstance();
    if (!instance) {
        return {
            redirect: {
                permanent: false,
                destination: "/status-not-found"
            }
        };
    }
    const health = await instance.getHealth();
    if (health.status !== "success") return {
        notFound: true
    };
    return {
        props: await instance.getStatus()
    };
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9003:
/***/ ((module) => {

"use strict";
module.exports = require("classnames");

/***/ }),

/***/ 3918:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/amp-context.js");

/***/ }),

/***/ 5732:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/amp-mode.js");

/***/ }),

/***/ 3280:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 4486:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-blur-svg.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 9552:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-loader");

/***/ }),

/***/ 8524:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1897:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-bot.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 2470:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/side-effect.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 618:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils/warn-once.js");

/***/ }),

/***/ 1853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 6405:
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 4585:
/***/ ((module) => {

"use strict";
module.exports = require("typedi");

/***/ }),

/***/ 1395:
/***/ ((module) => {

"use strict";
module.exports = import("tslib");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [121,676,61,312,319], () => (__webpack_exec__(7162)));
module.exports = __webpack_exports__;

})();