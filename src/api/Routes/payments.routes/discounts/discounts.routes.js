import express from "express";
import { dataForDiscount, discountVoucherCreator } from "../../../Controllers/payments.controllers/discounts/discounts.Controllers.js";

const discountRouter = express.Router();


discountRouter.post('/discounts/vouchers', discountVoucherCreator);
discountRouter.get('/discounts/data/:dni', dataForDiscount);


export default discountRouter;