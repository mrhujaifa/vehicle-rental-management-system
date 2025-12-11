// src/users.controller.ts
import { Request, Response } from "express";
import { userServices } from "./users.service";
const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUser();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res
      .status(500)
      .json({ success: false, message: err.message, datails: err });
  }
};
const getUpdateUser = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const id = req.params.userId!;
    const loggedInUser = (req as any).user!;

    const isAdmin = loggedInUser.role === "admin";
    const result = await userServices.getUpdateUser(body, id, isAdmin);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      result: result.rows[0],
    });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getDeleteUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getDeleteUser(req.params.userId!);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "user not found" });
    }

    res.status(201).json({
      success: true,
      message: "users deleted successfully",
      result: null, 
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

export const userControllers = { getUpdateUser, getUsers, getDeleteUser };
