"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSevices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../../../config/db");
const config_1 = __importDefault(require("../../../config"));
const loginUser = async (payload) => {
    const { email, password } = payload;
    if (!email || !password) {
        throw new Error("Email and password are required");
    }
    const result = await db_1.pool.query(`SELECT * FROM users WHERE email = $1`, [
        email,
    ]);
    if (result.rows.length === 0) {
        return null; // user not found
    }
    const user = result.rows[0];
    if (!user.password) {
        return false;
    }
    // Compare password
    const matchPass = await bcrypt_1.default.compare(password, user.password);
    if (!matchPass) {
        return false;
    }
    // JWT Secret from config
    const secret = config_1.default.jwt_Key;
    if (!secret) {
        throw new Error("JWT secret is not defined in environment variables");
    }
    // Minimal token payload
    const payloadForToken = {
        id: user.id,
        email: user.email,
        role: user.role ?? null,
    };
    const token = jsonwebtoken_1.default.sign(payloadForToken, secret, { expiresIn: "7d" });
    const { password: _pw, ...safeUser } = user;
    return { token, user: safeUser };
};
exports.authSevices = {
    loginUser,
};
//# sourceMappingURL=auth.service.js.map