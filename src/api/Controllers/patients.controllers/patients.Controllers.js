
import pool from "../../../DB/connection.js";


export const getAllPatients = async (req, res) => {
  try {
    console.log("Fetching all patients...");
    const response = await pool.query("SELECT * FROM patients"); // Ensure the table name matches exactly
    console.log("Fetched patients:", response.rows);
    res.status(200).json({ message: "success", data: response.rows });
  } catch (err) {
    console.error("Error fetching patients:", err);
    res.status(500).json({ message: "Error fetching patients" });
  }
};

export const getPatientByDni = async (req, res) => {
  const dni = req.params.dni;
  try {
    const response = await pool.query("SELECT * FROM patients WHERE dni =$1", [
      dni,
    ]);

    response.rows.length > 0
      ? res.status(200).json({ message: "Patient Succesfully Found", data: response.rows })
      : res.status(400).json({ message: "Couldn`t find the patient in DB" });
  } catch (error) {
    res.status(500).json({ message: "error retrieving data" });
  }
};

export const deletePatientByDni = async (req, res) => {
  const dni = req.params.dni;
  try {
    const response = await pool.query("DELETE FROM patients WHERE dni =$1", [
      dni,
    ]);

    response.rowCount > 0
      ? res.status(200).json({ message: "data deleted succesfully"})
      : res.status(404).json({ message: "Couldn`t find the patient in DB" });
  } catch (error) {
    res.status(500).json({ message: "error retrieving data" });
  }
};

export const createPatient = async (req, res) => {
  const { first_name, last_name, email, zip_code, phone, birth_date, dni } =
    req.body;

  try {
    await pool.query(
      "INSERT INTO patients (first_name, last_name, email, zip_code, phone, birth_date,dni) VALUES ($1, $2, $3, $4, $5, $6,$7)",
      [first_name, last_name, email, zip_code, phone, birth_date, dni]
    );

    const newPatient = await pool.query(
      "SELECT * FROM patients ORDER BY id DESC LIMIT 1"
    );

    const response = {
      message: "Patient created successfully",
      status: "success",
      data: newPatient.rows,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error creating patient:", error);
    const response = {
      message: "Failed to create patient",
      status: "error",
      error: error.message, // Include the error message for debugging purposes
    };
    res.status(500).json(response);
  }
};

export const updatePatientById = async (req, res) => {
  const dni = req.params.dni; 
}