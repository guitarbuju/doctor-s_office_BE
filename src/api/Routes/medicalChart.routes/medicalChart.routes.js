import express from "express";
import {
  deleteRecipeLineById,
  getAllRecipeLinesByAdmission,
  getChartAndRecipeByAdmission,
  postMedicalChartData,
  postRecipeData,
} from "../../Controllers/medicalChart.controllers/medicalChart.Controllers.js";

const medicalChartRouter = express.Router();

medicalChartRouter.get("/medicalcharts/:id");
medicalChartRouter.get(
  "/medicalcharts/recipe/:id",
  getChartAndRecipeByAdmission
);
medicalChartRouter.post("/medicalcharts", postMedicalChartData);
medicalChartRouter.post("/medicalcharts/recipe", postRecipeData);
medicalChartRouter.get(
  "/medicalcharts/getrecipe/:id",
  getAllRecipeLinesByAdmission
);
medicalChartRouter.delete(
  "/medicalcharts/deleterecipe/:id",
  deleteRecipeLineById
);

export default medicalChartRouter;
