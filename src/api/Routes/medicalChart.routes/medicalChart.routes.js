import express from "express";
import { postMedicalChartData } from "../../Controllers/medicalChart.controllers/medicalChart.Controllers.js";

const medicalChartRouter = express.Router();

medicalChartRouter.get('/medicalcharts/:id' )
medicalChartRouter.post('/medicalcharts',postMedicalChartData )

export default medicalChartRouter;