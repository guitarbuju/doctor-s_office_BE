import pool from "../../../DB/connection.js";

export const getAllApointments = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM appointments");

    response.rowCount > 0
      ? res.status(200).json({ message: "Correct Query", data: response.rows })
      : res.status(404).json({ message: "No Data Found" });
  } catch (error) {
    res.status(500).json({ message: "error retrieving data" });
  }
};

export const getAppointmentsByDateRange = async (req, res) => {
  const { fromDate, toDate } = req.body;

  try {
    const response = await pool.query("SELECT appointment_date,completed,a.id AS appointment_id,a.patient_dni ,CONCAT( p.contact_first_name, ' ', p.contact_last_name) AS doctor_full_name, CONCAT(p1.first_name, ' ', p1.last_name) AS patient_full_name FROM  appointments AS a JOIN partnershiphub AS p ON a.contact_dni = p.contact_dni JOIN patients AS p1 ON a.patient_dni = p1.dni  WHERE appointment_date >= $1 AND appointment_date <= $2 ORDER BY appointment_date DESC"

     ,[fromDate, toDate]
    );

    response.rowCount > 0
      ? res.status(200).json({ message: "Correct Query", data: response.rows })
      : res.status(404).json({ message: "No Data Found" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving data" });
  }
};

export const getAppointmentsByPatient = async (req, res) => {
  const { dni } = req.params;

  try {
    const response = await pool.query( "SELECT appointment_date,completed,a.id AS appointment_id,p.title AS doctor_full_name,CONCAT(p1.first_name, ' ', p1.last_name) AS patient_full_name FROM   appointments AS a JOIN partnershiphub AS p ON a.doctor_dni = p.contact_dni JOIN patients AS p1 ON a.patient_dni = p1.dni WHERE patient_dni = $1 ORDER BY appointment_date DESC",[dni]);
    response.rowCount > 0
      ? res.status(200).json({ message: "Correct Query", data: response.rows })
      : res.status(404).json({ message: "No Data Found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving data" });
  }
};

export const completeAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(
      "UPDATE appointments SET completed = CASE WHEN completed = false THEN true END WHERE id = $1",
      [id]
    );
    res
      .status(200)
      .json({ message: "Appointment status updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error updating appointment status",
        error,
        status: "anulled",
      });
  }
};

export const createAppointment = async (req, res) => {
  const appointmentData = req.body;

  console.log("Received appointment data:", appointmentData);

  try {
    // Inserta la cita y retorna el ID
    const insertResult = await pool.query(
      "INSERT INTO appointments (date_created, patient_dni, contact_dni, appointment_date, completed) VALUES (CURRENT_TIMESTAMP, $1, $2, $3, $4) RETURNING id",
      [
        appointmentData.patient_dni,
        appointmentData.contact_dni,
        appointmentData.appointment_date,
        appointmentData.completed,
      ]
    );

    const appointmentId = insertResult.rows[0].id;
    console.log("Inserted appointment with ID:", appointmentId);

   
    const lastRecord = await pool.query(
      `SELECT a.id AS appointment_id, 
              CONCAT( p.contact_first_name, ' ', p.contact_last_name) AS doctor_full_name, 
              CONCAT(p1.first_name, ' ', p1.last_name) AS patient_full_name 
         FROM appointments AS a 
         JOIN partnershiphub AS p ON a.contact_dni = p.contact_dni 
         JOIN patients AS p1 ON a.patient_dni = p1.dni 
         WHERE a.id = $1`,
      [appointmentId]
    );

    if (lastRecord.rows.length === 0) {
      throw new Error("No records found for the inserted appointment");
    }

    const response = {
      // message: `Appointment Id: ${lastRecord.rows[0].appointment_id} created for Patient ${lastRecord.rows[0].patient_full_name} with Doctor ${lastRecord.rows[0].doctor_full_name} created successfully`,
      status: "success",
      data: lastRecord.rows,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error creating appointment:", error);
    const response = {
      message: "Failed to create appointment",
      status: "error",
      error: error.message,
    };
    res.status(500).json(response);
  }
};
