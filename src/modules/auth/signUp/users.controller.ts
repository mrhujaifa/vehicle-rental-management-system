import { Request, Response } from "express";
import { userServices } from "./users.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userServices.createUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error: any) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const userControllers = { createUser };
