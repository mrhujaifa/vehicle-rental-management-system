"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const auth_1 = require("../../../middleware/auth");
const longger_1 = __importDefault(require("../../../middleware/longger"));
const router = express_1.default.Router();
router.post("/", auth_controller_1.authController.loginUser);
// protect this route with verifyToken middleware
router.get("/me", longger_1.default, auth_1.verifyToken, (req, res) => {
    return res.json({
        success: true,
        message: "Valid Token",
        user: req.user,
    });
});
exports.authRoutes = router;
//# sourceMappingURL=auth.routes.js.map