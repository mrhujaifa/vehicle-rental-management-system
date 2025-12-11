import express, { Router } from "express";
import { bookingsController } from "./booking.controller";
import { verifyToken } from "../../middleware/auth";
import logger from "../../middleware/longger";

const route = express.Router();

route.post("/", bookingsController.createBookings);
route.get("/", logger, verifyToken, bookingsController.getBookings);
route.put("/:bookingId", verifyToken, bookingsController.updateBookingStatus);

export const bookingsRoutes: any = route;
