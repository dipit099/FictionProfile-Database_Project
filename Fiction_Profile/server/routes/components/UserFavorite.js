const express = require("express");
const router = express.Router();
const pool = require("../../db");

router.post('/', async (req, res) => {
    try {
        // Get user_id, title_id ex: movie_id,tv_id,manga_id,book_id
        const { user_id, media_type, title_id } = req.body;

        let successMessage = '';
        let operationStatus = '';

        if (media_type === 'movie') {
            const result = await pool.query(
                'SELECT * FROM "Fiction Profile"."FAVORITE" WHERE user_id = $1 AND media_id IN (SELECT media_id FROM "Fiction Profile"."MEDIA" WHERE movie_id = $2)',
                [user_id, title_id]
            );
            if (result.rows.length === 0) {
                await pool.query(
                    'INSERT INTO "Fiction Profile"."FAVORITE" (user_id, media_id) SELECT $1, media.media_id FROM "Fiction Profile"."MEDIA" media WHERE media.movie_id = $2;',
                    [user_id, title_id]
                );
                successMessage = 'Movie added to user favorite list successfully';
                operationStatus = 'added';
            } else {
                await pool.query(
                    'DELETE FROM "Fiction Profile"."FAVORITE" WHERE user_id = $1 AND media_id IN (SELECT media_id FROM "Fiction Profile"."MEDIA" WHERE movie_id = $2)',
                    [user_id, title_id]
                );
                successMessage = 'Movie removed from user favorite list successfully';
                operationStatus = 'removed';
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
                successMessage = 'TV Show added to user favorite list successfully';
                operationStatus = 'added';
            } else {
                await pool.query(
                    'DELETE FROM "Fiction Profile"."FAVORITE" WHERE user_id = $1 AND media_id IN (SELECT media_id FROM "Fiction Profile"."MEDIA" WHERE tv_id = $2)',
                    [user_id, title_id]
                );
                successMessage = 'TV Show removed from user favorite list successfully';
                operationStatus = 'removed';
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
                successMessage = 'Manga added to user favorite list successfully';
                operationStatus = 'added';
            } else {
                await pool.query(
                    'DELETE FROM "Fiction Profile"."FAVORITE" WHERE user_id = $1 AND media_id IN (SELECT media_id FROM "Fiction Profile"."MEDIA" WHERE manga_id = $2)',
                    [user_id, title_id]
                );
                successMessage = 'Manga removed from user favorite list successfully';
                operationStatus = 'removed';
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
                successMessage = 'Book added to user favorite list successfully';
                operationStatus = 'added';
            } else {
                await pool.query(
                    'DELETE FROM "Fiction Profile"."FAVORITE" WHERE user_id = $1 AND media_id IN (SELECT media_id FROM "Fiction Profile"."MEDIA" WHERE book_id = $2)',
                    [user_id, title_id]
                );
                successMessage = 'Book removed from user favorite list successfully';
                operationStatus = 'removed';
            }
        }

        // Send JSON response indicating the success or failure of the operation
        console.log(successMessage);
        res.status(200).json({ success: true, message: successMessage, status: operationStatus });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

module.exports = router;
