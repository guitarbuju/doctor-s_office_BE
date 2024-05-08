import express from "express";

import { dataForPayment, paymentVoucherCreator } from "../../../Controllers/payments.controllers/creditCards/creditCard.Controllers.js";

const paymentRouter = express.Router();


paymentRouter.post('/payments/vouchers', paymentVoucherCreator);
paymentRouter.get('/payments/data/:dni', dataForPayment);


export default paymentRouter;