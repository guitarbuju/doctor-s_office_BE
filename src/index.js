import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./api/Routes/patients.routes/patients.Routes.js";
import pool from "./DB/connection.js";
import appointmentsRouter from "./api/Routes/appointments.routes/appointments.routes.js";
import  doctorsRouter  from "./api/Routes/doctors.routes/doctors.routes.js";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(appointmentsRouter);
app.use(doctorsRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // Log connection successful here
  pool.connect((err, client, release) => {
    if (err) {
      return console.error("Error acquiring client", err.stack);
    }
    console.log("PostgreSQL DB Connection successful");
    release(); // Release the client back to the pool
  });
});
