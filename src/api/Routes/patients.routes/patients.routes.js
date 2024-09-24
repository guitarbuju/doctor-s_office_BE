import express from "express";

const patientsRouter = express.Router();

import {
  getAllPatients,
  createPatient,
  getPatientByDni,
  deletePatientByDni,
  updatePatientById
} from "../../Controllers/patients.controllers/patients.Controllers.js";

router.get("/patients", getAllPatients);
router.post("/patients", createPatient);
router.get("/patients/:dni", getPatientByDni);
router.delete("/patients/delete/:dni", deletePatientByDni);
router.put("/patients/update/:dni", updatePatientById)

export default patientsRouter;
