import express from "express";
import { getAllMedicines } from "../../Controllers/medicines.controllers/medicines.Controllers.js";

const medicinesRouter = express.Router();



medicinesRouter.get('/medicines', getAllMedicines);


export default medicinesRouter;