const express = require("express");
const router = express.Router();
const pool = require("../../db");

router.post('/', async (req, res) => {
    try {
        // Get user_id, metia type ex: movie,tv,manga,book, title_id ex: movie_id,tv_id,manga_id,book_id, status_id
        const { user_id, media_type, title_id, status_id } = req.body;
        // console.log(req.body);
        // Check if it's movie or tvshow or manga or book. if it's in the USER_MEDIA_LIST table then no need for ny action
        // if not then insert into USER_MEDIA_LIST table
        if (media_type === 'movie') {
            const result = await pool.query(
                'SELECT * FROM "Fiction Profile"."USER_MEDIA_LIST" WHERE user_id = $1 AND media_id IN ( SELECT media_id FROM  "Fiction Profile"."MEDIA" WHERE movie_id = $2)',
                [user_id, title_id]

            );
            if (result.rows.length === 0) {
                await pool.query(
                    'INSERT INTO "Fiction Profile"."USER_MEDIA_LIST" (user_id, media_id, status_id) SELECT $1, media.media_id, $3 FROM  "Fiction Profile"."MEDIA" media WHERE media.movie_id = $2;',
                    [user_id, title_id, status_id]
                );
                console.log("Succesfully added movie to user's list")
            } else {
                // Update the list
                await pool.query(
                    'UPDATE "Fiction Profile"."USER_MEDIA_LIST" SET status_id = $3 WHERE user_id = $1 AND media_id IN ( SELECT media_id FROM  "Fiction Profile"."MEDIA" WHERE movie_id = $2)',
                    [user_id, title_id, status_id]
                );
                console.log("Succesfully updated movie to user's list")
            }

        }
        else if (media_type === 'tv') {
            const result = await pool.query(
                'SELECT * FROM "Fiction Profile"."USER_MEDIA_LIST" WHERE user_id = $1 AND media_id IN ( SELECT media_id FROM  "Fiction Profile"."MEDIA" WHERE tv_id = $2)',
                [user_id, title_id]
            );
            if (result.rows.length === 0) {
                await pool.query(
                    'INSERT INTO "Fiction Profile"."USER_MEDIA_LIST" (user_id, media_id, status_id) SELECT $1, media.media_id, $3 FROM  "Fiction Profile"."MEDIA" media WHERE media.tv_id = $2;',
                    [user_id, title_id, status_id]
                );
                console.log("Succesfully added tv to user's list")
            } else {
                // Update the list
                await pool.query(
                    'UPDATE "Fiction Profile"."USER_MEDIA_LIST" SET status_id = $3 WHERE user_id = $1 AND media_id IN ( SELECT media_id FROM  "Fiction Profile"."MEDIA" WHERE tv_id = $2)',
                    [user_id, title_id, status_id]
                );
                console.log("Succesfully updated tv to user's list")
            }
        }
        else if (media_type === 'manga') {
            const result = await pool.query(
                'SELECT * FROM "Fiction Profile"."USER_MEDIA_LIST" WHERE user_id = $1 AND media_id IN (SELECT media_id FROM  "Fiction Profile"."MEDIA" WHERE manga_id = $2)',
                [user_id, title_id]
            );

            if (resultManga.rows.length === 0) {
                await pool.query(
                    'INSERT INTO "Fiction Profile"."USER_MEDIA_LIST" (user_id, media_id, status_id) SELECT $1, media.media_id, $3 FROM  "Fiction Profile"."MEDIA" media WHERE media.manga_id = $2;',
                    [user_id, title_id, status_id]
                );
                console.log("Succesfully added manga to user's list")
            } else {
                // Update the list
                await pool.query(
                    'UPDATE "Fiction Profile"."USER_MEDIA_LIST" SET status_id = $3 WHERE user_id = $1 AND media_id IN ( SELECT media_id FROM  "Fiction Profile"."MEDIA" WHERE manga_id = $2)',
                    [user_id, title_id, status_id]
                );
                console.log("Succesfully updated manga to user's list")
            }

        }
        else if (media_type === 'book') {
            const result = await pool.query(
                'SELECT * FROM "Fiction Profile"."USER_MEDIA_LIST" WHERE user_id = $1 AND media_id IN (SELECT media_id FROM  "Fiction Profile"."MEDIA" WHERE book_id = $2)',
                [user_id, title_id]
            );
            if (result.rows.length === 0) {
                await pool.query(
                    'INSERT INTO "Fiction Profile"."USER_MEDIA_LIST" (user_id, media_id, status_id) SELECT $1, media.media_id, $3 FROM  "Fiction Profile"."MEDIA" media WHERE media.book_id = $2;',
                    [user_id, title_id, status_id]
                );
                console.log("Succesfully added book to user's list")
            } else {
                // Update the list
                await pool.query(
                    'UPDATE "Fiction Profile"."USER_MEDIA_LIST" SET status_id = $3 WHERE user_id = $1 AND media_id IN ( SELECT media_id FROM  "Fiction Profile"."MEDIA" WHERE book_id = $2)',
                    [user_id, title_id, status_id]
                );
                console.log("Succesfully updated book to user's list")

            }
        }

        res.json({ success: true });
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
);


router.get('/get_added_option', async (req, res) => {
    try {
        const { user_id, media_type, title_id } = req.query; // Extract parameters from query string
        // console.log(req.query);
        const extractId = await pool.query(
            `
            SELECT
                media_id
            FROM
                "Fiction Profile"."MEDIA"
            WHERE
                ${media_type}_id = $1           
            `,
            [title_id]
        );
        const mediaId = extractId.rows[0].media_id;
        const result = await pool.query(
            `
            SELECT
                status_id
            FROM
                "Fiction Profile"."USER_MEDIA_LIST"
            WHERE
                user_id = $1
            AND
                media_id = $2
            `,
            [user_id, mediaId]
        );
        console.log(result.rows);
        if (result.rows.length === 0) {
            res.json({ success: true, status_id: 0 });
        }
        else {
            res.json({ success: true, status_id: result.rows[0].status_id });
        }

    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
);
module.exports = router;