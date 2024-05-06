import pool from "../../../../DB/connection.js";


export const dataForDiscount = async (req, res )=>{

    const { dni }= req.params;

    try {

        const getDataForDiscount = await pool.query(
          `SELECT 
          i.invoice_id, 
          c.admission_id,  
          a.patient_full_name,
          a.dni,
          SUM(c.total) AS invoice_total,
          (SELECT SUM(discount) FROM discounts WHERE admission_id = c.admission_id) AS total_discounts,
          SUM(c.total) - (SELECT SUM(discount) FROM discounts WHERE admission_id = c.admission_id) AS net_amount
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
          c.admission_id,  
          a.patient_full_name,
          a.dni
      
      `
        ,
            [dni]
          );
    
          getDataForDiscount.rowCount > 0
          ? res.status(200).json({
              message:`Data for discount success`,
              data: getDataForDiscount.rows,
            })
          : res.status(404).json({ message: "Couldn't find data for discount" });
      } catch (error) {
        // Return error response
        return res
          .status(500)
          .json({ message: "Error finding Discount data", error: error.message });
      }


}



export const discountVoucherCreator = async (req, res) => {
  const { admission_id, discount } = req.body;

 try{
      const generateDiscount = await pool.query(
        `INSERT INTO discounts (admission_id, discount,date_entered) 
              VALUES ($1,$2,CURRENT_TIMESTAMP)`,
        [admission_id, discount]
      );

      const sendBack = await pool.query
      (`SELECT * FROM 
      discounts 
      GROUP BY date_entered ,
      admission_id,
      discounts.id
      ORDER BY date_entered DESC
      LIMIT 1
      `)

    sendBack.rowCount > 0
      ? res.status(200).json({
          message: "Discount Voucher created succesfully",
          data: sendBack.rows,
        })
      : res.status(404).json({ message: "Couldn't create Discount Voucher" });
  } catch (error) {
    // Return error response
    return res
      .status(500)
      .json({ message: "Error creating Discount Voucher", error: error.message });
  }
};
