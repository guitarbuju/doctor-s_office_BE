import express from "express";

import {  deleteOneCharge, getChargesForOneInvoice, insertCharge } from "../../Controllers/charges.controllers/charges.Controllers.js";

const chargeRouter = express.Router();

chargeRouter.get('/charges/:id', getChargesForOneInvoice)
chargeRouter.post('/charges', insertCharge)
chargeRouter.delete('/charges/:id', deleteOneCharge)

export default chargeRouter;