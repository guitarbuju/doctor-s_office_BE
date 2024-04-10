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
    const response = await pool.query(
      "SELECT appointment_date,completed, a.id AS appointment_id, CONCAT(d.first_name, ' ', d.last_name) AS doctor_full_name,CONCAT(p.first_name, ' ', p.last_name) AS patient_full_name FROM  appointments AS a JOIN doctors AS d ON a.doctor_dni = d.dni JOIN patients AS p ON a.patient_dni = p.dni  WHERE appointment_date >=$1 AND appointment_date <=$2 ORDER BY appointment_date DESC",
      [fromDate, toDate]
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
    const response = await pool.query(
      "SELECT appointment_date,completed, a.id AS appointment_id, CONCAT(d.first_name, ' ', d.last_name) AS doctor_full_name,CONCAT(p.first_name, ' ', p.last_name) AS patient_full_name FROM  appointments AS a JOIN doctors AS d ON a.doctor_dni = d.dni JOIN patients AS p ON a.patient_dni = p.dni WHERE patient_dni = $1 ORDER BY appointment_date DESC ",
      [dni]
    );
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

  console.log(appointmentData);

  try {
    await pool.query(
      "INSERT INTO appointments (date_created,patient_dni,doctor_dni,appointment_date,completed ) VALUES (CURRENT_TIMESTAMP,$1, $2, $3, $4)",
      [
        appointmentData.patient_dni,
        appointmentData.doctor_dni,
        appointmentData.appointment_date,
        appointmentData.completed,
      ]
    );

    const lastRecord = await pool.query(
      "SELECT  a.id AS appointment_id, d.first_name AS doctor_first_name, d.last_name AS doctor_last_name, p.first_name AS patient_first_name, p.last_name AS patient_last_name FROM appointments AS a JOIN doctors AS d ON a.doctor_dni = d.dni JOIN patients AS p ON a.patient_dni = p.dni ORDER BY a.date_created DESC LIMIT 1"
    );

    const response = {
      message: `Appointment Id:${lastRecord.rows[0].appointment_id} created for Patient 
      ${lastRecord.rows[0].patient_first_name} ${lastRecord.rows[0].patient_last_name}
      with Doctor ${lastRecord.rows[0].doctor_first_name} ${lastRecord.rows[0].doctor_last_name}
      created successfully`,
      status: "success",
      data: lastRecord.rows,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error creating patient:", error);
    const response = {
      message: "Failed to create patient",
      status: "error",
      error: error.message,
    };
    res.status(500).json(response);
  }
};
