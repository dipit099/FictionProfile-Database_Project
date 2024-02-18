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
//           iii) Year
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

    console.log(req.query);

    let { userId, page, pageSize, search, genres, mediaTypes, yearStart, yearEnd, ratingStart, ratingEnd, sortBy, sortSequence } = req.query;

    // Set default values for page and page size if not provided
    const pageNumber = parseInt(page) || 1;
    const limit = parseInt(pageSize) || 10; // Default page size is 10

    search = search || '';
    search = search.toLowerCase();
    yearStart = yearStart || 0;
    yearEnd = yearEnd || 9999;
    ratingStart = ratingStart || 0;
    ratingEnd = ratingEnd || 10;

    userId = parseInt(userId) || 4;

    // Set default value for sortBy and sortSequence if not provided
    sortBy = sortBy || 'title';
    sortSequence = sortSequence || 'ASC';

    console.log(sortBy, sortSequence);

    // Parse genre and media type arrays or set them to empty arrays if not provided

    let genreOrInclude = genres ? genres.include : [];
    let genreAndInclude = genres ? genres.andInclude : [];
    let genreExclude = genres ? genres.exclude : [];

    let mediaTypeInclude = mediaTypes ? mediaTypes.include : [];
    let mediaTypeExclude = mediaTypes ? mediaTypes.exclude : [];

    // parse the media type arrays
    mediaTypeInclude = mediaTypeInclude ? mediaTypeInclude.map(type => parseInt(type)) : [];
    mediaTypeExclude = mediaTypeExclude ? mediaTypeExclude.map(type => parseInt(type)) : [];

    // parse the genre arrays
    genreOrInclude = genreOrInclude ? genreOrInclude.map(genre => parseInt(genre)) : [];
    genreAndInclude = genreAndInclude ? genreAndInclude.map(genre => parseInt(genre)) : [];
    genreExclude = genreExclude ? genreExclude.map(genre => parseInt(genre)) : [];

    try {
        // Calculate the offset based on the page number and page size
        const offset = (pageNumber - 1) * limit;

        // Build the SQL query dynamically based on the provided parameters
        let discoverQuery = `
            SELECT 
                DISTINCT m.media_id,
                m.title, 
                m.poster_path, 
                m.rating, 
                m.vote_count,
                m,year,
                CASE
                    WHEN m.type_id = 1 THEN m.movie_id
                    WHEN m.type_id = 2 THEN m.tv_id
                    WHEN m.type_id = 3 THEN m.book_id
                    WHEN m.type_id = 4 THEN m.manga_id
                END AS id,
                (SELECT type_name FROM "Fiction Profile"."MEDIA_TYPE" WHERE type_id = m.type_id) AS media_type,
                (SELECT COUNT(*) FROM "Fiction Profile"."FAVORITE" WHERE user_id = $1 AND media_id = m.media_id) AS is_favorite,
                -- list the genres of the media
                (SELECT array_agg(g.name) FROM "Fiction Profile"."GENRE" g WHERE g.id = ANY(SELECT mg.genre_id FROM "Fiction Profile"."MEDIA_GENRE" mg WHERE mg.media_id=m.media_id)) AS genres

            FROM 
                "Fiction Profile"."MEDIA" m
            WHERE
                (LOWER(m.title) ILIKE $2 OR $2 IS NULL)
                AND
                (m.year >= $3 OR $3 IS NULL)
                AND
                (m.year <= $4 OR $4 IS NULL)
                AND
                (   
                    m.rating = 0 OR (
                    (m.rating >= $5 OR $5 IS NULL)
                    AND
                    (m.rating <= $6 OR $6 IS NULL)
                    )
                )
                AND
                (m.type_id = ANY($7) OR $7 IS NULL)
                AND
                (m.type_id != ALL($8) OR $8 IS NULL)
                AND
                ("Fiction Profile"."check_genre_criteria"(m.media_id, $9::int[], $10::int[], $11::int[]) )
            ORDER BY m.${sortBy} ${sortSequence}
            LIMIT $12 OFFSET $13`;

        // Execute the query
        const discoverResult = await pool.query(discoverQuery, [userId, `%${search}%`, yearStart, yearEnd, ratingStart, ratingEnd, mediaTypeInclude, mediaTypeExclude, genreOrInclude, genreAndInclude, genreExclude, limit, offset]);


        console.log(discoverResult.rows);
        console.log("Discover Result rows length:");
        console.log(discoverResult.rows.length);


        //console.log(discoverResult.rows);

        // Map the result to the desired format
        const media = discoverResult.rows.map(mediaItem => ({
            key_id: mediaItem.media_id,
            id: mediaItem.id,
            title: mediaItem.title,
            poster_path: mediaItem.media_type === 'MOVIE' || mediaItem.media_type === 'TV' ? `https://image.tmdb.org/t/p/w500${mediaItem.poster_path}` : mediaItem.poster_path,
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
