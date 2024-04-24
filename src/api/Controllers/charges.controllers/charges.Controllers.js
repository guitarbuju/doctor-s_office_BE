import pool from "../../../DB/connection.js";

export const getChargesForOneInvoice = async (req, res) => {

const { id }= req.params;

  try {
    const response = await pool.query(
        "SELECT admission_id,charge_id,amount, services.price AS price,total, services.title AS service_title, p.title AS doctor FROM charges JOIN services ON charges.service_id = services.id JOIN partnershiphub AS p ON charges.collaborator = p.id WHERE admission_id = $1",
        [id]
      );
    response.rowCount > 0
      ? res.status(200).json({ message: "Correct Query", data: response.rows })
      : res.status(404).json({ message: "No Data Found" });
  } catch (error) {
    res.status(500).json({ message: "error retrieving data" });
  }
};


export const insertChargeLoad = async (req, res) => {
  const dinamicInputs = req.body;

  try {
    const script =
      "INSERT INTO charges (admission_id, service_id, amount, collaborator) VALUES ($1, $2, $3, $4)";

    for (const element of dinamicInputs) {
      await pool.query(script, [
        element.id,
        element.serviceId,
        element.num,
        element.value,
      ]);
    }

    const sendBack = await pool.query(
      "SELECT admission_id,charge_id,amount, services.price AS price,total, services.title AS service_title, p.title AS doctor FROM charges JOIN services ON charges.service_id = services.id JOIN partnershiphub AS p ON charges.collaborator = p.id WHERE admission_id = $1",
      [dinamicInputs[0].id]
    );

    return res.status(200).json({
      message: "Charge inserted successfully",
      data: sendBack.rows,
    });
  } catch (error) {
    // Return error response
    return res
      .status(500)
      .json({ message: "Error inserting charge", error: error.message });
  }
};
