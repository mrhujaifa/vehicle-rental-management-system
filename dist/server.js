"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const db_1 = require("./config/db");
const users_route_1 = require("./modules/auth/signUp/users.route");
const auth_routes_1 = require("./modules/auth/signIn/auth.routes");
const vehicles_route_1 = require("./modules/Vehicles/vehicles.route");
const users_route_2 = require("./modules/users/users.route");
const booking_route_1 = require("./modules/Bookings/booking.route");
const app = (0, express_1.default)();
const port = config_1.default.port;
app.use(express_1.default.json());
// init DataBase
(0, db_1.initDB)();
app.get("/", (req, res) => {
    res.send("Hello World!");
});
// signUp users route
app.use("/api/v1/auth/signup", users_route_1.userRoutes);
// signIn users route
app.use("/api/v1/auth/signin", auth_routes_1.authRoutes);
// users route
app.use("/api/v1/users", users_route_2.userRoutes);
// vehchicles route
app.use("/api/v1/vehicles", vehicles_route_1.vehicleRoutes);
// bookings route
app.use("/api/v1/bookings", booking_route_1.bookingsRoutes);
app.use((req, res) => {
    res.status(404).json({
        message: "Route Not found 404!",
        path: req.path,
    });
});
app.listen(port, () => {
    console.log("🖥️  => : server is running port 3000");
});
//# sourceMappingURL=server.js.map