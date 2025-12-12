"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const users_service_1 = require("./users.service");
const getUsers = async (req, res) => {
    try {
        const result = await users_service_1.userServices.getUser();
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result.rows,
        });
    }
    catch (err) {
        res
            .status(500)
            .json({ success: false, message: err.message, datails: err });
    }
};
const getUpdateUser = async (req, res) => {
    try {
        const body = req.body;
        const id = req.params.userId;
        const loggedInUser = req.user;
        const isAdmin = loggedInUser.role === "admin";
        const result = await users_service_1.userServices.getUpdateUser(body, id, isAdmin);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            result: result.rows[0],
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};
const getDeleteUser = async (req, res) => {
    try {
        const result = await users_service_1.userServices.getDeleteUser(req.params.userId);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "user not found" });
        }
        res.status(201).json({
            success: true,
            message: "users deleted successfully",
            result: null,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete user" });
    }
};
exports.userControllers = { getUpdateUser, getUsers, getDeleteUser };
//# sourceMappingURL=users.controller.js.map