import { Request, Response } from "express";
import { pool } from "../../config/db";

interface VehiclePayload {
  vehicle_name: string;
  type: string;
  registration_number: string;
  daily_rent_price: number;
  availability_status: string;
}

const createVehicle = async (payload: VehiclePayload) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  const result = await pool.query(
    `INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status)
     VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );

  return result.rows[0];
};

const getVehicles = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`);
  return result.rows;
};

const getSingleVehicle = async (id: string) => {
  const result = await pool.query("SELECT * FROM vehicles WHERE id = $1", [id]);
  return result;
};

interface VehiclePayload {
  vehicle_name: string;
  type: string;
  daily_rent_price: number;
}

const getUpdateVehicle = async (payload: VehiclePayload, id: string) => {
  const { vehicle_name, type, daily_rent_price } = payload;

  const result = await pool.query(
    "UPDATE vehicles SET vehicle_name=$1, type=$2, daily_rent_price=$3 WHERE id=$4 RETURNING *",
    [vehicle_name, type, daily_rent_price, id]
  );
  return result;
};
const deleteVehicle = async (id: string) => {
  const result = await pool.query(`DELETE FROM vehicles WHERE id=$1`, [id]);
  return result;
};

export const vehicleServices = {
  createVehicle,
  getVehicles,
  getSingleVehicle,
  getUpdateVehicle,
  deleteVehicle,
};
