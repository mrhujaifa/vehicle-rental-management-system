"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCustomerUpdateAllowed = void 0;
const isCustomerUpdateAllowed = (req, res, next) => {
    const loggedInUser = req.user;
    const targetUserId = req.params.userId;
    if (!loggedInUser) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    // Admin can update everything
    if (loggedInUser.role === "admin") {
        return next();
    }
    // Customer can update only their own profile
    if (loggedInUser.role === "customer") {
        if (String(loggedInUser.id) !== targetUserId) {
            return res.status(403).json({
                error: "Customers can only update their own profile",
            });
        }
        // Customer cannot change role
        if ("role" in req.body) {
            return res.status(403).json({
                error: "Customers cannot change their role",
            });
        }
        return next();
    }
    return res.status(403).json({ error: "Access denied" });
};
exports.isCustomerUpdateAllowed = isCustomerUpdateAllowed;
//# sourceMappingURL=isCustomer.js.map