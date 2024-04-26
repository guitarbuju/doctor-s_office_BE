import express from "express";
import { invoiceMaker } from "../../Controllers/invoices.controllers/invoices.Contollers.js";

const invoiceRouter = express.Router();


invoiceRouter.post('/invoices/:id', invoiceMaker);

export default invoiceRouter;