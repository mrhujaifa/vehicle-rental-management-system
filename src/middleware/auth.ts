// src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .json({ success: false, message: "Authorization header missing" });
  }

  const parts = authHeader.split(" ");

  const token = parts[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "Token missing" });
  }

  const secret = config.jwt_Key;
  if (!secret) {
    return res
      .status(500)
      .json({ success: false, message: "Server configuration error" });
  }

  try {
    const decoded = jwt.verify(token, config.jwt_Key) as { id: string; role: string; name?: string };
    (req as any).user = decoded as any;
    next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired" });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    return res
      .status(401)
      .json({ success: false, message: "Token verification failed" });
  }
};  
