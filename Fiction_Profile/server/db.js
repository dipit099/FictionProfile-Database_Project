require("dotenv").config();
const Pool = require("pg").Pool;
const pool = new Pool({   
    host: "aws-0-ap-south-1.pooler.supabase.com",
    port: 5432,
    database: "postgres",
    user: process.env.DB_USER,   
    password: process.env.DB_PASSWORD,




});

module.exports = pool;
