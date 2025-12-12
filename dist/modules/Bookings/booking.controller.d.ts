import { Request, Response } from "express";
export declare const createBookings: (req: Request, res: Response) => Promise<void>;
export declare const updateBookingStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const bookingsController: {
    createBookings: (req: Request, res: Response) => Promise<void>;
    getBookings: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateBookingStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
//# sourceMappingURL=booking.controller.d.ts.map