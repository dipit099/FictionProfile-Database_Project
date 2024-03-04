const express = require("express");
const router = express.Router();
const pool = require("../../db");
// Endpoint to get media reviews by ID
router.use(express.json());




router.get('/', async (req, res) => {
    try {
        // Extract media_id and media_type from the request query parameters
        const { media_id, media_type } = req.query;
        // console.log(req.query); // Log the query parameters to verify

        // Perform a database query to fetch reviews based on media_id and media_type
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
                review_id, 
                title,                 
                review   ,
                added_date,
                (Select username from "Fiction Profile"."PEOPLE" where people_id = user_id) as username             
            FROM 
                "Fiction Profile"."REVIEW"
            WHERE 
                media_id = $1 AND review IS NOT NULL
            `,
            [mediaId]
        );

        const reviews = result.rows;
         console.log('reviews:', reviews);

        // Send the reviews data in the response
        res.json({ reviews });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




router.post('/add', async (req, res) => {
    try {
        console.log('add review:', req.body);
        const { user_id, review, title, media_id, media_type } = req.body;

        // Check if user_id and review are provided
        if (!user_id || !review || !media_id || !media_type) {
            console.log('user_id, review, media_id, and media_type are required');
            return res.status(400).json({ error: 'user_id, review, media_id, and media_type are required' });
        }

        // Perform the database query to insert the review
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
                INSERT INTO  "Fiction Profile"."REVIEW" (user_id, media_id, review, title)
                VALUES ($1, $2, $3,$4)
                RETURNING *
                `,
            [user_id, mediaId, review, title]
        );
        res.json({ success: true, message: 'Review added successfully' });


    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.post('/addvote', async (req, res) => {
    try {

        const { user_id, review_id, vote } = req.body;
        console.log('add upvote:', req.body);
        console.log('user_id:', user_id);

        // Check if user_id and review are provided
        // if (!user_id || !review_id) {
        //     console.log('user_id and review_id are required');
        //     return res.status(400).json({ error: 'user_id and review_id are required' });
        // }

        // Perform the database query to insert the review
        const isExisting = await pool.query(
            `
            SELECT
                *
            FROM
                "Fiction Profile"."REVIEW_VOTE"
            WHERE
                user_id = $1 AND review_id = $2
            `,
            [user_id, review_id]
        );
        if (isExisting.rows.length > 0) {

            const result = await pool.query(
                `
                UPDATE "Fiction Profile"."REVIEW_VOTE"
                SET vote_value = $3
                WHERE user_id = $1 AND review_id = $2
                `,
                [user_id, review_id, vote]
            );

        }
        else {

            const result = await pool.query(
                `
                INSERT INTO "Fiction Profile"."REVIEW_VOTE" (user_id, review_id, vote_value)
                VALUES ($1, $2, $3)
                RETURNING *
                `,
                [user_id, review_id, vote]
            );
            console.log('result:', result.rows);
        }

        res.json({ success: true, message: 'Upvote added successfully' });

    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
);

module.exports = router;