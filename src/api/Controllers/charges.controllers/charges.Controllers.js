import pool from "../../../DB/connection.js";

export const getAllCharges = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM charges");

    response.rowCount > 0
      ? res.status(200).json({ message: "Correct Query", data: response.rows })
      : res.status(404).json({ message: "No Data Found" });
  } catch (error) {
    res.status(500).json({ message: "error retrieving data" });
  }
};

export const insertCharge = async (req, res) => {
    const { admissionId, serviceId, num, collaborator} = req.body;
    console.log({ admissionId, serviceId, num, collaborator });
  
    try {
      // Check if admission is incomplete
      const admissionCheck = await pool.query(
        "SELECT completed FROM admissions WHERE id = $1",
        [admissionId]
      );
  
      if (admissionCheck.rows.length === 0) {
        // If admissionId does not exist in admissions table
        return res.status(404).json({ message: "Admission not found" });
      }
  
      if (!admissionCheck.rows[0].completed) {
      
        const response = await pool.query(
          "INSERT INTO charges (admission_id, service_id, amount, collaborator) VALUES ($1, $2, $3, $4)",
          [admissionId, serviceId, num, collaborator]
        );
  
      
        const sendBack = await pool.query(
          "SELECT c.charge_id, admission_id, service_id, amount, total, (SELECT SUM(total) FROM charges WHERE admission_id = c.admission_id) AS total_sum FROM charges c WHERE admission_id = $1",
          [admissionId]
        );
  
        
        const totalCharges = await pool.query(
          "SELECT SUM(total) AS total_sum, admission_id FROM charges WHERE admission_id = $1 GROUP BY admission_id",
          [admissionId]
        );
  
       
        return res.status(200).json({
          message: "Charge inserted successfully",
          data: { sendBack: sendBack.rows, total: totalCharges.rows }
        });
      } else {
       
        return res.status(400).json({ message: "Admission is already completed" });
      }
    } catch (error) {
     
      return res.status(500).json({ message: "Error inserting charge", error: error.message });
    }
  };
  
  
  export const insertChargeLoad = async (req, res) => {
    const dinamicInputs = req.body;
  
    try {
      const script = "INSERT INTO charges (admission_id, service_id, amount, collaborator) VALUES ($1, $2, $3, $4)";
     
      for (const element of dinamicInputs) {
     
        await pool.query(script, [element.id, element.serviceId, element.num, element.value]);
      }
  
      const sendBack = await pool.query("SELECT * FROM charges WHERE admission_id = $1", [dinamicInputs[0].id]);

      
      return res.status(200).json({
        message: "Charge inserted successfully",
        data:sendBack.rows
      });
    } catch (error) {
      // Return error response
      return res.status(500).json({ message: "Error inserting charge", error: error.message });
    }
  };
  