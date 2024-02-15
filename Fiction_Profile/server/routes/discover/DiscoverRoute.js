// discoverRoute.js
const express = require("express");
const router = express.Router();
const pool = require("../../db");

// serach string, user id, page, page size
// 3 arrays for genres : i) OR-Include
//                        ii) AND-Include
//                        iii) Exclude
// 2 arrays for media type: i) Include
//                          ii) Exclude
// Year range : start, end
// Rating range : start, end
// Sort by : i) Rating
//           ii) Popularity
//           iii) Release Date
//           iv) Title
//           v) Vote Count
// ASC OR DESC

// I will send genre list
// media type list


router.get('/genre', async (req, res) => {
    try {
        const genreQuery = `
            SELECT 
                id, 
                name
            FROM 
                "Fiction Profile"."GENRE"`;
        
        const genreResult = await pool.query(genreQuery);
        
        const genres = genreResult.rows.map(genreItem => ({
            id: genreItem.id,
            name: genreItem.name
        }));
        // Send the genre data as JSON response
        res.json({ genres });
    } catch (error) {
        console.error('Error during genre fetch:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}
);

router.get('/mediaType', async (req, res) => {
    try {
        const mediaTypeQuery = `
            SELECT 
                type_id, 
                type_name
            FROM 
                "Fiction Profile"."MEDIA_TYPE"`;
        
        const mediaTypeResult = await pool.query(mediaTypeQuery);
        
        const mediaTypes = mediaTypeResult.rows.map(mediaTypeItem => ({
            id: mediaTypeItem.type_id,
            name: mediaTypeItem.type_name
        }));
        // Send the media type data as JSON response
        res.json({ mediaTypes });
    } catch (error) {
        console.error('Error during media type fetch:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}
);



// router.get('/', async (req, res) => {

//     const {userId, page, pageSize } = req.query;

//     // Set default values for page and page size if not provided
//     const pageNumber = parseInt(page) || 1;
//     const limit = parseInt(pageSize) || 10; // Default page size is 10

//     try {
//         // Calculate the offset based on the page number and page size
//         const offset = (pageNumber - 1) * limit;

//         // Fetch data from the database or an external API for discovery
//         const discoverQuery = `
//             SELECT 
//                 title, 
//                 poster_path, 
//                 rating, 
//                 vote_count,
//                 CASE
//                     WHEN type_id = 1 THEN movie_id
//                     WHEN type_id = 2 THEN tv_id
//                     WHEN type_id = 3 THEN book_id
//                     WHEN type_id = 4 THEN manga_id
//                 END AS id,
//                 (SELECT type_name FROM "Fiction Profile"."MEDIA_TYPE" WHERE type_id = media.type_id) AS media_type,
//                 (SELECT COUNT(*) FROM "Fiction Profile"."FAVORITE" WHERE user_id = $1 AND media_id = media.media_id) AS is_favorite
//             FROM 
//                 "Fiction Profile"."MEDIA" media
//             ORDER BY media.vote_count DESC
//             LIMIT $2 OFFSET $3`;
        
//         const discoverResult = await pool.query(discoverQuery, [userId, limit, offset]);
        
//         const media = discoverResult.rows.map(mediaItem => ({
//             id: mediaItem.id,
//             title: mediaItem.title,
//             // poster_path: mediaItem.poster_path, // Use the full URL for the poster path, for movies and tv add extra path for manga and boos use the given path from database
//             poster_path: mediaItem.media_type === 'movie' || mediaItem.media_type === 'tv' ? `https://image.tmdb.org/t/p/w500${mediaItem.poster_path}` : mediaItem.poster_path,
//             rating: mediaItem.rating,
//             is_favorite: mediaItem.is_favorite,
//             type: mediaItem.media_type
//         }));
//         // Send the media data as JSON response
//         res.json({ media });
//     } catch (error) {
//         console.error('Error during discovery:', error.message);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });



router.get('/', async (req, res) => {
    
    const { userId, page, pageSize, search, genres, mediaTypes, yearStart, yearEnd, ratingStart, ratingEnd, sortBy , sortSequence} = req.query;

    // Set default values for page and page size if not provided
    const pageNumber = parseInt(page) || 1;
    const limit = parseInt(pageSize) || 10; // Default page size is 10

    const genreInclude = genres ? JSON.parse(genres).include : [];
    const genreExclude = genres ? JSON.parse(genres).exclude : [];

    // b
    const mediaTypeInclude = mediaTypes ? JSON.parse(mediaTypes).include : [];
    const mediaTypeExclude = mediaTypes ? JSON.parse(mediaTypes).exclude : [];

    const sortByQ = sortBy || 'title';
    const sortSequenceQ = sortSequence || 'ASC';


    try {
        // Calculate the offset based on the page number and page size
        const offset = (pageNumber - 1) * limit;

        // Build the SQL query dynamically based on the provided parameters
        let discoverQuery = `
            SELECT 
                m.title, 
                m.poster_path, 
                m.rating, 
                m.vote_count,
                CASE
                    WHEN m.type_id = 1 THEN m.movie_id
                    WHEN m.type_id = 2 THEN m.tv_id
                    WHEN m.type_id = 3 THEN m.book_id
                    WHEN m.type_id = 4 THEN m.manga_id
                END AS id,
                (SELECT type_name FROM "Fiction Profile"."MEDIA_TYPE" WHERE type_id = m.type_id) AS media_type,
                (SELECT COUNT(*) FROM "Fiction Profile"."FAVORITE" WHERE user_id = $1 AND media_id = m.media_id) AS is_favorite
            FROM 
                "Fiction Profile"."MEDIA" m
            LEFT JOIN
                "Fiction Profile"."MEDIA_GENRE" mg ON m.media_id = mg.media_id
            WHERE
                (m.title ILIKE $2 OR $2 IS NULL)
                AND
                (m.year >= $3 OR $3 IS NULL)
                AND
                (m.year <= $4 OR $4 IS NULL)
                AND
                (m.rating >= $5 OR $5 IS NULL)
                AND
                (m.rating <= $6 OR $6 IS NULL)
                AND
                (m.type_id = ANY($7) OR $7 IS NULL)
                AND
                (m.type_id != ALL($8) OR $8 IS NULL)
                AND
                (
                    $9::int[] IS NULL 
                    OR 
                    ARRAY(SELECT genre_id FROM "Fiction Profile"."MEDIA_GENRE" WHERE media_id = m.media_id) @> $9::int[]
                )
                AND
                (
                    $10::int[] IS NULL 
                    OR 
                    NOT ARRAY(SELECT genre_id FROM "Fiction Profile"."MEDIA_GENRE" WHERE media_id = m.media_id) && $10::int[]
                )
            ORDER BY m.${sortByQ} ${sortSequenceQ}
            LIMIT $11 OFFSET $12`;

        // Execute the query
        const discoverResult = await pool.query(discoverQuery, [userId, `%${search}%`, yearStart, yearEnd, ratingStart, ratingEnd, mediaTypeInclude, mediaTypeExclude, genreInclude, genreExclude, limit, offset]); 
        
        // Map the result to the desired format
        const media = discoverResult.rows.map(mediaItem => ({
            id: mediaItem.id,
            title: mediaItem.title,
            poster_path: mediaItem.media_type === 'movie' || mediaItem.media_type === 'tv' ? `https://image.tmdb.org/t/p/w500${mediaItem.poster_path}` : mediaItem.poster_path,
            rating: mediaItem.rating,
            is_favorite: mediaItem.is_favorite,
            type: mediaItem.media_type
        }));

        // Send the media data as JSON response
        res.json({ media });
    } catch (error) {
        console.error('Error during discovery:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
