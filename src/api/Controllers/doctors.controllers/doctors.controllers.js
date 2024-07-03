import pool from "../../../DB/connection.js";
import bcrypt from 'bcryptjs';


export const getAllDoctors = async (req,res)=>{
    const response = await pool.query("SELECT title AS full_name , contact_dni AS doctor_dni from PartnershipHub WHERE partner_type = 'isDoctor'");

  res.status(200).json({ message: "success", data: response.rows });
};


export const createDoctor = async (req, res) => {
  const { partner_type, domicile, phone, email, speciality, contact_first_name, contact_last_name, contact_phone, id, username, password } = req.body;
  console.log(req.body);

  try {
//Creater person to become a doctor  as user///
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.length >0) {res.status(400).json({message:"email already exists in DB"})}

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query('INSERT INTO users (username, email, password, id, partner_type) VALUES ($1, $2, $3,$4, $5)', [username, email, hashedPassword, id, partner_type]);

    //Creating User as a doctor
    await pool.query(
      "INSERT INTO PartnershipHub (partner_type, domicile, phone, email, speciality, contact_first_name, contact_last_name, contact_phone, id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)", // Added comma between placeholders
      [partner_type, domicile, phone, email, speciality, contact_first_name, contact_last_name, contact_phone, id]
    );

    const newDoctor = await pool.query(
      "SELECT * FROM PartnershipHub WHERE partner_type= 'isDoctor' ORDER BY  date_entered DESC LIMIT 1"
    );

    const response = {
      message: "Doctor created successfully",
      status: "success",
      data: newDoctor.rows,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error creating doctor:", error);
    const response = {
      message: "Failed to create doctor",
      status: "error",
      error: error.message, // Include the error message for debugging purposes
    };
    res.status(500).json(response);
  }
};
