import express from "express";


const patientsRouter = express.Router();

import {
  getAllPatients,
  createPatient,
  getPatientByDni,
  deletePatientByDni,
  updatePatientById
} from "../../Controllers/patients.controllers/patients.Controllers.js";




patientsRouter.get("/patients", getAllPatients);
patientsRouter.post("/patients", createPatient);
patientsRouter.get("/patients/:dni", getPatientByDni);
patientsRouter.delete("/patients/delete/:dni", deletePatientByDni);
patientsRouter.put("/patients/update/:dni", updatePatientById)

export default patientsRouter;
