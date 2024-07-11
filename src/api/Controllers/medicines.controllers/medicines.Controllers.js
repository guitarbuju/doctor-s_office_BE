
import pool from "../../../DB/connection.js";


export const getAllMedicines = async(req, res)=>{

    try{
    const response = await pool.query(
        `
        SELECT * from medicine_chart
        `
    );

    response.rows.length > 0
      ? res.status(200).json({ message: "Medicines Succesfully Found", data: response.rows })
      : res.status(400).json({ message: "Couldn`t find medicine in DB" });
  } catch (error) {
    res.status(500).json({ message: "error retrieving data" });
  }

};