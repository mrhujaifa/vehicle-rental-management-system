import bcrypt from "bcrypt";
import { pool } from "../../../config/db";

type TCreateUser = {
  name: string;
  role: "admin" | "customer";
  email: string;
  phone: string;
  password: string;
};

const createUser = async (payload: TCreateUser) => {
  const { name, role, email, phone, password } = payload;

  const hashedPass = await bcrypt.hash(password as string, 10);

  const result = await pool.query(
    `INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [name, email, hashedPass, phone, role]
  );

  return result.rows[0];
};

const getUser = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

export const userServices = {
  createUser,
  getUser,
};
