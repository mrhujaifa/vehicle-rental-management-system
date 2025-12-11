import express from "express";
import { authController } from "./auth.controller";
import { verifyToken } from "../../../middleware/auth";
import logger from "../../../middleware/longger";

const router = express.Router();

router.post("/", authController.loginUser);

// protect this route with verifyToken middleware
router.get("/me", logger, verifyToken, (req, res) => {
  return res.json({
    success: true,
    message: "Valid Token",
    user: (req as any).user,
  });
});

export const authRoutes: any = router;
