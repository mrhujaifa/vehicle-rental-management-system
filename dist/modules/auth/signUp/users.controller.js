"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const users_service_1 = require("./users.service");
const createUser = async (req, res) => {
    try {
        const user = await users_service_1.userServices.createUser(req.body);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
        });
    }
};
exports.userControllers = { createUser };
//# sourceMappingURL=users.controller.js.map