import pool from "../../../../DB/connection.js";


export const dataForPayment = async (req, res )=>{

    const { dni }= req.params;

    try {

        const getDataForPayment = await pool.query(
          `SELECT 
          i.invoice_id, 
          i.invoice_date,
          c.admission_id,  
          a.patient_full_name,
          a.dni,
          SUM(c.total) AS invoice_total,
        COALESCE((SELECT SUM(payment) FROM payments WHERE admission_id = c.admission_id), 0) AS total_payments,
          COALESCE((SELECT SUM(discount) FROM discounts WHERE admission_id = c.admission_id), 0) AS total_discounts,
          SUM(c.total) - COALESCE((SELECT SUM(discount) FROM discounts WHERE admission_id = c.admission_id), 0) - 
          COALESCE((SELECT SUM(payment) FROM payments WHERE admission_id = c.admission_id), 0) AS net_amount
          
      FROM 
          invoices AS i
      JOIN 
          charges AS c ON i.admission_id = c.admission_id
      JOIN 
          admissions AS a ON c.admission_id = a.id
      WHERE 
          a.dni = $1
          AND i.status = 'pending'
      GROUP BY 
          i.invoice_id, 
          i.invoice_date,
          c.admission_id,  
          a.patient_full_name,
          a.dni;
      
      
      `
        ,
            [dni]
          );

          console.log(getDataForPayment.rows);

    
          getDataForPayment.rowCount > 0
          ? res.status(200).json({
              message:`Data payment success`,
              data: getDataForPayment.rows,
            })
          : res.status(404).json({ message: "Couldn't find data for payment" });
      } catch (error) {
        // Return error response
        return res
          .status(500)
          .json({ message: "Error finding payment data", error: error.message });
      }


}
export const dataForPaymentByInvoice = async (req, res )=>{

    const { invoice_id }= req.params;

    try {

        const getDataForPayment = await pool.query(
          `SELECT 
          i.invoice_id, 
          i.invoice_date,
          c.admission_id,  
          a.patient_full_name,
          a.dni,
          SUM(c.total) AS invoice_total,
        COALESCE((SELECT SUM(payment) FROM payments WHERE admission_id = c.admission_id), 0) AS total_payments,
          COALESCE((SELECT SUM(discount) FROM discounts WHERE admission_id = c.admission_id), 0) AS total_discounts,
          SUM(c.total) - COALESCE((SELECT SUM(discount) FROM discounts WHERE admission_id = c.admission_id), 0) - 
          COALESCE((SELECT SUM(payment) FROM payments WHERE admission_id = c.admission_id), 0) AS net_amount
          
      FROM 
          invoices AS i
      JOIN 
          charges AS c ON i.admission_id = c.admission_id
      JOIN 
          admissions AS a ON c.admission_id = a.id
      WHERE 
          i.invoice_id = $1
          AND i.status = 'pending'
      GROUP BY 
          i.invoice_id, 
          i.invoice_date,
          c.admission_id,  
          a.patient_full_name,
          a.dni;
      
      
      `
        ,
            [invoice_id]
          );

          console.log(getDataForPayment.rows,invoice_id);

    
          getDataForPayment.rowCount > 0
          ? res.status(200).json({
              message:`Data payment success`,
              data: getDataForPayment.rows,
            })
          : res.status(404).json({ message: "Couldn't find data for payment" });
      } catch (error) {
        // Return error response
        return res
          .status(500)
          .json({ message: "Error finding payment data", error: error.message });
      }


}



export const paymentVoucherCreator = async (req, res) => {
  const { admission_id, payment, card_holder, card_number, cvv, expiration_date, card_issuer} = req.body;


 try{
      const generatePayment = await pool.query(
        `INSERT INTO payments (admission_id, payment,date_entered,
          card_holder, card_number, cvv, expiration_date, card_issuer) 
              VALUES ($1,$2,CURRENT_TIMESTAMP,$3,$4,$5,$6,$7)`,
        [admission_id, payment, card_holder, card_number, cvv, expiration_date, card_issuer]
      );

      const sendBack = await pool.query
      (`SELECT * FROM 
      payments 
      GROUP BY date_entered ,
      admission_id,
      payments.id
      ORDER BY date_entered DESC
      LIMIT 1
      `)

    sendBack.rowCount > 0
      ? res.status(200).json({
          message: "Payment Voucher created succesfully",
          data: sendBack.rows,
        })
      : res.status(404).json({ message: "Couldn't create Payment Voucher" });
  } catch (error) {
    // Return error response
    return res
      .status(500)
      .json({ message: "Error creating Payment Voucher", error: error.message });
  }
};
