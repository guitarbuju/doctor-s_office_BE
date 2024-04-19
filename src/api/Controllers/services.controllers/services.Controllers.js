import pool from "../../../DB/connection.js";

export const getAllServices = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM services");

    response.rowCount > 0
      ? res.status(200).json({ message: "Correct Query", data: response.rows })
      : res.status(404).json({ message: "No Data Found" });
  } catch (error) {
    res.status(500).json({ message: "error retrieving data" });
  }
};

export const createService = async (req, res) => {
  const serviceData = req.body;

  console.log(serviceData);

  try {
    await pool.query(
      "INSERT INTO services (title, category, price) VALUES ($1,$2,$3);",
      [serviceData.title, serviceData.category, serviceData.price]
    );

    const lastRecord = await pool.query(
      "SELECT * FROM services ORDER BY id DESC LIMIT 1"
    );

    const response = {
      message: "Service created",
      data: {
        title: lastRecord.rows[0].title,
        category: lastRecord.rows[0].category,
        price: lastRecord.rows[0].price
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error creating service:", error);
    const response = {
      message: "Failed to create service",
      status: "error",
      error: error.message,
    };
    res.status(500).json(response);
  }
};
