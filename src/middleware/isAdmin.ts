import { Request, Response, NextFunction } from "express";
import config from "../config";
import jwt from "jsonwebtoken";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Authorization token required",
    });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token missing",
    });
  }

  try {
    const decoded: any = jwt.verify(token, config.jwt_Key);

    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only",
      });
    }

    (req as any).user = decoded;
    next();
  } catch (error: any) {
    console.log(error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};
