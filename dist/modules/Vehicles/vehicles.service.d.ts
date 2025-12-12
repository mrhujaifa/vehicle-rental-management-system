interface VehiclePayload {
    vehicle_name: string;
    type: string;
    registration_number: string;
    daily_rent_price: number;
    availability_status: string;
}
interface VehiclePayload {
    vehicle_name: string;
    type: string;
    daily_rent_price: number;
}
export declare const vehicleServices: {
    createVehicle: (payload: VehiclePayload) => Promise<import("pg").QueryResult<any>>;
    getVehicles: () => Promise<any[]>;
    getSingleVehicle: (id: string) => Promise<import("pg").QueryResult<any>>;
    getUpdateVehicle: (payload: VehiclePayload, id: string) => Promise<import("pg").QueryResult<any>>;
    deleteVehicle: (id: string) => Promise<import("pg").QueryResult<any>>;
};
export {};
//# sourceMappingURL=vehicles.service.d.ts.map