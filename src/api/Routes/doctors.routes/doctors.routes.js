import express from "express";
import { createDoctor, getAllDoctors } from '../../Controllers/doctors.controllers/doctors.controllers.js';
 
const doctorsRouter =express.Router();

doctorsRouter.get('/doctors',getAllDoctors);
doctorsRouter.post('/doctors',createDoctor);


export default doctorsRouter;