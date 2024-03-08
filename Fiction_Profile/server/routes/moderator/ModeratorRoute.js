// discoverRoute.js
const express = require("express");
const router = express.Router();
const pool = require("../../db");


router.post("/add-media", async (req, res) => {
    try {
        const { isbn, type, title, year, language, genre, runtime } = req.body;

        console.log('So ws red');

        res.json({ message: "Media added successfully" });
    } catch (error) {
        console.error("Error adding media:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;


module.exports = router;
