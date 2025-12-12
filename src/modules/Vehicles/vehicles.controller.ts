import { Request, Response } from "express";
import { vehicleServices } from "./vehicles.service";

const createVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.createVehicle(req.body);
    res.status(201).json({
      success: true,
      message: "vehchicle create successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// getVehicles all data
const getVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getVehicles();
    res.status(200).json({
      success: true,
      message: "vehicles Data retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// getSingle vehicles data
const getSingleVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getSingleVehicle(
      req.params.vehicleId!
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "vehicle not found" });
    }
    res.status(200).json({
      success: true,
      message: "vehicles single data fetch successfully",
      result: result.rows[0],
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to fetch vehicle" });
  }
};

// getUpdate vehicles data
const getUpdateVehicle = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const id = req.params.vehicleId!;
    const result = await vehicleServices.getUpdateVehicle(body, id);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(201).json({
      success: true,
      message: "Vehicles updated successfully",
      result: result.rows[0],
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

// delete vehicles
const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.deleteVehicle(req.params.vehicleId!);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Vechicle not found" });
    }

    res.status(201).json({
      success: true,
      message: "Vehicle deleted successfully",
      result: null,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete vehicle" });
  }
};

export const vehchicleControllers = {
  createVehicle,
  getVehicles,
  getSingleVehicle,
  getUpdateVehicle,
  deleteVehicle,
};
