// discoverRoute.js
const express = require("express");
const router = express.Router();
const pool = require("../../db");

router.post("/add-media", async (req, res) => {
    try {
        const { type, title, author } = req.body;

        // Add media to the database
        await pool.query(
            `INSERT INTO "Fiction Profile"."MEDIA" (type, title, author)
            VALUES ($1, $2, $3)`,
            [type, title, author]
        );

        res.json({ message: "Media added successfully" });
    } catch (error) {
        console.error("Error adding media:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
);


module.exports = router;
