const express = require("express");
const router = express.Router();
const pool = require("../../db");
router.get('/:id', async (req, res) => {
    try {
        const {user_id, id, media_type } = req.query;

        const extractId = await pool.query(
            `
            SELECT
                media_id
            FROM
                "Fiction Profile"."MEDIA"
            WHERE
                ${media_type}_id = $1           
            `,
            [id]
        );
        const mediaId = extractId.rows[0].media_id;

        const result = await pool.query(
            `SELECT id,title, poster_path,backdrop_path, vote_average, overview,original_language,genres,
            (SELECT m.rating FROM "Fiction Profile"."MEDIA" AS m WHERE m.media_id = $3) AS rating,
            (SELECT COUNT(*) FROM "Fiction Profile"."FAVORITE" WHERE user_id = $2 AND media_id = $3) AS is_favorite            
            FROM "Fiction Profile"."TV" WHERE id = $1`,
            [id,user_id,mediaId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        const media = {
            id: result.rows[0].id,
            title: result.rows[0].title,
            poster_path: `https://image.tmdb.org/t/p/original/${result.rows[0].poster_path}`,
            backdrop_path: `https://image.tmdb.org/t/p/original/${result.rows[0].backdrop_path}`,
            release_date: result.rows[0].release_date,
            vote_average: result.rows[0].rating,
            overview: result.rows[0].overview,
            original_language: result.rows[0].original_language,
            genres: result.rows[0].genres,
            is_favorite: result.rows[0].is_favorite

        };

        res.json({ media });
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports = router;