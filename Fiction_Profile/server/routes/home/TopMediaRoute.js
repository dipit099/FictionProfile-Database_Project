const express = require("express");
const router = express.Router();
const pool = require("../../db");

// Endpoint to get top 5 media details
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT id, title, backdrop_path, vote_average
            FROM (
                SELECT id, title, backdrop_path, vote_average,
                    ROW_NUMBER() OVER (ORDER BY vote_count DESC) AS row_num
                FROM "Fiction Profile"."MOVIE"
            ) AS ranked_movies
            WHERE row_num IN (5,7,9,12,13,16);
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