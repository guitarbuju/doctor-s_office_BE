import express from "express";
import {pool} from "../../../DB/connection.js"

const patientsRouter = express.Router();

import {
  getAllPatients,
  createPatient,
  getPatientByDni,
  deletePatientByDni,
  updatePatientById
} from "../../Controllers/patients.controllers/patients.Controllers.js";

const daPatients = async (req, res) => {
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


patientsRouter.get("/patients", daPatients);
patientsRouter.post("/patients", createPatient);
patientsRouter.get("/patients/:dni", getPatientByDni);
patientsRouter.delete("/patients/delete/:dni", deletePatientByDni);
patientsRouter.put("/patients/update/:dni", updatePatientById)

export default patientsRouter;
