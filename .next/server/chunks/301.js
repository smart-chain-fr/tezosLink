"use strict";
exports.id = 301;
exports.ids = [301];
exports.modules = {

/***/ 6301:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Project)
/* harmony export */ });
/* harmony import */ var _swc_helpers_src_ts_decorate_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1395);
/* harmony import */ var src_front_Api_BaseApiService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8319);
/* harmony import */ var typedi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4585);
/* harmony import */ var typedi__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typedi__WEBPACK_IMPORTED_MODULE_1__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_swc_helpers_src_ts_decorate_mjs__WEBPACK_IMPORTED_MODULE_2__]);
_swc_helpers_src_ts_decorate_mjs__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




let Project = class Project1 extends src_front_Api_BaseApiService__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z {
    baseURl = this.backUrl.concat("/projects");
    constructor(){
        super();
    }
    static getInstance() {
        if (!this.instance) {
            return new Project();
        } else {
            return this.instance;
        }
    }
    async getAllProject() {
        const url = new URL(this.baseURl);
        try {
            return await this.getRequest(url);
        } catch (err) {
            this.onError(err);
            return Promise.reject(err);
        }
    }
    async getOneProject(uuid) {
        const url = new URL(this.baseURl.concat("/").concat(uuid));
        try {
            return await this.getRequest(url);
        } catch (err) {
            this.onError(err);
            return Promise.reject(err);
        }
    }
    async postProject(params) {
        const url = new URL(this.baseURl);
        try {
            return await this.postRequest(url, params);
        } catch (err) {
            this.onError(err);
            return Promise.reject(err);
        }
    }
};
Project = (0,_swc_helpers_src_ts_decorate_mjs__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,typedi__WEBPACK_IMPORTED_MODULE_1__.Service)(),
    (0,_swc_helpers_src_ts_decorate_mjs__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:type", Function),
    (0,_swc_helpers_src_ts_decorate_mjs__WEBPACK_IMPORTED_MODULE_2__.__metadata)("design:paramtypes", [])
], Project);


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;