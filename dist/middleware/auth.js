"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res
            .status(401)
            .json({ success: false, message: "Authorization header missing" });
    }
    const parts = authHeader.split(" ");
    const token = parts[1];
    if (!token) {
        return res.status(401).json({ success: false, message: "Token missing" });
    }
    const secret = config_1.default.jwt_Key;
    if (!secret) {
        return res
            .status(500)
            .json({ success: false, message: "Server configuration error" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_Key);
        req.user = decoded;
        next();
    }
    catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Token expired" });
        }
        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }
        return res
            .status(401)
            .json({ success: false, message: "Token verification failed" });
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=auth.js.map