"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Authorization token required",
        });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token missing",
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_Key);
        if (decoded.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Admins only",
            });
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        console.log(error.message);
        return res.status(401).json({
            success: false,
            message: "Invalid token",
        });
    }
};
exports.isAdmin = isAdmin;
//# sourceMappingURL=isAdmin.js.map