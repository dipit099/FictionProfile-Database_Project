const express = require("express");
const router = express.Router();
const pool = require("../../db");

// Endpoint to get top 5 media details
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(`
        
            SELECT   id, title, backdrop_path, vote_average           
                FROM "Fiction Profile"."MOVIE"            
             WHERE id IN (299536,10195,293660,429617,673)			
                        ORDER BY id DESC	

        	
        `);


        const topMedia = result.rows.map(media => ({
            id: media.id,
            title: media.title,
            backdrop_path: `https://image.tmdb.org/t/p/original/${media.backdrop_path}`,
            vote_average: media.vote_average
        }));
        // console.log("sending top media");
        res.json({ topMedia });
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;