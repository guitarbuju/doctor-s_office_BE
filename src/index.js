import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import patientsRouter from "./api/Routes/patients.routes/patients.routes.js";
import pool from "./DB/connection.js";
import appointmentsRouter from "./api/Routes/appointments.routes/appointments.routes.js";
import  doctorsRouter  from "./api/Routes/doctors.routes/doctors.routes.js";
import admissionRouter from "./api/Routes/admission.routes/admission.routes.js";
import collaboratorRouter from "./api/Routes/collaborators.routes/collaborators.routes.js";
import serviceRouter from "./api/Routes/services.routes/services.routes.js";
import chargeRouter from "./api/Routes/charges.routes/charges.routes.js";
// import { invoiceMaker } from "./api/Controllers/invoices.controllers/invoices.Contollers.js";
import invoiceRouter from "./api/Routes/invoices.routes/invoices.routes.js";
import discountRouter from "./api/Routes/payments.routes/discounts/discounts.routes.js";
import paymentRouter from "./api/Routes/payments.routes/creditCards/creditCards.routes.js";
import authorizationRouter from "./api/Routes/auth.routes/authorization.routes.js";
import medicalChartRouter from "./api/Routes/medicalChart.routes/medicalChart.routes.js";
import medicinesRouter from "./api/Routes/medicine.routes/medicines.Routes.js";



const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(patientsRouter);
app.use(appointmentsRouter);
app.use(doctorsRouter);
app.use(admissionRouter);
app.use(collaboratorRouter);
app.use(serviceRouter);
app.use(chargeRouter);
app.use(invoiceRouter);
app.use(discountRouter);
app.use(paymentRouter);
app.use(authorizationRouter);
app.use(medicalChartRouter);
app.use(medicinesRouter);


//API deploy trial

app.get('/',(req,res)=>{
  res.send('Welcome to the Doctor’s Office API!');
});



const PORT = process.env.SERVERPORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  
//   pool.connect((err, client, release) => {
//     if (err) {
//       return console.error("Error acquiring client", err.stack);
//     }
//     console.log("PostgreSQL DB Connection successful");
//     release(); 
//   });
// });
