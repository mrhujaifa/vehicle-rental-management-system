import express from "express";
import { userControllers } from "./users.controller";
import logger from "../../middleware/longger";
import { isAdmin } from "../../middleware/isAdmin";
import { isCustomerUpdateAllowed } from "../../middleware/isCustomer";
import { verifyToken } from "../../middleware/auth";

const router = express.Router();

router.get("/", logger, isAdmin, userControllers.getUsers);
router.put(
  "/:userId",
  logger,
  verifyToken,
  isCustomerUpdateAllowed,
  userControllers.getUpdateUser
);

router.delete("/:userId", logger, isAdmin, userControllers.getDeleteUser);

export const userRoutes: any = router;
