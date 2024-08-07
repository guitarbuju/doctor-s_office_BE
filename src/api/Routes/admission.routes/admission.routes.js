import express from "express";
import { createAdmission, getAllAdmissions, getPendingAdmissions, getPendingAdmissionsByDr } from "../../Controllers/admission.controllers/admission.Controllers.js";

const admissionRouter = express.Router();

admissionRouter.get('/admissions', getAllAdmissions)
admissionRouter.get('/admissions/pending', getPendingAdmissions)
admissionRouter.get('/admissions/pending/:dni_and_status', getPendingAdmissionsByDr)
admissionRouter.post('/admissions/:id', createAdmission)

export default admissionRouter;