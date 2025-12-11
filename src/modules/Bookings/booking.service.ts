import { pool } from "../../config/db";

interface User {
  id: string; // from JWT token payload
  role: "admin" | "customer" | string;
}

const createBookings = async (payload: any) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const start = new Date(rent_start_date);
  const end = new Date(rent_end_date);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error("Invalid date(s) provided");
  }
  if (end < start) {
    throw new Error("rent_end_date must be the same or after rent_start_date");
  }

  const msPerDay = 1000 * 60 * 60 * 24;
  const days = Math.ceil((end.getTime() - start.getTime()) / msPerDay) + 1;

  try {
    const vRes = await pool.query(
      "SELECT daily_rent_price, availability_status FROM vehicles WHERE id = $1 FOR UPDATE",
      [vehicle_id]
    );
    if (vRes.rows.length === 0) {
      throw new Error("Vehicle not found");
    }
    const vehicle = vRes.rows[0];

    if (vehicle.availability_status === "booked") {
      throw new Error("Vehicle currently not available");
    }

    const overlapQuery = `
      SELECT 1 FROM bookings
      WHERE vehicle_id = $1
        AND status = 'active'
        AND ($2::timestamptz <= rent_end_date::timestamptz)
        AND ($3::timestamptz >= rent_start_date::timestamptz)
      LIMIT 1
    `;
    const overlapRes = await pool.query(overlapQuery, [
      vehicle_id,
      rent_end_date,
      rent_start_date,
    ]);
    if (overlapRes.rows.length > 0) {
      throw new Error("Vehicle already booked for the selected dates");
    }

    const total_price = Number(vehicle.daily_rent_price) * days;

    const insertQuery = `
      INSERT INTO bookings
      (customer_id, vehicle_id, total_price, rent_start_date, rent_end_date, status)
      VALUES ($1, $2, $3, $4, $5, 'active')
      RETURNING *
    `;
    const insertRes = await pool.query(insertQuery, [
      customer_id,
      vehicle_id,
      total_price,
      rent_start_date,
      rent_end_date,
    ]);

    await pool.query(
      "UPDATE vehicles SET availability_status = 'booked' WHERE id = $1",
      [vehicle_id]
    );

    await pool.query("COMMIT");
    return insertRes.rows[0];
  } catch (err) {
    await pool.query("ROLLBACK");
    throw err;
  }
};

const getBookings = async (user: User) => {
  let query = "SELECT * FROM bookings";
  const params: any[] = [];

  if (user.role === "customer") {
    query += " WHERE customer_id = $1";
    params.push(user.id);
  }

  const result = await pool.query(query, params);
  return result.rows;
};

interface User {
  id: string;
  role: "admin" | "customer" | string;
}
interface UpdateBookingsStatusPayload {
  bookingId: string;
  user: User;
}

const getBookingsUpdate = async ({
  bookingId,
  user,
}: UpdateBookingsStatusPayload) => {
  try {
    const res = await pool.query(
      `SELECT b.*, v.availability_status FROM bookings b
       JOIN vehicles v ON b.vehicle_id = v.id
       WHERE b.id = $1`,
      [bookingId]
    );

    if (res.rows.length === 0) {
      throw new Error("Booking not found");
    }

    const booking = res.rows[0];
    const now = new Date();

    if (user.role === "customer") {
      if (booking.customer_id !== user.id) {
        throw new Error("Unauthorized: You can only cancel your own bookings");
      }

      if (now >= new Date(booking.rent_start_date)) {
        throw new Error(
          "Cancellation period has expired. Rental period has already started"
        );
      }

      await pool.query(
        `UPDATE bookings SET status = 'cancelled' WHERE id = $1`,
        [bookingId]
      );

      await pool.query(
        `UPDATE vehicles SET availability_status = 'available' WHERE id = $1`,
        [booking.vehicle_id]
      );

      return { message: "Booking cancelled successfully" };
    }

    if (user.role === "admin") {
      if (booking.status !== "active") {
        throw new Error("Only active bookings can be marked as returned");
      }

      await pool.query(
        `UPDATE bookings SET status = 'returned' WHERE id = $1`,
        [bookingId]
      );

      await pool.query(
        `UPDATE vehicles SET availability_status = 'available' WHERE id = $1`,
        [booking.vehicle_id]
      );

      return { message: "Booking marked as returned successfully" };
    }

    throw new Error("Unauthorized role");
  } catch (error: any) {
    // You may want to log the error here
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const bookingsServices = {
  createBookings,
  getBookings,
  getBookingsUpdate,
};
