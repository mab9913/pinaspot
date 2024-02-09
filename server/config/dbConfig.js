const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  // searchPath se especifica en la opción connectionString
  connectionString: process.env.DATABASE_URL || `postgres://${process.env.PGUSER}:${encodeURIComponent(process.env.PGPASSWORD)}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,

  
});
console.log("Conexión a la base de datos:", pool.options.connectionString);
module.exports = pool;

