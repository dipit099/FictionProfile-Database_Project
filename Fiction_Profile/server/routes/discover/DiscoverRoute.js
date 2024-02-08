// discoverRoute.js
const express = require("express");
const router = express.Router();
const pool = require("../../db");

router.get('/', async (req, res) => {

    const { page, pageSize } = req.query;

    // Set default values for page and page size if not provided
    const pageNumber = parseInt(page) || 1;
    const limit = parseInt(pageSize) || 10; // Default page size is 10

    try {
        // Calculate the offset based on the page number and page size
        const offset = (pageNumber - 1) * limit;

        // Fetch data from the database or an external API for discovery
        const discoverQuery = `SELECT * FROM "Fiction Profile"."MOVIE" ORDER BY vote_count DESC LIMIT $1 OFFSET $2`;
        const discoverResult = await pool.query(discoverQuery, [limit, offset]);

        const media = discoverResult.rows.map(movie => ({
            id: movie.id,
            title: movie.title,
            poster_path: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
            vote_average: movie.vote_average,
            is_favorite: movie.is_favorite
        }));

        // Send the media data as JSON response
        res.json({ media });
    } catch (error) {
        console.error('Error during discovery:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
