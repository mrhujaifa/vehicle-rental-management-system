import { Request, Response } from "express";
export declare const vehchicleControllers: {
    createVehicle: (req: Request, res: Response) => Promise<void>;
    getVehicles: (req: Request, res: Response) => Promise<void>;
    getSingleVehicle: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getUpdateVehicle: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    deleteVehicle: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=vehicles.controller.d.ts.map