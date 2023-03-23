exports.id = 312;
exports.ids = [312];
exports.modules = {

/***/ 1058:
/***/ ((module) => {

// Exports
module.exports = {
	"root": "classes_root__4Fle2",
	"box": "classes_box__1IEVi",
	"inner": "classes_inner__LW7Uu",
	"inner-top": "classes_inner-top__qP_Rx",
	"true": "classes_true__u9FcJ",
	"BurgerTopForward": "classes_BurgerTopForward__I1LYv",
	"false": "classes_false__bTN5A",
	"BurgerTopBackward": "classes_BurgerTopBackward__MOWph",
	"inner-middle": "classes_inner-middle__QePmH",
	"inner-bottom": "classes_inner-bottom__mj3ZO",
	"BurgerBottomForward": "classes_BurgerBottomForward__mL2pp",
	"BurgerBottomBackward": "classes_BurgerBottomBackward__PDVPQ"
};


/***/ }),

/***/ 6721:
/***/ ((module) => {

// Exports
module.exports = {
	"root": "classes_root__E5gKU",
	"clicked": "classes_clicked__aPe_V",
	"clickWave": "classes_clickWave__UQWCU",
	"primary": "classes_primary__BeagU",
	"secondary": "classes_secondary__NYCty",
	"transparent": "classes_transparent__er04s",
	"loading": "classes_loading__j3BJK",
	"text": "classes_text__P6__z",
	"icon": "classes_icon__Hv8nm",
	"ButtonLoadingIcon": "classes_ButtonLoadingIcon__AktTi",
	"turn": "classes_turn__VIf6c",
	"path": "classes_path__o84bV"
};


/***/ }),

/***/ 3958:
/***/ ((module) => {

// Exports
module.exports = {
	"shadow": "classes_shadow__pCyzh",
	"true": "classes_true__r9vtG",
	"root": "classes_root__MCUG5",
	"false": "classes_false__yybRK",
	"item": "classes_item__4Q3hN",
	"current-path": "classes_current-path__wUhu3"
};


/***/ }),

/***/ 2359:
/***/ ((module) => {

// Exports
module.exports = {
	"root": "classes_root__Ko1Z4"
};


/***/ }),

/***/ 4702:
/***/ ((module) => {

// Exports
module.exports = {
	"root": "classes_root__Gt7iu",
	"triangle-under-logo": "classes_triangle-under-logo__ewBGi",
	"menu": "classes_menu__fGaI_",
	"logo": "classes_logo__WoMPQ",
	"button": "classes_button__DrJHV",
	"top-menu-burger": "classes_top-menu-burger__i0TsK"
};


/***/ }),

/***/ 1908:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/cards.ed8bbff2.svg","height":24,"width":24});

/***/ }),

/***/ 7593:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/login.dd97bdfd.svg","height":24,"width":24});

/***/ }),

/***/ 1145:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/plus-card.52deae9f.svg","height":24,"width":24});

/***/ }),

/***/ 2686:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "z": () => (/* binding */ Button)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9003);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _classes_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6721);
/* harmony import */ var _classes_module_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_classes_module_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_3__);






const PRIMARY = "primary";
function Button(props) {
    const [clicked, setClicked] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const clickCallback = ()=>{
        setClicked(true);
        setTimeout(()=>setClicked(false), 1000);
    };
    let buttonClasses = clicked ? "clicked" : "";
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_2___default()((_classes_module_scss__WEBPACK_IMPORTED_MODULE_4___default().root), (_classes_module_scss__WEBPACK_IMPORTED_MODULE_4___default())[props.color], (_classes_module_scss__WEBPACK_IMPORTED_MODULE_4___default())[buttonClasses]),
        onClick: ()=>{
            clickCallback();
            props.onClick && props.onClick();
        },
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_classes_module_scss__WEBPACK_IMPORTED_MODULE_4___default().text),
                children: props.text
            }),
            props.icon && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_3___default()), {
                className: classnames__WEBPACK_IMPORTED_MODULE_2___default()((_classes_module_scss__WEBPACK_IMPORTED_MODULE_4___default().icon), (_classes_module_scss__WEBPACK_IMPORTED_MODULE_4___default())[props.color]),
                src: props.icon,
                alt: "icon"
            })
        ]
    });
}
Button.defaultProps = {
    icon: undefined,
    color: PRIMARY
};


/***/ }),

/***/ 5467:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ DefaultTemplate)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
;// CONCATENATED MODULE: ./src/front/assets/link_logo.svg
/* harmony default export */ const link_logo = ({"src":"/_next/static/media/link_logo.dc7af256.svg","height":19,"width":140});
;// CONCATENATED MODULE: ./src/front/assets/logo.svg
/* harmony default export */ const logo = ({"src":"/_next/static/media/logo.88863be8.svg","height":76,"width":67});
// EXTERNAL MODULE: ./src/front/components/Materials/Header/classes.module.scss
var classes_module = __webpack_require__(4702);
var classes_module_default = /*#__PURE__*/__webpack_require__.n(classes_module);
// EXTERNAL MODULE: ./src/front/components/Elements/Button/index.tsx
var Button = __webpack_require__(2686);
// EXTERNAL MODULE: ./src/front/components/Elements/Burger/classes.module.scss
var Burger_classes_module = __webpack_require__(1058);
var Burger_classes_module_default = /*#__PURE__*/__webpack_require__.n(Burger_classes_module);
// EXTERNAL MODULE: external "classnames"
var external_classnames_ = __webpack_require__(9003);
var external_classnames_default = /*#__PURE__*/__webpack_require__.n(external_classnames_);
;// CONCATENATED MODULE: ./src/front/components/Elements/Burger/index.tsx



function Burger({ state , callback  }) {
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: (Burger_classes_module_default()).root,
        onClick: ()=>callback(),
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: (Burger_classes_module_default()).box,
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: external_classnames_default()((Burger_classes_module_default())["inner-top"], (Burger_classes_module_default()).inner, (Burger_classes_module_default())[String(state)])
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: external_classnames_default()((Burger_classes_module_default())["inner-middle"], (Burger_classes_module_default()).inner, (Burger_classes_module_default())[String(state)])
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: external_classnames_default()((Burger_classes_module_default())["inner-bottom"], (Burger_classes_module_default()).inner, (Burger_classes_module_default())[String(state)])
                })
            ]
        })
    });
}

// EXTERNAL MODULE: ./src/front/components/Elements/Drawer/classes.module.scss
var Drawer_classes_module = __webpack_require__(3958);
var Drawer_classes_module_default = /*#__PURE__*/__webpack_require__.n(Drawer_classes_module);
// EXTERNAL MODULE: ./src/front/assets/icons/login.svg
var login = __webpack_require__(7593);
// EXTERNAL MODULE: ./src/front/assets/icons/cards.svg
var cards = __webpack_require__(1908);
// EXTERNAL MODULE: ./src/front/assets/icons/plus-card.svg
var plus_card = __webpack_require__(1145);
;// CONCATENATED MODULE: ./src/front/assets/icons/documentation.svg
/* harmony default export */ const documentation = ({"src":"/_next/static/media/documentation.3f34ec4e.svg","height":24,"width":24});
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
;// CONCATENATED MODULE: ./src/front/components/Elements/Drawer/index.tsx











class Drawer extends (external_react_default()).Component {
    constructor(props){
        super(props);
        this.state = {
            Links: [
                {
                    name: "See my project",
                    link: "/show-project",
                    icon: login/* default */.Z
                },
                {
                    name: "Create",
                    link: "/new-project",
                    icon: plus_card/* default */.Z
                },
                {
                    name: "Status",
                    link: "/status",
                    icon: cards/* default */.Z
                },
                {
                    name: "Documentation",
                    link: "/documentation",
                    icon: documentation
                }
            ]
        };
    }
    render() {
        return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: external_classnames_default()((Drawer_classes_module_default())[String(this.props.status)], (Drawer_classes_module_default()).shadow),
                    onClick: this.props.hideCallback
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: external_classnames_default()((Drawer_classes_module_default())[String(this.props.status)], (Drawer_classes_module_default()).root),
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                            children: "Menu"
                        }),
                        this.state.Links.map((link, index)=>this.renderItem(link, index))
                    ]
                })
            ]
        });
    }
    renderItem(link, index) {
        return /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: external_classnames_default()((Drawer_classes_module_default()).item, (Drawer_classes_module_default())[this.isCurrentPath(link.link)]),
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                href: link.link,
                onClick: this.props.hideCallback,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                        alt: "icon",
                        src: link.icon
                    }),
                    link.name
                ]
            })
        }, index);
    }
    isCurrentPath(link) {
        if (this.props.router.pathname === link) return "current-path";
        return "other-path";
    }
}
/* harmony default export */ const Elements_Drawer = ((0,router_.withRouter)(Drawer));

;// CONCATENATED MODULE: ./src/front/components/Materials/Header/index.tsx












class Header extends (external_react_default()).Component {
    constructor(props){
        super(props);
        this.state = {
            status: false
        };
        this.switchStatus = this.switchStatus.bind(this);
    }
    render() {
        return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(Elements_Drawer, {
                    status: this.state.status,
                    hideCallback: this.switchStatus
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: (classes_module_default()).root,
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(Burger, {
                            state: this.state.status,
                            callback: this.switchStatus
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: (classes_module_default()).menu,
                            children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                href: "/",
                                children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                    alt: "TEZOS LINK",
                                    src: link_logo
                                })
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: (classes_module_default())["triangle-under-logo"]
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: (classes_module_default()).logo,
                            children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                href: "/",
                                children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                    alt: "entire stack",
                                    src: logo
                                })
                            })
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: (classes_module_default()).button,
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                    href: "/show-project",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(Button/* Button */.z, {
                                        color: "transparent",
                                        text: "MY PROJECT",
                                        icon: login/* default */.Z
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                    href: "/new-project",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(Button/* Button */.z, {
                                        text: "CREATE",
                                        icon: plus_card/* default */.Z
                                    })
                                })
                            ]
                        })
                    ]
                })
            ]
        });
    }
    switchStatus() {
        this.state.status ? this.setState({
            status: false
        }) : this.setState({
            status: true
        });
    }
}

// EXTERNAL MODULE: ./src/front/components/LayoutTemplates/DefaultTemplate/classes.module.scss
var DefaultTemplate_classes_module = __webpack_require__(2359);
var DefaultTemplate_classes_module_default = /*#__PURE__*/__webpack_require__.n(DefaultTemplate_classes_module);
;// CONCATENATED MODULE: ./src/front/components/LayoutTemplates/DefaultTemplate/index.tsx




class DefaultTemplate extends (external_react_default()).Component {
    static defaultProps = {
        scrollTop: 0
    };
    render() {
        return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(Header, {}),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: (DefaultTemplate_classes_module_default()).root,
                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: (DefaultTemplate_classes_module_default()).content,
                        children: this.props.children
                    })
                })
            ]
        });
    }
    componentDidMount() {
        window.document.title = this.props.title;
        if (this.props.scrollTop !== null) {
            window.scrollTo(0, this.props.scrollTop);
        }
    }
}


/***/ }),

/***/ 5900:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ BasePage)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

class BasePage extends (react__WEBPACK_IMPORTED_MODULE_0___default().Component) {
}


/***/ })

};
;