import pool from "../../../DB/connection.js";

export const getAllDoctors = async (req,res)=>{
    const response = await pool.query("SELECT dni, first_name, last_name, CONCAT(first_name, ' ', last_name) AS full_name FROM doctors");

  res.status(200).json({ message: "success", data: response.rows });
}