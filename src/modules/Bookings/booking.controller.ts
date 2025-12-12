import { Request, Response } from "express";
import { bookingsServices } from "./booking.service";

export const createBookings = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await bookingsServices.createBookings(data);
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create booking",
    });
  }
};

const getBookings = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const bookings = await bookingsServices.getBookings(user);

    return res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: bookings,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to retrieve bookings",
    });
  }
};

export const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
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

    const result = await bookingsServices.getBookingsUpdate({
      bookingId,
      user,
    });

    return res.status(200).json({
      success: true,
      message: result?.message,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update booking status",
    });
  }
};
export const bookingsController = {
  createBookings,
  getBookings,
  updateBookingStatus,
};
