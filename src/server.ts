import express, { NextFunction, Request, Response } from "express";
import config from "./config";
import { initDB } from "./config/db";
import { userRoutes as signUpRoute } from "./modules/auth/signUp/users.route";
import { authRoutes } from "./modules/auth/signIn/auth.routes";
import { vehicleRoutes } from "./modules/Vehicles/vehicles.route";
import { userRoutes } from "./modules/users/users.route";
import { bookingsRoutes } from "./modules/Bookings/booking.route";

const app = express();
const port = config.port;
app.use(express.json());

// init DataBase
initDB();
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// signUp users route
app.use("/api/v1/auth/signup", signUpRoute);

// signIn users route
app.use("/api/v1/auth/signin", authRoutes);

// users route
app.use("/api/v1/users", userRoutes);

// vehchicles route
app.use("/api/v1/vehicles", vehicleRoutes);

// bookings route
app.use("/api/v1/bookings", bookingsRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: "Route Not found 404!",
    path: req.path,
  });
});

app.listen(port, () => {
  console.log("🖥️  => : server is running port 3000");
});
