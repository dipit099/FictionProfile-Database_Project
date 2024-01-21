const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(people_id) {
  const payload = {
    user: people_id
  };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1h" });
}

module.exports = jwtGenerator;