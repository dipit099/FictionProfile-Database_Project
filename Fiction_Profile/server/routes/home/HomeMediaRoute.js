const express = require("express");
const router = express.Router();
const pool = require("../../db");
// Endpoint to get movie details by ID

router.get('/movie', async (req, res) => {
    try {
        const people_id = req.query.people_id;

        const result = await pool.query(
            `   
                SELECT
                    media.movie_id,
                    media.title,
                    media.poster_path,
                    media.rating,
                    media.vote_count,
                    (SELECT COUNT(*) FROM "Fiction Profile"."FAVORITE" WHERE user_id = $1 AND media_id = media.media_id) AS is_favorite
                FROM
                    "Fiction Profile"."MEDIA" media
                WHERE
                    media.movie_id IS NOT NULL
                ORDER BY
                    media.vote_count DESC
                LIMIT 20
            `
            ,[people_id]
        ); 

        const media = result.rows.map(mediaItem => ({
            id: mediaItem.movie_id,
            title: mediaItem.title,
            poster_path: `https://image.tmdb.org/t/p/original/${mediaItem.poster_path}`,
            rating: mediaItem.rating,
            vote_count: mediaItem.vote_count,
            is_favorite: mediaItem.is_favorite
        }));
        

        res.json({ media });
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




router.get('/tvshow', async (req, res) => {
    try {
        
        const people_id = req.query.people_id;

        const result = await pool.query(
            `   
                SELECT
                    media.tv_id,
                    media.title,
                    media.poster_path,
                    media.rating,
                    media.vote_count,
                    (SELECT COUNT(*) FROM "Fiction Profile"."FAVORITE" WHERE user_id = $1 AND media_id = media.media_id) AS is_favorite
                FROM
                    "Fiction Profile"."MEDIA" media
                WHERE
                    media.tv_id IS NOT NULL
                ORDER BY
                    media.vote_count DESC
                LIMIT 20
            `
            ,[people_id]
        );

        const media = result.rows.map(tvshow => ({
            id: tvshow.tv_id,
            title: tvshow.title,
            poster_path: `https://image.tmdb.org/t/p/original/${tvshow.poster_path}`,
            rating: tvshow.rating,
            vote_count: tvshow.vote_count,
            is_favorite: tvshow.is_favorite
        }));

        res.json({ media });
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/book', async (req, res) => {
    try {

        const people_id = req.query.people_id;
    
        const result = await pool.query(
            `   
                SELECT
                    media.book_id,
                    media.title,
                    media.poster_path,
                    media.rating,
                    media.vote_count,
                    (SELECT COUNT(*) FROM "Fiction Profile"."FAVORITE" WHERE user_id = $1 AND media_id = media.media_id) AS is_favorite
                FROM
                    "Fiction Profile"."MEDIA" media
                WHERE
                    media.book_id IS NOT NULL
                ORDER BY
                    media.vote_count DESC
                LIMIT 20
            `
            ,[people_id]
        );

        const media = result.rows.map(book => ({
            id: book.book_id,
            title: book.title,
            poster_path: book.poster_path,
            rating: book.rating,
            vote_count: book.vote_count,
            is_favorite: book.is_favorite
        }));

        res.json({ media });
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
);

router.get('/manga', async (req, res) => {
    try {
        
        const people_id = req.query.people_id;

        const result = await pool.query(
            `   
                SELECT
                    media.manga_id,
                    media.title,
                    media.poster_path,
                    media.rating,
                    media.vote_count,
                    (SELECT COUNT(*) FROM "Fiction Profile"."FAVORITE" WHERE user_id = $1 AND media_id = media.media_id) AS is_favorite
                FROM
                    "Fiction Profile"."MEDIA" media
                WHERE
                    media.manga_id IS NOT NULL
                ORDER BY
                    media.vote_count DESC
                LIMIT 20
            `
            ,[people_id]
        );


        const media = result.rows.map(manga => ({
            id: manga.manga_id,
            title: manga.title,
            poster_path: manga.poster_path,
            rating: manga.rating,
            vote_count: manga.vote_count,
            is_favorite: manga.is_favorite
        }));

        res.json({ media });
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
);

module.exports = router;
