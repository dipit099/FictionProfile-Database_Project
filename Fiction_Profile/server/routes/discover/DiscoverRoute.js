// discoverRoute.js
const express = require("express");
const router = express.Router();
const pool = require("../../db");

router.get('/', async (req, res) => {

    const {userId, page, pageSize } = req.query;

    // Set default values for page and page size if not provided
    const pageNumber = parseInt(page) || 1;
    const limit = parseInt(pageSize) || 10; // Default page size is 10

    try {
        // Calculate the offset based on the page number and page size
        const offset = (pageNumber - 1) * limit;

        // Fetch data from the database or an external API for discovery
        const discoverQuery = `
            SELECT 
                title, 
                poster_path, 
                rating, 
                vote_count,
                CASE
                    WHEN type_id = 1 THEN movie_id
                    WHEN type_id = 2 THEN tv_id
                    WHEN type_id = 3 THEN manga_id
                    WHEN type_id = 4 THEN book_id
                END AS id,
                (SELECT type_name FROM "Fiction Profile"."MEDIA_TYPE" WHERE type_id = media.type_id) AS media_type,
                (SELECT COUNT(*) FROM "Fiction Profile"."FAVORITE" WHERE user_id = $1 AND media_id = media.media_id) AS is_favorite
            FROM 
                "Fiction Profile"."MEDIA" media
            LIMIT $2 OFFSET $3`;
        
        const discoverResult = await pool.query(discoverQuery, [userId, limit, offset]);
        
        const media = discoverResult.rows.map(mediaItem => ({
            id: mediaItem.id,
            title: mediaItem.title,
            // poster_path: mediaItem.poster_path, // Use the full URL for the poster path, for movies and tv add extra path for manga and boos use the given path from database
            poster_path: mediaItem.media_type === 'movie' || mediaItem.media_type === 'tv' ? `https://image.tmdb.org/t/p/w500${mediaItem.poster_path}` : mediaItem.poster_path,
            rating: mediaItem.rating,
            is_favorite: mediaItem.is_favorite,
            media_type: mediaItem.media_type
        }));
        // Send the media data as JSON response
        res.json({ media });
    } catch (error) {
        console.error('Error during discovery:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
