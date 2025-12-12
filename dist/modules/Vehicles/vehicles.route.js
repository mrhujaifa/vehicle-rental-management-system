"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleRoutes = void 0;
const express_1 = __importDefault(require("express"));
const vehicles_controller_1 = require("./vehicles.controller");
const longger_1 = __importDefault(require("../../middleware/longger"));
const isAdmin_1 = require("../../middleware/isAdmin");
const route = express_1.default.Router();
route.post("/", longger_1.default, isAdmin_1.isAdmin, vehicles_controller_1.vehchicleControllers.createVehicle);
route.get("/", longger_1.default, vehicles_controller_1.vehchicleControllers.getVehicles);
route.get("/:vehicleId", longger_1.default, vehicles_controller_1.vehchicleControllers.getSingleVehicle);
route.put("/:vehicleId", longger_1.default, isAdmin_1.isAdmin, vehicles_controller_1.vehchicleControllers.getUpdateVehicle);
route.delete("/:vehicleId", longger_1.default, isAdmin_1.isAdmin, vehicles_controller_1.vehchicleControllers.deleteVehicle);
exports.vehicleRoutes = route;
//# sourceMappingURL=vehicles.route.js.map