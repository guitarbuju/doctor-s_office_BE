import express from "express";
import { createService, getAllServices } from "../../Controllers/services.controllers/services.Controllers.js";


const serviceRouter = express.Router();

serviceRouter.get('/services', getAllServices)
serviceRouter.post('/services', createService)

export default serviceRouter;