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

    sendBack.rowCount > 0
      ? res.status(200).json({
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

export const InvoiceList = async (req, res) => {
  const status = req.params.status;

  try {
    const response = await pool.query(
      `SELECT     
    i.invoice_id, 
    i.invoice_date,
    i.status,
    c.admission_id, 
    a.doctor_full_name,
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
WHERE i.status = $1`,
      [status]
    );

    response.rowCount > 0
      ? res.status(200).json({
          message: "Invoice List send succesfully",
          data: response.rows,
        })
      : res.status(200).json({ message: "No data from selected List" });
  } catch (error) {
    console.error(error);
  }
};

export const anullInvoice = async (req, res) => {
  const { invoice_id } = req.params;

  try {
    const nullInvoice = await pool.query(
      `
        UPDATE invoices SET status = 'annulled' WHERE invoice_id = $1`,
      [invoice_id]
    );

    const reOpenAdmission = await pool.query(`
    UPDATE admissions
    SET completed = false
    FROM invoices
    WHERE admissions.id = invoices.admission_id
      AND invoices.invoice_id = $1;
  `, [invoice_id]);
  

    const sendBack = await pool.query(
      `SELECT * FROM invoices WHERE invoice_id = $1 AND status = 'annulled'`,
      [invoice_id]
    );

    sendBack.rowCount > 0
      ? res.status(200).json({
          message: "Invoice annulled succesfully",
          data: sendBack.rows,
        })
      : res.status(404).json({ message: "Couldn't annull invoice" });
  } catch (error) {
    console.error(error);
  }
};

export const getOneInvoice = async (req, res) => {
  
  const { invoice_id } = req.params;
  
  try {
    const sendBack = await pool.query(
      `SELECT 
      i.invoice_id, 
      i.invoice_date,
      i.status,
      c.admission_id, 
      c.date_created AS charge_date, 
      c.amount,
      c.total,
      a.doctor_full_name,
      s.title,
      s.price,
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
  WHERE i.invoice_id =$1`,[invoice_id]);


    sendBack.rowCount > 0
      ? res.status(200).json({
          message: "Selected invoice sent succesfully",
          data: sendBack.rows,
        })
      : res.status(404).json({ message: "Couldn't send selected invoice" });
  } catch (error) {
    console.error(error);
  }
};
