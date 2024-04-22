import express from "express";

import { getAllCharges, insertCharge } from "../../Controllers/charges.controllers/charges.Controllers.js";

const chargeRouter = express.Router();

chargeRouter.get('/charges', getAllCharges)
chargeRouter.post('/charges', insertCharge)

export default chargeRouter;