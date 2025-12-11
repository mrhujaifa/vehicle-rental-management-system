import { pool } from "../../config/db";

const getUser = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

type UserPayload = {
  name: string;
  phone: string;
  role: string;
};

const getUpdateUser = async (
  payload: UserPayload,
  id: string,
  isAdmin: boolean
) => {
  const { name, phone, role } = payload;
  let query = "";
  let params: any[] = [];
  // Admin can update name, phone, role
  if (isAdmin) {
    query =
      "UPDATE users SET name=$1, phone=$2, role=$3 WHERE id=$4 RETURNING *";
    params = [name, phone, role, id];
  }
  // Customer cannot update role
  else {
    query = "UPDATE users SET name=$1, phone=$2 WHERE id=$3 RETURNING *";
    params = [name, phone, id];
  }

  const result = await pool.query(query, params);
  return result;
};

const getDeleteUser = async (id: string) => {
  const result = await pool.query(`DELETE FROM users WHERE id=$1`, [id]);
  return result;
};

export const userServices = {
  getUser,
  getUpdateUser,
  getDeleteUser,
};
