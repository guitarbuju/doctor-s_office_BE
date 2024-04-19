import pool from "../../../DB/connection.js";

export const getAllCollaborators = async (req,res)=>{
    const response = await pool.query("SELECT * from PartnershipHub ");

  res.status(200).json({ message: "success", data: response.rows });
};



export const createCollaborator = async (req, res) => {
    const { partner_type, title, domicile, phone, email, speciality, contact_first_name, contact_last_name, contact_dni, contact_phone, id } = req.body;
    console.log(req.body);
  
    try {
      await pool.query(
        "INSERT INTO PartnershipHub (partner_type, title, domicile, phone, email, speciality, contact_first_name, contact_last_name, contact_dni, contact_phone, id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11)", // Added comma between placeholders
        [partner_type, title, domicile, phone, email, speciality, contact_first_name, contact_last_name, contact_dni, contact_phone, id]
      );
  
      const newCollaborator = await pool.query(
        "SELECT * FROM PartnershipHub  ORDER BY  date_entered DESC LIMIT 1"
      );
  
      const response = {
        message: "Collaborator created successfully",
        status: "success",
        data: newCollaborator.rows,
      };
  
      res.status(200).json(response);
    } catch (error) {
      console.error("Error creating collaborator:", error);
      const response = {
        message: "Failed to create collaborator",
        status: "error",
        error: error.message, // Include the error message for debugging purposes
      };
      res.status(500).json(response);
    }
  };
  