import pool from "../../../DB/connection.js";

export const login = async (req, res) => {
 
    const { username, email, password } = req.body;
 
  try {
    console.log(username, email, password);
    req.body
    ?res.status(200).json({ message: "Correct Query" })
    :res.status(404).json({ message: "No Data Found" });
  } catch (error) {
    res.status(500).json({ message: "error retrieving data" });
  }
};
