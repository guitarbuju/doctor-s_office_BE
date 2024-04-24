import express from "express";

import {  deleteOneCharge, getChargesForOneInvoice, insertChargeLoad } from "../../Controllers/charges.controllers/charges.Controllers.js";

const chargeRouter = express.Router();

chargeRouter.get('/charges/:id', getChargesForOneInvoice)
chargeRouter.post('/charges', insertChargeLoad)
chargeRouter.delete('/charges/:id', deleteOneCharge)

export default chargeRouter;