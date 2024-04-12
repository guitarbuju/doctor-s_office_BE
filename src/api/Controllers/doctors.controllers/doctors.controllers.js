import pool from "../../../DB/connection.js";

export const getAllDoctors = async (req,res)=>{
    const response = await pool.query("SELECT title AS full_name , contact_dni AS doctor_dni from PartnershipHub WHERE partner_type = 'isDoctor'");

  res.status(200).json({ message: "success", data: response.rows });
}