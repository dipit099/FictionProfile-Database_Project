const express = require("express");
const router = express.Router();
const pool = require("../../db");

router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT title, poster_path FROM "Fiction Profile"."MOVIE" ORDER BY vote_count DESC LIMIT 10');
        const movies = result.rows.map(movie => ({
            title: movie.title,
            poster_path: `https://image.tmdb.org/t/p/original/${movie.poster_path}`
        }));

        res.json({ movies });
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
