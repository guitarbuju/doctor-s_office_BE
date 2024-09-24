// import pkg from 'pg';
// const { Pool } = pkg;
// import dotenv from 'dotenv'

// dotenv.config()

//  const pool = new Pool({
//   user:'postgres',
//   host: process.env.HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT, 
// });



// export default pool;
// import pkg from 'pg';
// const { Pool } = pkg;
// import dotenv from 'dotenv';

// dotenv.config();

// const pool = new Pool({
//   host: process.env.Hostname,
//   user: process.env.Username,
//   password: process.env.Password,
//   database: process.env.Database,
//   port: process.env.Port,
//   ssl: { rejectUnauthorized: false }, // Ensure SSL connection for production
// });


// export default pool;

import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.Internal_Database_URL, // Use the internal URL provided by Render
  ssl: { rejectUnauthorized: false }, // SSL for production
});

// Test the connection
pool.connect((err) => {
  if (err) {
    console.error("Error connecting to PostgreSQL", err);
  } else {
    console.log("Connected to PostgreSQL");
  }
});

export default pool;
