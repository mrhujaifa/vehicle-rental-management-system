"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleServices = void 0;
const db_1 = require("../../config/db");
const createVehicle = async (payload) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status, } = payload;
    const result = await db_1.pool.query(`INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status)
     VALUES($1, $2, $3, $4, $5) RETURNING *`, [
        vehicle_name,
        type,
        registration_number,
        daily_rent_price,
        availability_status,
    ]);
    return result;
};
const getVehicles = async () => {
    const result = await db_1.pool.query(`SELECT * FROM vehicles`);
    return result.rows;
};
const getSingleVehicle = async (id) => {
    const result = await db_1.pool.query("SELECT * FROM vehicles WHERE id = $1", [id]);
    return result;
};
const getUpdateVehicle = async (payload, id) => {
    const { vehicle_name, type, daily_rent_price } = payload;
    const result = await db_1.pool.query("UPDATE vehicles SET vehicle_name=$1, type=$2, daily_rent_price=$3 WHERE id=$4 RETURNING *", [vehicle_name, type, daily_rent_price, id]);
    return result;
};
const deleteVehicle = async (id) => {
    const result = await db_1.pool.query(`DELETE FROM vehicles WHERE id=$1`, [id]);
    return result;
};
exports.vehicleServices = {
    createVehicle,
    getVehicles,
    getSingleVehicle,
    getUpdateVehicle,
    deleteVehicle,
};
//# sourceMappingURL=vehicles.service.js.map