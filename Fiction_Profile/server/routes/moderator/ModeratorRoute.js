
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

function getTypeName(type_id) {
  switch (type_id) {
    case 1:
      return 'Movie';
    case 2:
      return 'TV';
    case 3:
      return 'Book';
    case 4:
      return 'Manga';
    default:
      return 'Unknown';
  }
}

router.post('/get_mod_stats', async (req, res) => {
  try {
    console.log("Getting moderator stats");
    const { moderatorId } = req.body;

    // Here, you can fetch moderator stats from the database and send it to the client.
    // console.log(moderatorId);

    const result = await pool.query(
      `  
      SELECT
      CASE
          WHEN EXISTS (SELECT 1 FROM "Fiction Profile"."MEDIA" M WHERE M.media_id = MM.media_id)
          THEN (SELECT type_id FROM "Fiction Profile"."MEDIA" M WHERE M.media_id = MM.media_id)
          ELSE (SELECT type_id FROM "Fiction Profile"."DELETED_MEDIA" D WHERE D.media_id = MM.media_id)
      END AS type_id,
      SUM(CASE WHEN operation_type = 'insert' THEN 1 ELSE 0 END) AS insert_count,
      SUM(CASE WHEN operation_type = 'update' THEN 1 ELSE 0 END) AS update_count,
      SUM(CASE WHEN operation_type = 'delete' THEN 1 ELSE 0 END) AS delete_count
      FROM "Fiction Profile"."MEDIA_LOG" MM
      WHERE moderator_id = $1
      AND (
      CASE
          WHEN EXISTS (SELECT 1 FROM "Fiction Profile"."MEDIA" M WHERE M.media_id = MM.media_id)
          THEN (SELECT type_id FROM "Fiction Profile"."MEDIA" M WHERE M.media_id = MM.media_id)
          ELSE (SELECT type_id FROM "Fiction Profile"."DELETED_MEDIA" D WHERE D.media_id = MM.media_id)
      END IS NOT NULL
      )
      GROUP BY
      CASE
          WHEN EXISTS (SELECT 1 FROM "Fiction Profile"."MEDIA" M WHERE M.media_id = MM.media_id)
          THEN (SELECT type_id FROM "Fiction Profile"."MEDIA" M WHERE M.media_id = MM.media_id)
          ELSE (SELECT type_id FROM "Fiction Profile"."DELETED_MEDIA" D WHERE D.media_id = MM.media_id)
      END;
  `,
      [moderatorId]
    );

    const statsObject = result.rows.map(row => ({
      type: getTypeName(row.type_id), // Convert type_id to type name
      insert_count: row.insert_count,
      update_count: row.update_count,
      delete_count: row.delete_count
    }));

    // Sending the mapped object as JSON
    console.log(statsObject);
    res.json(statsObject);



  } catch (error) {
    console.error("Error getting moderator stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
);


router.post("/add-media", async (req, res) => {
  try {
    const { mediaData, moderatorId, mediaType } = req.body;

    console.log(mediaData, moderatorId, mediaType);

    // Check if mediaData, moderatorId, and mediaType are provided
    if (!mediaData || !moderatorId || !mediaType) {
      return res.status(400).json({ error: "Missing required fields" });

    }


    const client = await pool.connect();
    let procedureName;

    switch (mediaType) {
      case "movie":
        procedureName = "insert_movie";
        break;
      case "manga":
        procedureName = "insert_manga";
        break;
      case "tv":
        procedureName = "insert_tv";
        break;
      case "book":
        procedureName = "insert_book";
        break;
      default:
        return res.status(400).json({ error: "Invalid media type" });
    }

    const query = {
      text: `
        DO $$
        BEGIN
          CALL "Fiction Profile".$1($2, $3);
        END $$;
      `,
      values: [procedureName, mediaData, moderatorId],
    };

    await client.query(query);
    client.release();

    res.json({ message: "Media added successfully" });
  } catch (error) {
    console.error("Error adding media:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post('/edit_media', async (req, res) => {
  try {
    console.log("Editing media:", req.body);

    // Here, you can process the data received from the client and perform necessary actions.

    res.status(200).json({ message: "Media edited successfully" });
  } catch (error) {
    console.error("Error editing media:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
);




router.post('/remove_media', async (req, res) => {
  try {
    console.log("Removing media:", req.body);

    // Here, you can process the data received from the client and perform necessary actions.

    res.status(200).json({ message: "Media removed successfully" });
  } catch (error) {
    console.error("Error removing media:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;