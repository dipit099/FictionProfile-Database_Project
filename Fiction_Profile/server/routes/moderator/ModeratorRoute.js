const express = require('express');
const router = express.Router();
const pool = require('../../db');

router.post('/add_media', async (req, res) => {
    try {
        console.log("Adding media:", req.body);

        // Here, you can process the data received from the client and perform necessary actions.

        res.status(200).json({ message: "Media added successfully" });
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