
const express = require('express');
const router = express.Router();
const pool = require('../../db');

// router.post('/add_media', async (req, res) => {
//     try {
//         console.log("Adding media:", req.body);

//         // Here, you can process the data received from the client and perform necessary actions.

//         res.status(200).json({ message: "Media added successfully" });
//     } catch (error) {
//         console.error("Error adding media:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });


router.post("/add_media", async (req, res) => {
  try {
    console.log("Adding media:", req.body);
    const { moderatorId, mediaType, title, year, language, runtime, genre, overview, posterImage, isbn } = req.body;

    console.log("mediaType:", mediaType);
    console.log("title:", title);
    console.log("year:", year);
    console.log("language:", language);
    console.log("runtime:", runtime);
    console.log("genre:", genre);
    console.log("overview:", overview);
    console.log("posterImage:", posterImage);
    console.log("isbn:", isbn);
    console.log("moderatorId:", moderatorId);

    const client = await pool.connect();
    let procedureName;
    let query;
    switch (mediaType) {
      case "movie":
        procedureName = "insert_movie";
        query = {
          text: `CALL "Fiction Profile".${procedureName}($1, $2, $3, $4, $5::TEXT[], $6, $7)`,
          values: [
            title,
            year === '' ? null : year,
            language === '' ? null : language,
            runtime,
            genre,
            overview ? overview : null,
            moderatorId
          ],
        };
        break;
      case "manga":
        procedureName = "insert_manga";
        // Add your logic for the insert_manga procedure here
        query = {
          text: `CALL "Fiction Profile".${procedureName}($1, $2, $3::TEXT[], $4)`,
          values: [
            title,
            year === '' ? null : year,
            genre,
            moderatorId
          ],
        };
        
        break;
      case "tv":
        procedureName = "insert_tv";
        // Add your logic for the insert_tv procedure here
        query = {
          text: `CALL "Fiction Profile".${procedureName}($1, $2, $3, $4::TEXT[], $5, $6)`,
          values: [
            title,
            year === '' ? null : year,
            language === '' ? null : language,
            genre,
            overview ? overview : null,
            moderatorId
          ],
        };

        break;
      case "book":
        procedureName = "insert_book";
        query = {
          text: `CALL "Fiction Profile".${procedureName}($1, $2, $3, $4::TEXT[], $5)`,
          values: [
            isbn,
            title,
            year === '' ? null : year,
            genre,
            moderatorId
          ],
        };
        break;
      default:
        return res.status(400).json({ error: "Invalid media type" });
    }

    if (query) {
      await client.query(query);
      client.release();
      res.json({ message: "Media added successfully" });
    } else {
      client.release();
      res.status(400).json({ error: "Procedure not implemented" });
    }
  } catch (error) {
    console.error("Error adding media:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.post('/edit_media', async (req, res) => {
    try {
        console.log("Editing media:", req.body);

        const { mediaId, mediaType, title, year, language, runtime, genre, overview, isbn, moderatorId } = req.body;


        console.log("mediaId:", mediaId);
        console.log("mediaType:", mediaType);
        console.log("title:", title);
        console.log("year:", year);
        console.log("language:", language);
        console.log("runtime:", runtime);
        console.log("genre:", genre);
        console.log("overview:", overview);
        console.log("isbn:", isbn);
        console.log("moderatorId:", moderatorId);



        let query;

        switch (mediaType) {
            case "movie":
                // Add your logic for editing a movie here

                query = {
                    text: `CALL "Fiction Profile".update_movie($1::int, $2, $3, $4, $5, $6::TEXT[], $7::TEXT, $8)`,
                    values: [
                        mediaId,
                        title,
                        year === '' ? null : year,
                        language === '' ? null : language,
                        runtime,
                        genre ? genre : null,
                        overview ? overview : null,
                        moderatorId
                    ],
                };

                break;
            case "manga":
                // Add your logic for editing a manga here
                query = {
                    text: `CALL "Fiction Profile".update_manga($1::int, $2, $3, $4::TEXT[], $5)`,
                    values: [
                        mediaId,
                        title,
                        year === '' ? null : year,
                        genre ? genre : [],
                        moderatorId
                    ],
                };

                break;
            case "tv":
                // Add your logic for editing a tv show here
                query = {
                    text: `CALL "Fiction Profile".update_tv($1::int, $2, $3, $4, $5::TEXT[], $6::TEXT, $7)`,
                    values: [
                        mediaId,
                        title,
                        year === '' ? null : year,
                        language === '' ? null : language,
                        genre ? genre : [],
                        overview ? overview : null,
                        moderatorId
                    ],
                };

                break;
            case "book":
                // Add your logic for editing a book here
                query = {
                    text: `CALL "Fiction Profile".update_book($1::int, $2, $3, $4, $5::TEXT[], $6)`,
                    values: [
                        mediaId,
                        isbn,
                        title,
                        year === '' ? null : year,
                        genre ? genre : [],
                        moderatorId
                    ],
                };
                break;
            default:
                return res.status(400).json({ error: "Invalid media type" });
              
        }

        // Here, you can process the data received from the client and perform necessary actions.

        console.log("query:", query);
        
        await pool.query(query);

        res.status(200).json({ success:true,message: "Media edited successfully" });


    } catch (error) {
        console.error("Error editing media:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
);




router.post('/remove_media', async (req, res) => {
    try {
        console.log("Removing media:", req.body);

        const { media_id, mediaType, moderatorId } = req.body;
        // Here, you can process the data received from the client and perform necessary actions.
        //CREATE OR REPLACE PROCEDURE "Fiction Profile"."delete_media"("media_id_input" int8, "media_type" varchar, "moderator_id" int4)
        console.log("media_id:", media_id);
        console.log("mediaType:", mediaType);
        console.log("moderatorId:", moderatorId);
        let query;
        // dont use switch case for this
        query = {
            text: `CALL "Fiction Profile".delete_media($1::int, $2, $3::int)`,
            values: [
                media_id,
                mediaType,
                moderatorId
            ],
        };

        await pool.query(query);
        console.log("successfully removed media");
        res.status(200).json({success:true, message: "Media removed successfully" });

    } catch (error) {
        console.error("Error removing media:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;