import express from "express";
import { InvoiceList, anullInvoice, invoiceMaker } from "../../Controllers/invoices.controllers/invoices.Contollers.js";

const invoiceRouter = express.Router();


invoiceRouter.post('/invoices/:id', invoiceMaker);
invoiceRouter.get('/invoices/:status', InvoiceList);
invoiceRouter.post('/invoices/annull/:invoice_id', anullInvoice);

export default invoiceRouter;