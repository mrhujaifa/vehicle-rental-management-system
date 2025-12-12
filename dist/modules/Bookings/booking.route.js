"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("./booking.controller");
const auth_1 = require("../../middleware/auth");
const longger_1 = __importDefault(require("../../middleware/longger"));
const route = express_1.default.Router();
route.post("/", booking_controller_1.bookingsController.createBookings);
route.get("/", longger_1.default, auth_1.verifyToken, booking_controller_1.bookingsController.getBookings);
route.put("/:bookingId", auth_1.verifyToken, booking_controller_1.bookingsController.updateBookingStatus);
exports.bookingsRoutes = route;
//# sourceMappingURL=booking.route.js.map