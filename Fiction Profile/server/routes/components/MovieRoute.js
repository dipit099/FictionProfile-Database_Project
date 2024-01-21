const express = require("express");
const router = express.Router();
const pool = require("../../db");
const authorize = require("../../middleware/authorize");

// Endpoint to get movie details by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'SELECT id,title, poster_path,backdrop_path,release_date, vote_average, overview,original_language,genres FROM "Fiction Profile"."MOVIE" WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        const movie = {
            id: result.rows[0].id,
            title: result.rows[0].title,
            poster_path: `https://image.tmdb.org/t/p/original/${result.rows[0].poster_path}`,
            backdrop_path: `https://image.tmdb.org/t/p/original/${result.rows[0].backdrop_path}`,
            release_date: result.rows[0].release_date,
            vote_average: result.rows[0].vote_average,
            overview: result.rows[0].overview,
            original_language: result.rows[0].original_language,
            genres: result.rows[0].genres

        };

        res.json({ movie });
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id,title, poster_path,vote_average FROM "Fiction Profile"."MOVIE" ORDER BY vote_count DESC LIMIT 15');
        const movies = result.rows.map(movie => ({
            id: movie.id,
            title: movie.title,
            poster_path: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
            vote_average: movie.vote_average
        }));

        res.json({ movies });
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
