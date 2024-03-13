const Pool = require("pg").Pool;
const pool = new Pool({
    // user: "postgres",
    // password: "alliswell",
    // host: "localhost",
    // port: 5432,
    // database: "db"

    user: "postgres.eocmqhvplptwmzerrcng",
    password: "dx$Q6*vWTnu!45j",
    host: "aws-0-ap-south-1.pooler.supabase.com",
    port: 6543,
    database: "postgres"




});

module.exports = pool;