"use strict";
exports.id = 319;
exports.ids = [319];
exports.modules = {

/***/ 8319:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ BaseApiService)
/* harmony export */ });
/* unused harmony export ContentType */
var ContentType;
(function(ContentType) {
    ContentType["JSON"] = "application/json";
    ContentType["FORM_DATA"] = "multipart/form-data;";
})(ContentType || (ContentType = {}));
class BaseApiService {
    backUrl = process.env["NEXT_PUBLIC_API_HOSTNAME"] + ":" + process.env["NEXT_PUBLIC_API_PORT"] + process.env["NEXT_PUBLIC_API_ROOT_URL"];
    proxyUrl = process.env["NEXT_PUBLIC_RPC_GATEWAY_HOSTNAME"] + ":" + process.env["NEXT_PUBLIC_RPC_GATEWAY_PORT"] + process.env["NEXT_PUBLIC_RPC_GATEWAY_ROOT_URL"];
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor(){}
    buildHeaders(contentType) {
        const headers = new Headers();
        if (contentType === ContentType.JSON) {
            headers.set("Content-Type", contentType);
        }
        return headers;
    }
    buildBody(body) {
        return JSON.stringify(body);
    }
    async getRequest(url) {
        const request = async ()=>await fetch(url, {
                method: "GET",
                headers: this.buildHeaders(ContentType.JSON)
            });
        return this.sendRequest(request);
    }
    async postRequest(url, body = {}) {
        const request = async ()=>await fetch(url, {
                method: "POST",
                headers: this.buildHeaders(ContentType.JSON),
                body: this.buildBody(body)
            });
        return this.sendRequest(request);
    }
    async putRequest(url, body = {}) {
        const request = async ()=>await fetch(url, {
                method: "PUT",
                headers: this.buildHeaders(ContentType.JSON),
                body: this.buildBody(body)
            });
        return this.sendRequest(request);
    }
    async patchRequest(url, body = {}) {
        const request = async ()=>await fetch(url, {
                method: "PATCH",
                headers: this.buildHeaders(ContentType.JSON),
                body: this.buildBody(body)
            });
        return this.sendRequest(request);
    }
    async deleteRequest(url, body = {}) {
        const request = async ()=>await fetch(url, {
                method: "DELETE",
                headers: this.buildHeaders(ContentType.JSON),
                body: this.buildBody(body)
            });
        return this.sendRequest(request);
    }
    async putFormDataRequest(url, body) {
        const request = async ()=>await fetch(url, {
                method: "PUT",
                headers: this.buildHeaders(ContentType.FORM_DATA),
                body
            });
        return this.sendRequest(request);
    }
    async sendRequest(request) {
        const response = await request();
        return this.processResponse(response, request);
    }
    async processResponse(response, request) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let responseJson;
        try {
            responseJson = await response.json();
        } catch (err) {
            responseJson = null;
        }
        if (!response.ok) {
            return Promise.reject(response);
        }
        return responseJson;
    }
    onError(error) {
        console.error(error);
    }
}


/***/ })

};
;