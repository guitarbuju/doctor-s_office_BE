import express from "express";
import { completeAppointment, createAppointment, getAllApointments, getAppointmentsByDateRange, getAppointmentsByPatient } from "../../Controllers/appointments.controllers/appointments.Controllers.js";

const appointmentsRouter = express.Router();

appointmentsRouter.get('/appointments',getAllApointments);
appointmentsRouter.post('/appointments',createAppointment);
appointmentsRouter.post('/appointments/list',getAppointmentsByDateRange);
appointmentsRouter.put('/appointments/complete/:id', completeAppointment)
appointmentsRouter.get('/appointments/patients/:dni', getAppointmentsByPatient)

export default appointmentsRouter;