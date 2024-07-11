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
      `UPDATE admissions SET completed = TRUE WHERE id = $1 `,
      [admission_id]
    );
    const sendBack = await pool.query(
      `SELECT * FROM medicalevents WHERE admission_id = $1`,
      [admission_id]
    );

    sendBack.rows.length >= 1
      ? res.status(200).json({
          message: "Medical Note created succesfully",
          data: sendBack.rows,
        })
      : res.status(404).json({ message: "Couldn't create Medical Note" });
  } catch (error) {
    if (error.code === "23505") {
      // Unique constraint violation
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

export const postRecipeData = async (req, res) => {
  const { admission_id, dosis, medicine_chart_id, medicine_title, orders } =
    req.body;

  try {
    const registerRecipeData = await pool.query(
      `INSERT INTO recipe ( date_created,admission_id, dosis, medicine_chart_id, medicine_title, orders)
  VALUES(CURRENT_TIMESTAMP, $1,$2,$3,$4,$5)
  `,
      [admission_id, dosis, medicine_chart_id, medicine_title, orders]
    );
    const sendBack = await pool.query(
      `SELECT * FROM recipe WHERE admission_id = $1 ORDER BY id DESC LIMIT 1;
`,
      [admission_id]
    );

    sendBack.rows.length >= 1
      ? res.status(200).json({
          message: "Recipe Line stored Successfully",
          data: sendBack.rows,
        })
      : res.status(404).json({ message: "Couldn't create Medical Note" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllRecipeLinesByAdmission = async (req, res) => {
 
  const  {id} = req.params;
  const fixedAdmission_Id = parseInt(id);

 
  try {
    const recipeLinesQuery = await pool.query(
      `SELECT * FROM recipe WHERE admission_id = $1`,
      [fixedAdmission_Id]
    );

    recipeLinesQuery.rows.length >= 1
      ? res.status(200).json({
          message: "Recipe retrieved Successfully",
          data: recipeLinesQuery.rows,
        })
      : res.status(404).json({ message: "Couldn't get recipes" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const deleteRecipeLineById = async (req, res) => {
  const { id } = req.params;
  const fixedId = parseInt(id);

  console.log(id);
  try {
    const recipeLinesQuery = await pool.query(
      `DELETE FROM recipe WHERE id = $1`,
      [fixedId]
    );

    if (recipeLinesQuery.rowCount > 0) {
      res.status(200).json({
        message: "Recipe deleted successfully",
      });
    } else {
      res.status(404).json({ message: "Couldn't delete recipe" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
