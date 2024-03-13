const express = require('express');
const router = express.Router();
const pool = require('../../db'); // Assuming you have your PostgreSQL pool configured



router.post('/report', async (req, res) => {
    try {
        const { user_id, post_id, report_reason } = req.body;

        console.log(user_id, post_id, report_reason);


        res.status(200).json({ success: true, message: 'Post reported successfully' });
    }

    catch (error) {
        console.error('Error reporting post:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}
);


router.get('/get_post', async (req, res) => {
    try {
        const { post_id } = req.query;
        const result = await pool.query(`
           
                SELECT
                P.post_id,
                P.user_id,
                P.title,
                P.content,
                P.last_edit,
                (SELECT username FROM "Fiction Profile"."PEOPLE" WHERE people_id= P.user_id) AS username,
                (SELECT profile_pic_path FROM "Fiction Profile"."PEOPLE" WHERE people_id= P.user_id) AS profile_pic_path,
                (SELECT COUNT(*) FROM "Fiction Profile"."POST_VOTE" WHERE post_id= P.post_id) AS total_votes,
                (SELECT COUNT(*) FROM "Fiction Profile"."COMMENT" WHERE post_id= P.post_id) AS total_comments,
                            C.comment_id,C.user_id as comment_user_id,
                (SELECT username FROM "Fiction Profile"."PEOPLE"
                    WHERE people_id= C.user_id) AS comment_username,
                C.content as comment_content 
                FROM "Fiction Profile"."POST" P
                            LEFT JOIN "Fiction Profile"."COMMENT" C
                            ON  P.post_id= C.post_id          
                WHERE P.post_id = $1
            `, [post_id]);


        const row = result.rows[0];

        const feedData = {};
        result.rows.forEach(row => {
            if (!feedData[row.post_id]) {
                // Initialize the post if it doesn't exist in the feed data
                feedData[row.post_id] = {
                    post_id: row.post_id,
                    user_id: row.user_id,
                    title: row.title,
                    content: row.content,
                    last_edit: row.last_edit,
                    username: row.username,
                    profile_pic_path: row.profile_pic_path,
                    comments: [], // Initialize comments as an empty array
                    total_votes: row.total_votes,
                    total_comments: row.total_comments
                };
            }
            if (row.comment_id) {
                // Add comments to the respective post
                feedData[row.post_id].comments.push({
                    comment_id: row.comment_id,
                    user_id: row.comment_user_id,
                    comment_username: row.comment_username,
                    content: row.comment_content
                });
            }
        }
        );

        console.log(feedData);
        res.json({ feedData });
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

});


router.get('/', async (req, res) => {
    try {
        console.log('Fetching feed data...');
        const { user_id } = req.query;
        const userIdParameter = user_id !== undefined ? user_id.trim() : null;
        // console.log(userIdParameter + "feed data...");

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
                (SELECT username FROM "Fiction Profile"."PEOPLE" 
                    WHERE people_id= comments.user_id) AS comment_username,
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
                ($1 IS NULL OR F.user_id = $1)            
             `, [userIdParameter]);

        // Organize the data into a suitable format
        const feedData = {};

        result.rows.forEach(row => {
            if (!feedData[row.post_id]) {
                // Initialize the post if it doesn't exist in the feed data
                feedData[row.post_id] = {
                    post_id: row.post_id,
                    user_id: row.my_id,
                    post_user_id: row.followed_id,
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
        const { user_id, content, caption } = req.body;
        console.log(req.body);

        // Insert the new post into the database
        await pool.query(
            `INSERT INTO "Fiction Profile"."POST" (user_id, content, title) VALUES ($1, $2, $3)`,
            [user_id, content, caption]
        );
        console.log("post submitted");
        res.status(200).json({ message: 'Post submitted successfully' });
    } catch (error) {
        console.error('Error submitting post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/delete_post', async (req, res) => {
    try {
        const { post_id } = req.body;
        const result = await pool.query(`DELETE FROM "Fiction Profile"."POST" WHERE post_id = $1`, [post_id]);
        res.status(200).json({ message: 'Post deleted successfully', success: true });
    } catch (error) {
        console.error('Error deleting post:', error);
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
        res.status(200).json({ message: 'Comment submitted successfully', success: true });

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


// Endpoint to fetch users followed by the current user
router.get('/follower', async (req, res) => {
    try {
        const { user_id } = req.query;

        const result = await pool.query(`
       SELECT     
             DISTINCT    
            f.user_id,
            p.first_name || ' ' || p.last_name AS full_name,
            p.profile_pic_path,
            p.username
            FROM 
            "Fiction Profile"."FOLLOW" AS f
            JOIN 
            "Fiction Profile"."PEOPLE" AS p ON f.user_id = p.people_id
            WHERE 
            f.followed_id = $1 and f.user_id!=$1
        `, [user_id]);

        const followerUsers = result.rows.map(row => ({
            follower_id: row.user_id,
            full_name: row.full_name,
            profile_pic_path: row.profile_pic_path,
            username: row.username
        }));


        res.json({ followerUsers });


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
        SELECT DISTINCT P1.people_id,P1.username, P1.first_name, P1.last_name, P1.profile_pic_path,
            (
                SELECT COUNT(DISTINCT followed_id)
                FROM "Fiction Profile"."FOLLOW" F
                WHERE F.user_id = $1 AND F.followed_id IN (
                    SELECT followed_id
                    FROM "Fiction Profile"."FOLLOW"
                    WHERE user_id = P1.people_id          )
         ) AS mutual_followers_count
        FROM "Fiction Profile"."PEOPLE" P1
        WHERE P1.people_id IN (                
            SELECT people_id
            FROM "Fiction Profile"."PEOPLE"
            WHERE people_id NOT IN (
                SELECT F1.followed_id
                FROM "Fiction Profile"."FOLLOW" F1
                WHERE F1.user_id=$1 )
                AND people_id!= $1
        )  
        ORDER BY mutual_followers_count DESC                     
        `, [user_id]);

        const peopleYouMayKnow = result.rows.map(row => ({
            people_id: row.people_id,
            full_name: `${row.first_name} ${row.last_name}`,
            profile_pic_path: row.profile_pic_path,
            username: row.username,
            mutual_followers_count: row.mutual_followers_count
        }));
        // console.log(peopleYouMayKnow);

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

        res.status(200).json({ message: 'User followed successfully', success: true });
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

        res.status(200).json({ message: 'User unfollowed successfully', success: true });
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


router.get('/trending_posts', async (req, res) => {
    try {
        console.log('Fetching trending feed data...');
        const result = await pool.query(`
        WITH T AS(
            SELECT P1.post_id,P1.user_id,P1.title, P1.content,P1.last_edit,
            (SELECT profile_pic_path FROM "Fiction Profile"."PEOPLE" WHERE people_id= P1.user_id) 
                     AS profile_pic_path,
            (SELECT COUNT(*)
                FROM "Fiction Profile"."POST_VOTE" P2
                WHERE P1.post_id= P2.post_id
                ) + (SELECT COUNT(*)
                FROM "Fiction Profile"."COMMENT" C1
                WHERE P1.post_id= C1.post_id)						
                AS total_votes							
            FROM "Fiction Profile"."POST" P1 
            WHERE DATE_PART('day', CURRENT_DATE - P1.last_edit) <= 30
            ORDER BY total_votes DESC
             LIMIT 3	 
        )
        SELECT T.*, 
        (SELECT username FROM "Fiction Profile"."PEOPLE" 
                WHERE people_id = T.user_id) AS post_username,
        (DATE_PART('day', CURRENT_DATE - last_edit)) AS  days_before, 
        C.comment_id,C.user_id as comment_user_id,
        (SELECT username FROM "Fiction Profile"."PEOPLE"
                 WHERE people_id= C.user_id) AS comment_username,
        C.content as comment_content 
        FROM T JOIN "Fiction Profile"."COMMENT" C
        ON T.post_id = C.post_id
        ORDER BY  T.post_id DESC
        `);
        const feedData = {};

        result.rows.forEach(row => {
            if (!feedData[row.post_id]) {
                // Initialize the post if it doesn't exist in the feed data
                feedData[row.post_id] = {
                    post_id: row.post_id,
                    user_id: row.user_id,
                    post_username: row.post_username,
                    title: row.title,
                    content: row.content,
                    last_edit: row.last_edit,
                    profile_pic_path: row.profile_pic_path,
                    comments: [], // Initialize comments as an empty array
                    days_before: row.days_before,
                };
            }

            if (row.comment_id) {
                // Add comments to the respective post
                feedData[row.post_id].comments.push({
                    comment_id: row.comment_id,
                    user_id: row.comment_user_id,
                    comment_username: row.comment_username,
                    content: row.comment_content
                });
            }
        }
        );

        const feed = Object.values(feedData);
        // console.log(feed);
        res.json({ feed });
    } catch (error) {
        console.error('Error fetching feed data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
