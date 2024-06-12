import express from "express";
import { InvoiceList, anullInvoice, getOneInvoice, invoiceMaker } from "../../Controllers/invoices.controllers/invoices.Contollers.js";

const invoiceRouter = express.Router();


invoiceRouter.post('/invoices/:id', invoiceMaker);
invoiceRouter.get('/invoices', InvoiceList);
invoiceRouter.get('/invoices/getOne/:invoice_id', getOneInvoice);
invoiceRouter.post('/invoices/annull/:invoice_id', anullInvoice);

export default invoiceRouter;