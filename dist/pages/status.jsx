"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServerSideProps = void 0;
var tslib_1 = require("tslib");
var Status_1 = tslib_1.__importDefault(require("@Front/Api/Status"));
var Status_2 = tslib_1.__importDefault(require("@Front/components/Layouts/Status"));
function Route(currentStatus) {
    var props = {
        MainnetProxyStatus: currentStatus.archive_node,
        MainnetArchiveStatus: currentStatus.archive_node,
        MainnetRollingStatus: currentStatus.rolling_node,
        TestnetName: "LIMANET",
        TestnetProxyStatus: currentStatus.archive_node,
        TestnetArchiveStatus: currentStatus.archive_node,
        TestnetRollingStatus: currentStatus.rolling_node,
        Date: new Date(Date.now()).toLocaleString(),
    };
    return <Status_2.default {...props}/>;
}
exports.default = Route;
var getServerSideProps = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var instance, health;
    var _a;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                instance = Status_1.default.getInstance();
                if (!instance) {
                    return [2 /*return*/, {
                            redirect: {
                                permanent: false,
                                destination: "/status-not-found",
                            },
                        }];
                }
                return [4 /*yield*/, instance.getHealth()];
            case 1:
                health = _b.sent();
                if (health.status !== "success")
                    return [2 /*return*/, { notFound: true }];
                _a = {};
                return [4 /*yield*/, instance.getStatus()];
            case 2: return [2 /*return*/, (_a.props = _b.sent(),
                    _a)];
        }
    });
}); };
exports.getServerSideProps = getServerSideProps;
//# sourceMappingURL=status.jsx.map