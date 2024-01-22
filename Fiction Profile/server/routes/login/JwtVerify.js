const express = require("express");
const router = express.Router();
const pool = require("../../db");
const bcrypt = require('bcrypt');
const jwtGenerator = require("../../utilis/jwtGenerator");
const authorize = require("../../middleware/authorize");
const jwt = require("jsonwebtoken");
require("dotenv").config();



router.get('/', authorize, async (req, res) => {
    try {
        // if it passes authorization than it is valid
        res.json(true);
        // console.log(req.user);
    }
    catch (err) {
        console.error("verify url" + err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;