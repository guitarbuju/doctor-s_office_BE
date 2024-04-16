import pool from "../../../DB/connection.js";

export const getAllDoctors = async (req,res)=>{
    const response = await pool.query("SELECT title AS full_name , contact_dni AS doctor_dni from PartnershipHub WHERE partner_type = 'isDoctor'");

  res.status(200).json({ message: "success", data: response.rows });
};


export const createDoctor = async (req, res) => {
  const { partner_type, domicile, phone, email, speciality, contact_first_name, contact_last_name, contact_dni, contact_phone, id } = req.body;
  console.log(req.body);

  try {
    await pool.query(
      "INSERT INTO PartnershipHub (partner_type, domicile, phone, email, speciality, contact_first_name, contact_last_name, contact_dni, contact_phone, id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", // Added comma between placeholders
      [partner_type, domicile, phone, email, speciality, contact_first_name, contact_last_name, contact_dni, contact_phone, id]
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
