import express from "express";

import {  getChargesForOneInvoice, insertChargeLoad } from "../../Controllers/charges.controllers/charges.Controllers.js";

const chargeRouter = express.Router();

chargeRouter.get('/charges/:id', getChargesForOneInvoice)
chargeRouter.post('/charges', insertChargeLoad)

export default chargeRouter;