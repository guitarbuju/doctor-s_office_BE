import express from "express";
import { completeAppointment, createAppointment, getAllApointments, getAppointmentsByDateRange } from "../../Controllers/appointments.controllers/appointments.Controllers.js";

const appointmentsRouter = express.Router();

appointmentsRouter.get('/appointments',getAllApointments);
appointmentsRouter.post('/appointments',createAppointment);
appointmentsRouter.post('/appointments/list',getAppointmentsByDateRange);
appointmentsRouter.put('/appointments/complete/:id', completeAppointment)

export default appointmentsRouter;