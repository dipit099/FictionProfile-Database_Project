const express = require("express");
const router = express.Router();
const pool = require("../../db");
// Endpoint to get movie details by ID

router.get('/movie', async (req, res) => {
    try {

        // TO-DO favortie mechanism

        const people_id = req.query.people_id;


        const result = await pool.query(
            'SELECT id, title, poster_path, vote_average,(SELECT COUNT(*) FROM "Fiction Profile"."FAVORITE" WHERE user_id = $1  AND media_id = (SELECT media_id FROM "Fiction Profile"."MEDIA" WHERE movie_id=movie.id)) AS is_favorite FROM "Fiction Profile"."MOVIE" movie ORDER BY vote_count DESC LIMIT 20'
        ,
        [people_id]
        ); 
        const media = result.rows.map(movie => ({
            id: movie.id,
            title: movie.title,
            poster_path: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
            vote_average: movie.vote_average,
            is_favorite: movie.is_favorite
        }));

        res.json({ media });
        //console.log(media);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




router.get('/tvshow', async (req, res) => {
    try {
        
        const people_id = req.query.people_id;

        const result = await pool.query(
            'SELECT id, title, poster_path, vote_average, first_air_date, last_air_date, (SELECT COUNT(*) FROM "Fiction Profile"."FAVORITE" WHERE user_id = $1  AND media_id = (SELECT media_id FROM "Fiction Profile"."MEDIA" WHERE tv_id=tvshow.id)) AS is_favorite FROM "Fiction Profile"."TVSHOW" tvshow ORDER BY vote_count DESC LIMIT 20'
        ,
        [people_id]
        );

        const media = result.rows.map(movie => ({
            id: movie.id,
            title: movie.title,
            poster_path: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
            vote_average: movie.vote_average,
            first_air_date: movie.first_air_date,
            last_air_date: movie.last_air_date,
            is_favorite: movie.is_favorite
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
            'SELECT id, title, poster_path, author, (SELECT COUNT(*) FROM "Fiction Profile"."FAVORITE" WHERE user_id = $1  AND media_id = (SELECT media_id FROM "Fiction Profile"."MEDIA" WHERE book_id=book.id)) AS is_favorite FROM "Fiction Profile"."BOOK" book ORDER BY id DESC LIMIT 20'
        ,
        [people_id]
        );

        const media = result.rows.map(movie => ({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            author: movie.author,
            is_favorite: movie.is_favorite
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
            'SELECT id, title, poster_path, vote_average, (SELECT COUNT(*) FROM "Fiction Profile"."FAVORITE" WHERE user_id = $1  AND media_id = (SELECT media_id FROM "Fiction Profile"."MEDIA" WHERE manga_id=manga.id)) AS is_favorite FROM "Fiction Profile"."MANGA" manga ORDER BY members DESC LIMIT 20'
        ,
        [people_id]
        );


        const media = result.rows.map(movie => ({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            vote_average: movie.vote_average,
            is_favorite: movie.is_favorite
        }));

        res.json({ media });
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
);

module.exports = router;
