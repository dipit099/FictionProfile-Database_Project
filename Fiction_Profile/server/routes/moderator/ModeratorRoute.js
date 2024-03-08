const express = require("express");
const router = express.Router();
const pool = require("../../db");

router.post("/add-media", async (req, res) => {
  try {
    const { mediaData, moderatorId, mediaType } = req.body;

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

module.exports = router;