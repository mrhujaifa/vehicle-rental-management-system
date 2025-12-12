"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("./users.controller");
const longger_1 = __importDefault(require("../../middleware/longger"));
const isAdmin_1 = require("../../middleware/isAdmin");
const isCustomer_1 = require("../../middleware/isCustomer");
const auth_1 = require("../../middleware/auth");
const router = express_1.default.Router();
router.get("/", longger_1.default, isAdmin_1.isAdmin, users_controller_1.userControllers.getUsers);
router.put("/:userId", longger_1.default, auth_1.verifyToken, isCustomer_1.isCustomerUpdateAllowed, users_controller_1.userControllers.getUpdateUser);
router.delete("/:userId", longger_1.default, isAdmin_1.isAdmin, users_controller_1.userControllers.getDeleteUser);
exports.userRoutes = router;
//# sourceMappingURL=users.route.js.map