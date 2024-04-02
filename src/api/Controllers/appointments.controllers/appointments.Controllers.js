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

export const completeAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(
      "UPDATE appointments SET completed = CASE WHEN completed = true THEN false ELSE true END WHERE id = $1",
      [id]
    );
    res
      .status(200)
      .json({ message: "Appointment status updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating appointment status", error });
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
      error: error.message, // Include the error message for debugging purposes
    };
    res.status(500).json(response);
  }
};