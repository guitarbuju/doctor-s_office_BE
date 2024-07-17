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
    const response = await pool.query(
      "SELECT * FROM admissions where completed = true AND billed = false"
    );

    response.rowCount > 0
      ? res.status(200).json({ message: "Correct Query", data: response.rows })
      : res.status(404).json({ message: "No Data Found" });
  } catch (error) {
    res.status(500).json({ message: "error retrieving data" });
  }
};

export const getPendingAdmissionsByDr = async (req, res) => {
  const { contact_dni,completed } = req.query;
  console.log(contact_dni,completed);
  try {
    const response = await pool.query(
      `SELECT a.*, p.contact_dni
FROM admissions a
JOIN appointments ap ON a.appointment_id = ap.id
JOIN partnershipHub p ON ap.contact_dni = p.contact_dni
WHERE a.completed = $1 AND p.contact_dni = $2;
`,
      [completed,contact_dni]
    );

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

    const queryText = `INSERT INTO admissions (appointment_date, completed, appointment_id, doctor_full_name, patient_full_name, date_created, dni)
    SELECT appointment_date, 
       false AS completed, 
       a.id AS appointment_id, 
       title AS doctor_full_name, 
       CONCAT(p1.first_name, ' ', p1.last_name) AS patient_full_name, 
       CURRENT_TIMESTAMP AS date_created, 
       patient_dni
FROM appointments AS a
JOIN partnershipHub AS p ON a.contact_dni = p.contact_dni
JOIN patients AS p1 ON a.patient_dni = p1.dni
WHERE a.id = $1;
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
