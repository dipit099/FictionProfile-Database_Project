
const express = require('express');
const router = express.Router();
const pool = require('../../db');
router.get('/', async (req, res) => {
    try {
        // Get all announcements from the announcement table in sorted order
        console.log("Fetching all announcements...");
        const result = await pool.query(`
        SELECT 
            title, 
            description, 
            ROUND(EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - created_at)) / 3600) AS hours_ago
        FROM 
            "Fiction Profile"."ANNOUNCEMENT"
        ORDER BY 
            created_at DESC;
        `);
        console.log("Announcements fetched successfully!");


        // Send the announcements as a response
        // console.log(result.rows);
        res.status(200).json(result.rows);




    } catch (error) {
        console.error('Error fetching user announcements:', error);
        res.status(500).json({ error: 'Error fetching user announcements' }); // Send error response
    }
});


module.exports = router;