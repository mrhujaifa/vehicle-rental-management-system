import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: "admin" | "customer";
        name?: string;
        phone?: string;
        [key: string]: any; // optional extra fields
      };
    }
  }
}
