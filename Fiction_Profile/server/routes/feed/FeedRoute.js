const express = require('express');
const router = express.Router();
const pool = require('../../db'); // Assuming you have your PostgreSQL pool configured
router.get('/', async (req, res) => {
    try {
        console.log('Fetching feed data...');

        // Retrieve data from the database
        const result = await pool.query(`
            WITH T AS (
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
                ORDER BY 
                    posts.post_id DESC, comments.comment_id DESC
            ),
            VoteCounts AS (
                SELECT 
                P2.post_id,
                SUM(P2.vote_value) AS total_vote,                   
                 (SELECT vote_value FROM "Fiction Profile"."POST_VOTE" P1 
                 WHERE P1.post_id=P2.post_id AND user_id=$1 ) AS user_vote
            FROM 
                "Fiction Profile"."POST_VOTE" P2
            GROUP BY 
                post_id   
            ) ,
            CommentCounts AS (
                SELECT 
                    post_id,
                    COUNT(comment_id) AS total_comments
                FROM 
                    "Fiction Profile"."COMMENT"
                GROUP BY 
                    post_id
            ) 
            SELECT                
                F.user_id AS my_id,
                F.followed_id, 		
                T.post_id,
                T.title,
                T.post_content,
                T.last_edit,
                T.comment_id,
                T.comment_user_id,
                T.comment_post_id,
                T.parent_comment_id,
                T.comment_content,
                P.username,
                P.profile_pic_path,
                VC.total_vote,
                VC.user_vote,
                CC.total_comments
            FROM 
                "Fiction Profile"."FOLLOW" F 
            LEFT JOIN 
                T ON F.followed_id = T.post_user_id
            LEFT JOIN
                "Fiction Profile"."PEOPLE" P ON F.followed_id = P.people_id
            LEFT JOIN
                VoteCounts VC ON T.post_id = VC.post_id
            LEFT JOIN
                 CommentCounts CC ON T.post_id = CC.post_id
            WHERE 
                F.user_id = $1 AND T.post_content IS NOT NULL
            `, [req.query.user_id]);

        // Organize the data into a suitable format
        const feedData = {};

        result.rows.forEach(row => {
            if (!feedData[row.post_id]) {
                // Initialize the post if it doesn't exist in the feed data
                feedData[row.post_id] = {
                    post_id: row.post_id,
                    user_id: row.my_id,
                    title: row.title,
                    content: row.post_content,
                    last_edit: row.last_edit,
                    username: row.username,
                    profile_pic_path: row.profile_pic_path,
                    comments: [], // Initialize comments as an empty array
                    total_vote: row.total_vote || 0, // Set total_vote to 0 if it's null
                    user_vote: row.user_vote || 0, // Set user_vote to 0 if it's null,
                    comments_count: row.total_comments || 0
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
        console.log(req.body);

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

// Endpoint to fetch users followed by the current user
router.get('/followed', async (req, res) => {
    try {
        const { user_id } = req.query;

        // Fetch users followed by the current user from the database
        const result = await pool.query(`
            SELECT               
                f.followed_id,
                p.first_name || ' ' || p.last_name AS full_name,
                p.profile_pic_path,
                p.username
            FROM 
                "Fiction Profile"."FOLLOW" AS f
            JOIN 
            "Fiction Profile"."PEOPLE" AS p ON f.followed_id = p.people_id
            WHERE 
                f.user_id = $1
        `, [user_id]);

        const followedUsers = result.rows.map(row => ({
            followed_id: row.followed_id,
            full_name: row.full_name,
            profile_pic_path: row.profile_pic_path,
            username: row.username
        }));

        // console.log('Followed users:', followedUsers);

        res.json({ followedUsers });
    } catch (error) {
        console.error('Error fetching followed users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Backend code - Express Router

// Endpoint to fetch people you may know
router.get('/people-you-may-know', async (req, res) => {
    try {
        const { user_id } = req.query;

        // Fetch people you may know from the database
        const result = await pool.query(`          
        SELECT people_id, first_name, last_name, profile_pic_path, username
        FROM "Fiction Profile"."PEOPLE"
        WHERE people_id !=  $1 AND role='user' AND people_id NOT IN ( SELECT followed_id FROM "Fiction Profile"."FOLLOW" WHERE user_id = $1)           
        `, [user_id]);

        const peopleYouMayKnow = result.rows;
        // console.log('People you may know:', peopleYouMayKnow);

        res.json({ peopleYouMayKnow });
    } catch (error) {
        console.error('Error fetching people you may know:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Endpoint to follow a user
router.post('/follow', async (req, res) => {
    try {
        console.log("inserting followed");
        const { user_id, followed_id } = req.body;

        // Insert a new follow relationship into the database
        await pool.query(`
            INSERT INTO "Fiction Profile"."FOLLOW" (user_id, followed_id)
            VALUES ($1, $2)
        `, [user_id, followed_id]);

        res.status(200).json({ message: 'User followed successfully' });
    } catch (error) {
        console.error('Error following user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to unfollow a user
router.post('/unfollow', async (req, res) => {
    try {
        console.log("deleting followed");
        const { user_id, followed_id } = req.body;

        // Delete the follow relationship from the database
        await pool.query(`
            DELETE FROM "Fiction Profile"."FOLLOW"
            WHERE user_id = $1 AND followed_id = $2
        `, [user_id, followed_id]);

        res.status(200).json({ message: 'User unfollowed successfully' });
    } catch (error) {
        console.error('Error unfollowing user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.post('/add_post_vote', async (req, res) => {
    try {
        const { user_id, post_id, vote_value } = req.body;
        console.log(user_id, post_id, vote_value);

        const isAvailable = await pool.query(`
            SELECT * FROM "Fiction Profile"."POST_VOTE"
            WHERE user_id = $1 AND post_id = $2
        `, [user_id, post_id]);

        if (isAvailable.rows.length > 0) {
            if (isAvailable.rows[0].vote_value == vote_value) {
                await pool.query(`
                DELETE FROM "Fiction Profile"."POST_VOTE"
                WHERE user_id = $1 AND post_id = $2
            `, [user_id, post_id]);
            }
            else {
                await pool.query(`UPDATE "Fiction Profile"."POST_VOTE"
                SET vote_value = $1
                WHERE user_id = $2 AND post_id = $3
            `, [vote_value, user_id, post_id]);
            }


        } else {
            await pool.query(`
                INSERT INTO "Fiction Profile"."POST_VOTE" (user_id, post_id, vote_value)
                VALUES ($1, $2, $3)
            `, [user_id, post_id, vote_value]);
        }

        res.status(200).json({ success: true, message: 'Post voted successfully' });
    } catch (error) {
        console.error('Error voting post:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}
);


module.exports = router;
