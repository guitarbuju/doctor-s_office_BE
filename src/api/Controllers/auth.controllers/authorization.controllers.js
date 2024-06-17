import pool from "../../../DB/connection.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY= process.env.JWT_SECRET;

export const register = async (req, res) => {
 
    const { username, email, password } = req.body;
 
  try {
    console.log(username, email, password);

        const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userCheck.length >0) {res.status(400).json({message:"email already exists in DB"})}

        const hashedPassword = await bcrypt.hash(password, 10);
  
        await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, hashedPassword]);

        res.status(201).json({ message: 'User registered successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
};

export const login = async(req,res)=>{

    const { email, password } = req.body;

    try{
        const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = userCheck.rows[0];

        if(!user)
        return res.status(400).json({message:"Invalid email"});

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) 
          return res.status(400).json({ message: 'Invalid email or password' });
        

        const token = jwt.sign({id:user.id,email:user.email}, SECRET_KEY, { expiresIn: '1h' });
        
        res.json({ message: 'Login successful', token, user });
    
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  export const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) return res.status(401).json({ message: 'Access denied' });
  
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) return res.status(403).json({ message: 'Invalid token' });
  
      req.user = user;
      next();
    });
  };
   