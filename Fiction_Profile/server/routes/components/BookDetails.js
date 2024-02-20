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
        `SELECT id,title,author, poster_path,
        (SELECT COUNT(*) FROM "Fiction Profile"."FAVORITE" WHERE user_id = $2 AND media_id = $3) AS is_favorite
         FROM "Fiction Profile"."BOOK" WHERE id = $1`,
            [id,user_id,mediaId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        const media = {
            id: result.rows[0].id,
            title: result.rows[0].title,
            poster_path: result.rows[0].poster_path,
            author: result.rows[0].author,
            is_favorite: result.rows[0].is_favorite
        };

        res.json({ media });
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports = router;