import express from "express";
import { createAdmission, getAllAdmissions } from "../../Controllers/admission.controllers/admission.Controllers.js";

const admissionRouter = express.Router();

admissionRouter.get('/admissions', getAllAdmissions)
admissionRouter.post('/admissions/:id', createAdmission)

export default admissionRouter;