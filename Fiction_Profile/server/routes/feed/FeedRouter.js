const express = require('express');
const router = express.Router();
const pool = require('../../db'); // Assuming you have your PostgreSQL pool configured

// Endpoint to fetch posts and comments for the feed
router.get('/', async (req, res) => {
    try {
        console.log('Fetching feed data...');
        // Retrieve data from the database
        const result = await pool.query(`
            SELECT 
                posts.post_id,
                posts.user_id,
                posts.content,
                comments.comment_id,
                comments.user_id AS comment_user_id,
                comments.post_id AS comment_post_id,
                comments.parent_comment_id,
                comments.content AS comment_content
            FROM 
                "Fiction Profile"."POST" AS posts
            LEFT JOIN 
                "Fiction Profile"."COMMENT" AS comments ON posts.post_id = comments.post_id
            ORDER BY 
                posts.post_id DESC, comments.comment_id ASC
        `);

        // Organize the data into a suitable format
        const feedData = {};

        result.rows.forEach(row => {
            if (!feedData[row.post_id]) {
                // Initialize the post if it doesn't exist in the feed data
                feedData[row.post_id] = {
                    post_id: row.post_id,
                    user_id: row.user_id,
                    content: row.content,
                    comments: []
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
        console.log("comments", feed[0].comments);

        res.json({ feed });
    } catch (error) {
        console.error('Error fetching feed data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Assuming you have a router set up in your Express application

// Endpoint to handle post submission
router.post('/post', async (req, res) => {
    try {
        const { user_id, content } = req.body;

        // Insert the new post into the database
        await pool.query(
            `INSERT INTO "Fiction Profile"."POST" (user_id, content) VALUES ($1, $2)`,
            [user_id, content]
        );
        console.log("post submitted");
        res.status(201).json({ message: 'Post submitted successfully' });
    } catch (error) {
        console.error('Error submitting post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Endpoint to handle comment submission
router.post('/comment', async (req, res) => {
    try {
        const { user_id, post_id, content } = req.body;

        // Insert the new comment into the database
        await pool.query(
            `INSERT INTO "Fiction Profile"."COMMENT" (user_id, post_id, content) VALUES ($1, $2, $3)`,
            [user_id, post_id, content]
        );
        console.log("comment submitted");
        res.status(201).json({ message: 'Comment submitted successfully' });
    } catch (error) {
        console.error('Error submitting comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
