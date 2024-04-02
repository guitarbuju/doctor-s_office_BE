import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv'

dotenv.config()

 const pool = new Pool({
  user:'postgres',
  host: process.env.HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT, 
});



export default pool;