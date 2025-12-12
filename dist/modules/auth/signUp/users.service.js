"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../../../config/db");
const createUser = async (payload) => {
    const { name, role, email, phone, password } = payload;
    const hashedPass = await bcrypt_1.default.hash(password, 10);
    const result = await db_1.pool.query(`INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *`, [name, email, hashedPass, phone, role]);
    return result.rows[0];
};
const getUser = async () => {
    const result = await db_1.pool.query(`SELECT * FROM users`);
    return result;
};
exports.userServices = {
    createUser,
    getUser,
};
//# sourceMappingURL=users.service.js.map