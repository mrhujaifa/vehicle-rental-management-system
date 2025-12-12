"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const db_1 = require("../../config/db");
const getUser = async () => {
    const result = await db_1.pool.query(`SELECT * FROM users`);
    return result;
};
const getUpdateUser = async (payload, id, isAdmin) => {
    const { name, phone, role } = payload;
    let query = "";
    let params = [];
    // Admin can update name, phone, role
    if (isAdmin) {
        query =
            "UPDATE users SET name=$1, phone=$2, role=$3 WHERE id=$4 RETURNING *";
        params = [name, phone, role, id];
    }
    // Customer cannot update role
    else {
        query = "UPDATE users SET name=$1, phone=$2 WHERE id=$3 RETURNING *";
        params = [name, phone, id];
    }
    const result = await db_1.pool.query(query, params);
    return result;
};
const getDeleteUser = async (id) => {
    const result = await db_1.pool.query(`DELETE FROM users WHERE id=$1`, [id]);
    return result;
};
exports.userServices = {
    getUser,
    getUpdateUser,
    getDeleteUser,
};
//# sourceMappingURL=users.service.js.map