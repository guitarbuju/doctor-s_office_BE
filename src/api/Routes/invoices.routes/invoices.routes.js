import express from "express";
import { InvoiceList, invoiceMaker } from "../../Controllers/invoices.controllers/invoices.Contollers.js";

const invoiceRouter = express.Router();


invoiceRouter.post('/invoices/:id', invoiceMaker);
invoiceRouter.get('/invoices/:status', InvoiceList);

export default invoiceRouter;