"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehchicleControllers = void 0;
const vehicles_service_1 = require("./vehicles.service");
const createVehicle = async (req, res) => {
    try {
        const result = await vehicles_service_1.vehicleServices.createVehicle(req.body);
        res.status(201).json({
            success: true,
            message: "vehchicle create successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// getVehicles all data
const getVehicles = async (req, res) => {
    try {
        const result = await vehicles_service_1.vehicleServices.getVehicles();
        res.status(200).json({
            success: true,
            message: "vehicles Data retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
// getSingle vehicles data
const getSingleVehicle = async (req, res) => {
    try {
        const result = await vehicles_service_1.vehicleServices.getSingleVehicle(req.params.vehicleId);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "vehicle not found" });
        }
        res.status(200).json({
            success: true,
            message: "vehicles single data fetch successfully",
            result: result.rows[0],
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Failed to fetch vehicle" });
    }
};
// getUpdate vehicles data
const getUpdateVehicle = async (req, res) => {
    try {
        const body = req.body;
        const id = req.params.vehicleId;
        const result = await vehicles_service_1.vehicleServices.getUpdateVehicle(body, id);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.status(201).json({
            success: true,
            message: "Vehicles updated successfully",
            result: result.rows[0],
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: "something went wrong",
        });
    }
};
// delete vehicles
const deleteVehicle = async (req, res) => {
    try {
        const result = await vehicles_service_1.vehicleServices.deleteVehicle(req.params.vehicleId);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Vechicle not found" });
        }
        res.status(201).json({
            success: true,
            message: "Vehicle deleted successfully",
            result: null,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete vehicle" });
    }
};
exports.vehchicleControllers = {
    createVehicle,
    getVehicles,
    getSingleVehicle,
    getUpdateVehicle,
    deleteVehicle,
};
//# sourceMappingURL=vehicles.controller.js.map