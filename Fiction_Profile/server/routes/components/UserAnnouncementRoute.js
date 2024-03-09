
const express = require('express');
const router = express.Router();
const pool = require('../../db');

router.get('/', async (req, res) => {
    try {
        
        // get all announcements from the announcement table in sorted order
        const allAnnouncements = await pool.query('SELECT * FROM announcement ORDER BY created_at DESC');
        console.log("Announcements fetched successfully!");
        res.json(allAnnouncements.rows);
    } catch (error) {
        console.error('Error fetching user announcements:', error);
    }
    }
);


module.exports = router;