const express = require("express");
const router = express.Router();
const pool = require("../../db");
const authorize = require("../../middleware/authorize");

// Endpoint to get movie details by ID

router.get('/movie', async (req, res) => {
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




router.get('/tvshow', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id,title, poster_path,vote_average,first_air_date,last_air_date FROM "Fiction Profile"."TVSHOW" ORDER BY vote_count DESC LIMIT 15');
        const movies = result.rows.map(movie => ({
            id: movie.id,
            title: movie.title,
            poster_path: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
            vote_average: movie.vote_average,
            first_air_date: movie.first_air_date,
            last_air_date: movie.last_air_date
        }));

        res.json({ movies });
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/book', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id,title,author, poster_path FROM "Fiction Profile"."BOOK" ORDER BY id ASC LIMIT 15');
        const movies = result.rows.map(movie => ({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            author: movie.author,

        }));

        res.json({ movies });
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
);

router.get('/manga', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id, title, poster_path, vote_average FROM "Fiction Profile"."MANGA" ORDER BY COALESCE(scored_by, 0) DESC LIMIT 15'
        );

        const movies = result.rows.map(movie => ({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            vote_average: movie.vote_average
        }));

        res.json({ movies });
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
);

module.exports = router;