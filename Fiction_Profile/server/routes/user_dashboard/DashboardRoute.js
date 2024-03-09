const express = require('express');
const router = express.Router();
const pool = require("../../db");




router.post('/edit_post', async (req, res) => {
    try {
        const { post_id, title, content, userId } = req.body;
        console.log(req.body);

        // update with the new content
        const result = await pool.query(`
            UPDATE "Fiction Profile"."POST"
            SET title = $1, content = $2
            WHERE post_id = $3 AND user_id = $4
            `, [title, content, post_id, userId]);
        console.log('Post edited successfully');

        res.status(200).json({ success: true, message: 'Post edited successfully' });
    }
    catch (error) {
        console.error('Error editing post:', error);
        res.status(400).json({ error: 'Error editing post' });
    }
});


router.post('/delete_post', async (req, res) => {
    try {
        const { post_id, userId } = req.body;
        console.log(req.body);

        // delete the post
        const result = await pool.query(`
            DELETE FROM "Fiction Profile"."POST"
            WHERE post_id = $1 AND user_id = $2
            `, [post_id, userId]);
        console.log('Post deleted successfully');

        res.status(200).json({ success: true, message: 'Post deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting post:', error);
        res.status(400).json({ error: 'Error deleting post' });
    }
});


router.get('/get_my_media', async (req, res) => {
    try {
        const { user_id, mediaTypes, pageNumber, statusTypes } = req.query; // Extract parameters from query string
        if (!user_id || user_id.trim() === '') {
            return res.status(400).json({ success: false, message: 'Invalid user_id' });
        }


        let mediaTypeInclude = mediaTypes ? [...mediaTypes.include].map(type => parseInt(type)) : [];
        let statusTypeInclude = statusTypes ? [...statusTypes.include].map(type => parseInt(type)) : [];



        console.log(req.query);
        const result = await pool.query(
            `
            SELECT ML.media_id AS key_id, M.title,
					CASE
                    WHEN M.type_id IN (1, 2) THEN CONCAT('https://image.tmdb.org/t/p/original/', M.poster_path)
                    ELSE M.poster_path
                END AS poster_path,
					CASE
                        WHEN M.type_id = 1 THEN 'MOVIE'
                        WHEN M.type_id = 2 THEN 'TV'
                        WHEN M.type_id = 3 THEN 'BOOK'
                        ELSE 'MANGA'
                END AS type,
					CASE
                        WHEN M.type_id = 1 THEN M.movie_id
                        WHEN M.type_id = 2 THEN M.tv_id
                        WHEN M.type_id = 3 THEN M.book_id
                    ELSE M.manga_id
                END AS id,
					CASE
                        WHEN ML.status_id = 1 THEN 'READ/WATCHED'
                        WHEN ML.status_id = 2 THEN 'Plan to Read/Watch'                    
                        ELSE 'Currently Reading/Watching'
                END AS status_type

				FROM "Fiction Profile"."USER_MEDIA_LIST" ML
                    JOIN "Fiction Profile"."MEDIA" M
                    ON ML.media_id= M.media_id
                    WHERE ML.user_id=$1 AND (M.type_id = ANY($2::int[]) OR $2 = '{}') AND (ML.status_id = ANY($4::int[]) OR $4 = '{}')
                    LIMIT 14
                    OFFSET (($3 - 1) * 14)
            `,
            [user_id, mediaTypeInclude, pageNumber, statusTypeInclude]
        );


        console.log("Succesfully fetched user's media list");
        return res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
);


router.get('/get_fav', async (req, res) => {
    try {
        console.log('Fetching favorite media');
        const { user_id, mediaTypes, pageNumber } = req.query;
        // console.log(req.query);

        // Check if user_id is not an empty string
        if (!user_id || user_id.trim() === '') {
            return res.status(400).json({ success: false, message: 'Invalid user_id' });
        }

        let mediaTypeInclude = mediaTypes ? [...mediaTypes.include].map(type => parseInt(type)) : [];


        const result = await pool.query(`
        SELECT
        F.media_id AS key_id,
        M.type_id,
        M.title,
        CASE
                   WHEN M.type_id IN (1, 2) THEN CONCAT('https://image.tmdb.org/t/p/original/', M.poster_path)
                      ELSE M.poster_path 
                  END AS poster_path,
        CASE 
                  WHEN M.type_id = 1 THEN 'MOVIE' 
                  WHEN M.type_id = 2 THEN 'TV' WHEN M.type_id = 3 THEN 'BOOK'
                   ELSE 'MANGA' 
                   END AS type,
        CASE 
                  WHEN M.type_id = 1 	THEN M.movie_id
                   WHEN M.type_id = 2 THEN M.tv_id 
                  WHEN M.type_id = 3 THEN M.book_id 
                  ELSE M.manga_id 
                  END AS id
      FROM "Fiction Profile"."FAVORITE" F
      JOIN "Fiction Profile"."MEDIA" M ON F.media_id = M.media_id
      WHERE F.user_id = $1 AND (M.type_id = ANY($2::int[]) OR $2 = '{}')
      ORDER BY F.media_id
      LIMIT 15 
              OFFSET (($3 - 1) * 15)
      `, [user_id, mediaTypeInclude, pageNumber]);


        return res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching favorite media:', error);
        res.status(500).json({ success: false, message: 'Error fetching favorite media' });
    }
});

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

router.get('/:people_id/favorites/media_type', async (req, res) => {
    try {
        console.log('Fetching favorite items');
        const { people_id } = req.params;
        const result = await pool.query(`
        WITH T AS(
			SELECT *
			FROM "Fiction Profile"."FAVORITE"
			WHERE user_id=$1
		)
		SELECT M.type_id, COUNT(*)
		FROM T LEFT JOIN "Fiction Profile"."MEDIA" M
		ON T.media_id =  M.media_id
		GROUP BY M.type_id
        ORDER BY M.type_id
        `, [people_id]);

        // console.log('Favorite items:', result.rows);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching favorite items:', error);
        res.status(400).json({ error: 'Error fetching favorite items' });
    }
});


router.get('/:people_id/fav_genres', async (req, res) => {
    try {
        const { people_id } = req.params;
        const
            result = await pool.query(`
        WITH T AS(
        	SELECT *
        	FROM "Fiction Profile"."FAVORITE"
        	WHERE user_id=$1
        )
        SELECT  (SELECT name FROM "Fiction Profile"."GENRE" WHERE G.genre_id =id) , COUNT(*)
        FROM T LEFT JOIN 
        "Fiction Profile"."MEDIA_GENRE" G
        ON T.media_id =  G.media_id
        WHERE (SELECT name FROM "Fiction Profile"."GENRE" WHERE G.genre_id =id)  IS NOT NULL
        GROUP BY G.genre_id
        `, [people_id]);
        const data = result.rows.map(row => ({
            name: row.name,
            count: parseInt(row.count) // Ensure count is parsed as an integer
        }));

        // Send the mapped data as JSON in the response
        // console.log('Favorite genres:', data);
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching favorite genres:', error);
        res.status(400).json({ error: 'Error fetching favorite genres' });
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



router.get('/:people_id/affinity/favorite_count', async (req, res) => {
    try {
        const { my_id, people_id } = req.query;
        console.log('Fetching affinity data');

        const result = await pool.query(`
        		
            WITH T AS (
                SELECT user_id, M.type_id, COUNT(*) AS count
                FROM "Fiction Profile"."FAVORITE" F
                JOIN "Fiction Profile"."MEDIA" M ON F.media_id = M.media_id
                WHERE user_id IN ($1, $2) -- Specify the user IDs here
                GROUP BY user_id, M.type_id
                ORDER BY user_id, M.type_id
            )
            SELECT *
            FROM T
        `, [my_id, people_id]);

        // console.log('Affinity data:', result.rows);

        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching affinity data:', error);
        res.status(400).json({ error: 'Error fetching affinity data' });
    }
}
);

router.get('/general_counts/:people_id', async (req, res) => {
    try {
        const { people_id } = req.params;
        // console.log('Fetching general counts' + people_id);

        const result = await pool.query(`
        SELECT
            (SELECT COUNT(*) FROM "Fiction Profile"."POST"
                    WHERE user_id = $1) AS posts,
            (SELECT COUNT(*) FROM "Fiction Profile"."FAVORITE" 
                    WHERE user_id = $1) AS favorites,
            (SELECT COUNT(*) FROM "Fiction Profile"."FOLLOW"
                      WHERE user_id =$1) AS followers,
            (SELECT COUNT(*) FROM "Fiction Profile"."FOLLOW" 
                     WHERE followed_id=$1) AS following
	
        `, [people_id]);

        // console.log('General counts:', result.rows);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching general counts:', error);
        res.status(400).json({ error: 'Error fetching general counts' });
    }
});

router.get('/media_list_count/:people_id', async (req, res) => {
    try {
        const { people_id } = req.params;
        console.log('Fetching media list count' + people_id);

        const result = await pool.query(`
        SELECT 
            SUM(CASE WHEN status_id = 1 THEN 1 ELSE 0 END) AS read,
            SUM(CASE WHEN status_id = 2 THEN 1 ELSE 0 END) AS plan,
            SUM(CASE WHEN status_id = 3 THEN 1 ELSE 0 END) AS currently
        FROM 
            "Fiction Profile"."USER_MEDIA_LIST"
        WHERE 
            user_id = $1;
        `, [people_id]);

        console.log('Media list count: ', result.rows);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching media list count:', error);
        res.status(400).json({ error: 'Error fetching media list count' });
    }
}
);





module.exports = router;
