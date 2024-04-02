import express from "express";
import { completeAppointment, createAppointment, getAllApointments } from "../../Controllers/appointments.controllers/appointments.Controllers.js";

const appointmentsRouter = express.Router();

appointmentsRouter.get('/appointments',getAllApointments);
appointmentsRouter.post('/appointments',createAppointment);
appointmentsRouter.put('/appointments/complete/:id', completeAppointment)

export default appointmentsRouter;