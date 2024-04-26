import pool from "../../../DB/connection.js";

export const invoiceMaker = async (req, res) => {
  const { id } = req.params;

  try {
    const generateInvoice = await pool.query(
      `INSERT INTO invoices (admission_id, invoice_date)
        VALUES ($1, CURRENT_TIMESTAMP)`,
      [id]
    );

    const completeAdmissions = await pool.query(
      `UPDATE admissions
         SET completed = true
         WHERE id = $1`,
      [id]
    );

    const sendBack = await pool.query(
      `SELECT 
     i.invoice_id, 
     i.invoice_date,
     c.admission_id, 
     c.date_created AS charge_date, 
     c.total,
     a.doctor_full_name,
     s.title,
     a.patient_full_name,
     (
         SELECT SUM(c2.total) 
         FROM charges AS c2 
         WHERE c2.admission_id = i.admission_id
     ) AS invoice_total
 FROM 
     invoices AS i
 JOIN 
     charges AS c ON i.admission_id = c.admission_id
 JOIN 
     admissions AS a ON c.admission_id = a.id
 JOIN 
     services AS s ON c.service_id = s.id
 WHERE c.admission_id =$1`,
      [id]
    );

    console.log(sendBack);

    sendBack.rowCount > 0
      ? res
          .status(200)
          .json({
            message: "Invoice created succesfully",
            data: sendBack.rows,
          })
      : res.status(404).json({ message: "Couldn't create invoice" });
  } catch (error) {
    // Return error response
    return res
      .status(500)
      .json({ message: "Error creating invoice", error: error.message });
  }
};
