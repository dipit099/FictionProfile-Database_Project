const Pool = require("pg").Pool;
const pool = new Pool({
    // user: "postgres",
    // password: "alliswell",
    // host: "localhost",
    // port: 5432,
    // database: "Fiction Profile"
    user: "postgres",
    password: "dx$Q6*vWTnu!45j",
    host: "db.eocmqhvplptwmzerrcng.supabase.co",
    port: 5432,
    database: "postgres"
});

module.exports = pool;