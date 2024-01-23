const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(people_id) {
  const payload = {
    user: people_id
  };


  // console.log("jwtGenerator: " + people_id)
  // console.log("jwtGenerator: " + process.env.jwtSecret);

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "6h" });
}

module.exports = jwtGenerator;