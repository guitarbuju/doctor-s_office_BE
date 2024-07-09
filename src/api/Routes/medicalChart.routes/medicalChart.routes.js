import express from "express";

const medicalChartRouter = express.Router();

medicalChartRouter.get('/medicalCharts/:id' )
medicalChartRouter.post('/medicalCharts/:id' )

export default medicalChartRouter;