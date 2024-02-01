const express = require("express");
const router = express.Router();
const pool = require("../../db");

router.post('/', async (req, res) => {
    try {
        // Get user_id, title_id ex: movie_id,tv_id,manga_id,book_id
        const { user_id, media_type, title_id } = req.body;
        console.log(user_id, media_type, title_id);

        // Check if the movie is in the favorite table
        if (media_type === 'movie') {
            const result = await pool.query(
                'SELECT * FROM "Fiction Profile"."FAVORITE" WHERE user_id = $1 AND media_id IN (SELECT media_id FROM "Fiction Profile"."MEDIA" WHERE movie_id = $2)',
                [user_id, title_id]
            );
            // If the movie is not in the favorite table, insert it
            if (result.rows.length === 0) {
                const mediaResult = await pool.query(
                    'INSERT INTO "Fiction Profile"."FAVORITE" (user_id, media_id) SELECT $1, media.media_id FROM "Fiction Profile"."MEDIA" media WHERE media.movie_id = $2;',
                    [user_id, title_id]
                );
                //added to favorite succesfully
                console.log("Movie added to user favortie lsit succesfully");

            } else {
                await pool.query(
                    'DELETE FROM "Fiction Profile"."FAVORITE" WHERE user_id = $1 AND media_id IN (SELECT media_id FROM "Fiction Profile"."MEDIA" WHERE movie_id = $2)',
                    [user_id, title_id]
                );
                console.log('Movie removed from favorite table');
            }
        }

        else if (media_type === 'tvshow') {
            const result = await pool.query(
                'SELECT * FROM "Fiction Profile"."FAVORITE" WHERE user_id = $1 AND media_id IN (SELECT media_id FROM "Fiction Profile"."MEDIA" WHERE tv_id = $2)',
                [user_id, title_id]
            );
            if (result.rows.length === 0) {
                await pool.query(
                    'INSERT INTO "Fiction Profile"."FAVORITE" (user_id, media_id) SELECT $1, media.media_id FROM "Fiction Profile"."MEDIA" media WHERE media.tv_id = $2;',
                    [user_id, title_id]
                );
                console.log("TV Show added to user favortie lsit succesfully");
            } else {
                await pool.query(
                    'DELETE FROM "Fiction Profile"."FAVORITE" WHERE user_id = $1 AND media_id IN (SELECT media_id FROM "Fiction Profile"."MEDIA" WHERE tv_id = $2)',
                    [user_id, title_id]
                );
                console.log('TV Show removed from favorite table');
            }
        }

    
        else if (media_type === 'manga') {
            const result = await pool.query(
                'SELECT * FROM "Fiction Profile"."FAVORITE" WHERE user_id = $1 AND media_id IN (SELECT media_id FROM "Fiction Profile"."MEDIA" WHERE manga_id = $2)',
                [user_id, title_id]
            );
            if (result.rows.length === 0) {
                await pool.query(
                    'INSERT INTO "Fiction Profile"."FAVORITE" (user_id, media_id) SELECT $1, media.media_id FROM "Fiction Profile"."MEDIA" media WHERE media.manga_id = $2;',
                    [user_id, title_id]
                );
                console.log("Manga added to user favortie lsit succesfully");
            } else {
                await pool.query(
                    'DELETE FROM "Fiction Profile"."FAVORITE" WHERE user_id = $1 AND media_id IN (SELECT media_id FROM "Fiction Profile"."MEDIA" WHERE manga_id = $2)',
                    [user_id, title_id]
                );
                console.log('Manga removed from favorite table');
            }
        }


        else if (media_type === 'book') {
            const result = await pool.query(
                'SELECT * FROM "Fiction Profile"."FAVORITE" WHERE user_id = $1 AND media_id IN (SELECT media_id FROM "Fiction Profile"."MEDIA" WHERE book_id = $2)',
                [user_id, title_id]
            );
            if (result.rows.length === 0) {
                await pool.query(
                    'INSERT INTO "Fiction Profile"."FAVORITE" (user_id, media_id) SELECT $1, media.media_id FROM "Fiction Profile"."MEDIA" media WHERE media.book_id = $2;',
                    [user_id, title_id]
                );
                console.log("Book added to user favortie lsit succesfully");
            } else {
                await pool.query(
                    'DELETE FROM "Fiction Profile"."FAVORITE" WHERE user_id = $1 AND media_id IN (SELECT media_id FROM "Fiction Profile"."MEDIA" WHERE book_id = $2)',
                    [user_id, title_id]
                );
                console.log('Book removed from favorite table');
            }
        }
        res.json(true);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}
);

module.exports = router;