import express from "express";

import { dataForPayment, dataForPaymentByInvoice, paymentVoucherCreator } from "../../../Controllers/payments.controllers/creditCards/creditCard.Controllers.js";

const paymentRouter = express.Router();


paymentRouter.post('/payments/vouchers', paymentVoucherCreator);
paymentRouter.get('/payments/data/:dni', dataForPayment);
paymentRouter.get('/payments/direct/:invoice_id', dataForPaymentByInvoice);


export default paymentRouter;