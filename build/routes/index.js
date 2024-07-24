"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./user.routes"));
const docs_routes_1 = __importDefault(require("./docs.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const fileServer_routes_1 = __importDefault(require("./fileServer.routes"));
const userDataForm_routes_1 = __importDefault(require("./userDataForm.routes"));
const product_routes_1 = __importDefault(require("./product.routes"));
const payment_routes_1 = __importDefault(require("./payment.routes"));
let router = express_1.default.Router();
const defaultRoutes = [
    { path: "/User", route: user_routes_1.default },
    { path: "/", route: auth_routes_1.default },
    { path: "/img", route: fileServer_routes_1.default },
    { path: "/form", route: userDataForm_routes_1.default },
    { path: "/product", route: product_routes_1.default },
    { path: "/pay", route: payment_routes_1.default }
];
const devRoutes = [{ path: "/", route: docs_routes_1.default }];
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
devRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;