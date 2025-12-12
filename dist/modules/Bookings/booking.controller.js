"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingsController = exports.updateBookingStatus = exports.createBookings = void 0;
const booking_service_1 = require("./booking.service");
const createBookings = async (req, res) => {
    try {
        const data = req.body;
        const result = await booking_service_1.bookingsServices.createBookings(data);
        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: result,
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: error.message || "Failed to create booking",
        });
    }
};
exports.createBookings = createBookings;
const getBookings = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated",
            });
        }
        const bookings = await booking_service_1.bookingsServices.getBookings(user);
        return res.status(200).json({
            success: true,
            message: "Bookings retrieved successfully",
            data: bookings,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message || "Failed to retrieve bookings",
        });
    }
};
const updateBookingStatus = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res
                .status(401)
                .json({ success: false, message: "User not found" });
        }
        const bookingId = req.params.bookingId;
        if (!bookingId) {
            return res
                .status(400)
                .json({ success: false, message: "Booking ID is required" });
        }
        const result = await booking_service_1.bookingsServices.getBookingsUpdate({
            bookingId,
            user,
        });
        return res.status(200).json({
            success: true,
            message: result?.message,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            message: error.message || "Failed to update booking status",
        });
    }
};
exports.updateBookingStatus = updateBookingStatus;
exports.bookingsController = {
    createBookings: exports.createBookings,
    getBookings,
    updateBookingStatus: exports.updateBookingStatus,
};
//# sourceMappingURL=booking.controller.js.map