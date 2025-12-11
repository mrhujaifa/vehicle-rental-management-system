

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../../../config/db";
import config from "../../../config";


type TLoginUser = {
  email: string;
  password: string;
};

type DBUser = {
  id: number;
  email: string;
  password?: string;
  name?: string;
  role?: string | null;
};

const loginUser = async (payload: TLoginUser) => {
  const { email, password } = payload;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  if (result.rows.length === 0) {
    return null; // user not found
  }

  const user: DBUser = result.rows[0];

  if (!user.password) {
    return false;
  }

  // Compare password
  const matchPass = await bcrypt.compare(password, user.password);
  if (!matchPass) {
    return false;
  }

  // JWT Secret from config
  const secret = config.jwt_Key;
  if (!secret) {
    throw new Error("JWT secret is not defined in environment variables");
  }

  // Minimal token payload
  const payloadForToken = {
    id: user.id,
    email: user.email,
    role: user.role ?? null,
  };

  const token = jwt.sign(payloadForToken, secret, { expiresIn: "7d" });

  const { password: _pw, ...safeUser } = user as any;

  return { token, user: safeUser };
};

export const authSevices = {
  loginUser,
};
