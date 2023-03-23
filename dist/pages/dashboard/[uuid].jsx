"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServerSideProps = void 0;
var tslib_1 = require("tslib");
var Dashboard_1 = tslib_1.__importDefault(require("@Components/Layouts/Dashboard"));
var Project_1 = tslib_1.__importDefault(require("src/front/Api/Project"));
var extractData_1 = require("@Components/Layouts/Dashboard/extractData");
function Route(currentProject) {
    var _a;
    var props = {
        network: currentProject.network,
        title: currentProject.title,
        uuid: currentProject.uuid,
        firstTime: false,
        lastRequests: (0, extractData_1.getLastRequest)(currentProject.metrics, 5),
        rpcTotalCount: (_a = currentProject.metrics) === null || _a === void 0 ? void 0 : _a.length,
        rpcUsage: (0, extractData_1.getRpcUsage)(currentProject.metrics),
        requestByDays: (0, extractData_1.getRequestByDays)(currentProject.metrics)
    };
    return <Dashboard_1.default {...props}/>;
}
exports.default = Route;
var getServerSideProps = function (context) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var uuid;
    var _a;
    var _b;
    return tslib_1.__generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                uuid = (_b = context.params) === null || _b === void 0 ? void 0 : _b['uuid'];
                if (!uuid || Array.isArray(uuid) || !uuid.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')) {
                    return [2 /*return*/, {
                            redirect: {
                                permanent: false,
                                destination: "/project-not-found",
                            },
                        }];
                }
                _a = {};
                return [4 /*yield*/, Project_1.default.getInstance().getOneProject(uuid)];
            case 1: return [2 /*return*/, (_a.props = _c.sent(),
                    _a)];
        }
    });
}); };
exports.getServerSideProps = getServerSideProps;
//# sourceMappingURL=%5Buuid%5D.jsx.map