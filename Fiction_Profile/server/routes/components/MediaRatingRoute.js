const express = require('express');
const router = express.Router();
const pool = require('../../db'); // Assuming you have your PostgreSQL pool configured


router.get('/', async (req, res) => {
    try {
        console.log('Fetching all ratings');
        const { media_id, media_type } = req.query;
        const extractId = await pool.query(
            `
            SELECT
                media_id
            FROM
                "Fiction Profile"."MEDIA"
            WHERE
                ${media_type}_id = $1           
            `,
            [media_id]
        );
        const mediaId = extractId.rows[0].media_id;
        const result = await pool.query(
            `
            SELECT rating, count(*)
            FROM "Fiction Profile"."REVIEW"
            WHERE media_id =  $1
            GROUP BY rating
            `,
            [mediaId]
        );       
       
        res.json(result.rows);
        console.log('Ratings:', result.rows);
    } catch (error) {
        console.error('Error fetching ratings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/add', async (req, res) => {
    try {
        console.log('add rating:', req.body);
        const { user_id, selectedRating, media_id, media_type } = req.body;

        // Check if user_id and selectedRating are provided
        if (!user_id || !selectedRating || !media_id || !media_type) {
            console.log('user_id, selectedRating, media_id, and media_type are required');
            return res.status(400).json({ error: 'user_id, selectedRating, media_id, and media_type are required' });
        }

        // Perform the database query to insert the rating
        const extractId = await pool.query(
            `
            SELECT
                media_id
            FROM
                "Fiction Profile"."MEDIA"
            WHERE
                ${media_type}_id = $1           
            `,
            [media_id]
        );
        const mediaId = extractId.rows[0].media_id;

        const ratingRow = await pool.query(
            `
            SELECT *                
            FROM
                "Fiction Profile"."REVIEW"
            WHERE
                user_id = $1
            AND
                media_id = $2
            `,
            [user_id, mediaId]
        );
        if (ratingRow.rows.length > 0) {
            const result = await pool.query(
                `
                UPDATE
                    "Fiction Profile"."REVIEW"
                SET
                    rating = $1
                WHERE
                    review_id = $2
                RETURNING *
                `,
                [selectedRating, ratingRow.rows[0].review_id]
            );
            return res.json({ success: true, message: 'Rating updated successfully' });
        }
        else {
            const result = await pool.query(
                `
                INSERT INTO  "Fiction Profile"."REVIEW" (user_id, media_id, rating)
                VALUES ($1, $2, $3)
                RETURNING *
                `,
                [user_id, mediaId, selectedRating]
            );
            return res.json({ success: true, message: 'Rating added successfully' });
        }

    } catch (error) {
        console.error('Error adding rating:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/getmyrating', async (req, res) => {
    try {
        console.log('Fetching my rating');
        const { user_id, media_id, media_type } = req.query;

        const extractId = await pool.query(
            `
            SELECT
                media_id
            FROM
                "Fiction Profile"."MEDIA"
            WHERE
                ${media_type}_id = $1           
            `,
            [media_id]
        );
        const mediaId = extractId.rows[0].media_id;

        const result = await pool.query(
            `
            SELECT
                rating
            FROM
                "Fiction Profile"."REVIEW"
            WHERE
                user_id = $1
            AND
                media_id = $2
            `,
            [user_id, mediaId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Rating not found' });
        }

        const rating = result.rows[0].rating;
        res.json({ rating });
    } catch (error) {
        console.error('Error fetching rating:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
);

module.exports = router;
