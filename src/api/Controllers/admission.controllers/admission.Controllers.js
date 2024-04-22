import pool from "../../../DB/connection.js";

export const getAllAdmissions = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM admissions");

    response.rowCount > 0
      ? res.status(200).json({ message: "Correct Query", data: response.rows })
      : res.status(404).json({ message: "No Data Found" });
  } catch (error) {
    res.status(500).json({ message: "error retrieving data" });
  }
};
export const getPendingAdmissions = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM admissions where completed = false");

    response.rowCount > 0
      ? res.status(200).json({ message: "Correct Query", data: response.rows })
      : res.status(404).json({ message: "No Data Found" });
  } catch (error) {
    res.status(500).json({ message: "error retrieving data" });
  }
};

export const createAdmission = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("BEGIN");

    // Update the completed field in the appointments table
    await pool.query("UPDATE appointments SET completed = true WHERE id = $1", [
      id,
    ]);

    const queryText = `
    INSERT INTO admissions (appointment_date, completed, appointment_id, doctor_full_name, patient_full_name, date_created)
    SELECT appointment_date, false as completed, a.id AS appointment_id, title AS doctor_full_name, CONCAT(p1.first_name, ' ', p1.last_name) AS patient_full_name, CURRENT_TIMESTAMP AS date_created
    FROM appointments AS a
    JOIN partnershipHub AS p ON a.doctor_dni = p.contact_dni
    JOIN patients AS p1 ON a.patient_dni = p1.dni
    WHERE a.id = $1
        `;
    await pool.query(queryText, [id]);

    await pool.query("COMMIT");

    res
      .status(200)
      .json({ message: "Admission created successfully.", status: "admitted" });
  } catch (error) {
    // Rollback the transaction if an error occurs
    // await pool.query("ROLLBACK");
    console.error(error);
    res.status(500).json({ message: "Error creating admission." });
  }
};
