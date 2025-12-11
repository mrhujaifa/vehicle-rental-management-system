import express from "express";
import { vehchicleControllers } from "./vehicles.controller";
import logger from "../../middleware/longger";
import { isAdmin } from "../../middleware/isAdmin";
const route = express.Router();

route.post("/", logger, isAdmin, vehchicleControllers.createVehicle);
route.get("/", logger, vehchicleControllers.getVehicles);
route.get("/:vehicleId", logger, vehchicleControllers.getSingleVehicle);
route.put("/:vehicleId", logger, isAdmin, vehchicleControllers.getUpdateVehicle);
route.delete("/:vehicleId", logger, isAdmin, vehchicleControllers.deleteVehicle);

export const vehicleRoutes: any = route;
