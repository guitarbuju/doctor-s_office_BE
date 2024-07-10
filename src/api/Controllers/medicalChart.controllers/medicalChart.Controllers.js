import pool from "../../../DB/connection.js";

export const postMedicalChartData = async (req, res) => {
  const { medical_entry, admission_id } = req.body;


  try {
    const postMedicalNote = await pool.query(
      `INSERT INTO medicalevents (date_created ,medical_entry ,admission_id)
            VALUES (CURRENT_TIMESTAMP, $1, $2)`,
      [medical_entry, admission_id]
    );

    const changeStatus = await pool.query(
        `UPDATE admissions SET completed = TRUE WHERE id = $1 `,[admission_id]
    )
    const sendBack = await pool.query(
      `SELECT * FROM medicalevents WHERE admission_id = $1`,
      [admission_id]
    );

    sendBack.rows.length >= 1
      ? res
          .status(200)
          .json({
            message: "Medical Note created succesfully",
            data: sendBack.rows,
          })
      : res.status(404).json({ message: "Couldn't create Medical Note" });
        }catch(error){
      if (error.code === '23505') { // Unique constraint violation
        res.status(400).json({
          message: "A Medical Note for this admission already exists.",
          error: error.detail,
        });
      } else {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
};
