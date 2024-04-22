import express from "express";
import { createAdmission, getAllAdmissions, getPendingAdmissions } from "../../Controllers/admission.controllers/admission.Controllers.js";

const admissionRouter = express.Router();

admissionRouter.get('/admissions', getAllAdmissions)
admissionRouter.get('/admissions/pending', getPendingAdmissions)
admissionRouter.post('/admissions/:id', createAdmission)

export default admissionRouter;