import express from "express";
import { getAllDoctors } from '../../Controllers/doctors.controllers/doctors.controllers.js';
 
const doctorsRouter =express.Router();

doctorsRouter.get('/doctors',getAllDoctors);


export default doctorsRouter;