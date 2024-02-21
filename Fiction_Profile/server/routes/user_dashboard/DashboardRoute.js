const express = require('express');
const router = express.Router();
const pool = require("../../db");

// Define an endpoint to handle GET requests to '/dashboard/:people_id'
router.get('/:people_id', async (req, res) => {
    try {
        const { people_id } = req.params;
        const result = await pool.query('SELECT * FROM "Fiction Profile"."PEOPLE" WHERE people_id = $1', [people_id]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(400).json({ error: 'Error fetching user data' });
    }
});

router.get('/:people_id/favorites', async (req, res) => {
    try {
        const { people_id } = req.params;
        const result = await pool.query('SELECT * FROM "Fiction Profile"."FAVORITES" WHERE people_id = $1', [people_id]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching favorite items:', error);
        res.status(400).json({ error: 'Error fetching favorite items' });
    }
});

router.get('/:people_id/posts', async (req, res) => {
    try {
        const { people_id } = req.params;
        const result = await pool.query(`
            SELECT 					
                posts.post_id AS post_id,
                posts.user_id AS post_user_id,
                posts.title as title,		
                posts.content AS post_content,
                posts.last_edit AS last_edit,
                comments.comment_id,
                comments.user_id AS comment_user_id,
                comments.post_id AS comment_post_id,
                comments.parent_comment_id,
                comments.content AS comment_content
            FROM 
                "Fiction Profile"."POST" AS posts
            LEFT JOIN 
                "Fiction Profile"."COMMENT" AS comments ON posts.post_id = comments.post_id
            WHERE 
                posts.user_id = $1
            ORDER BY 
                posts.post_id DESC, comments.comment_id DESC;
        `, [people_id]);

        // Your logic to process the result and format the response goes here
        // Organize the data into a suitable format
        const feedData = {};

        result.rows.forEach(row => {
            if (!feedData[row.post_id]) {
                // Initialize the post if it doesn't exist in the feed data
                feedData[row.post_id] = {
                    post_id: row.post_id,
                    user_id: row.post_user_id,
                    title: row.title,
                    content: row.post_content,
                    last_edit: row.last_edit,                   
                    comments: [] // Initialize comments as an empty array
                };
            }

            if (row.comment_id) {
                // Add comments to the respective post
                feedData[row.post_id].comments.push({
                    comment_id: row.comment_id,
                    user_id: row.comment_user_id,
                    parent_comment_id: row.parent_comment_id,
                    content: row.comment_content
                });
            }
        });

        // Convert the feed data object into an array
        const feed = Object.values(feedData);
        console.log('Feed data:', feed);

        res.status(200).json({ feed });
    } catch (error) {
        console.error('Error fetching user posts:', error);
        res.status(400).json({ error: 'Error fetching user posts' });
    }
});

module.exports = router;
