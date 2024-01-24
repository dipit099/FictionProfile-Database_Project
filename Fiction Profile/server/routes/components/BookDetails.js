const express = require("express");
const router = express.Router();
const pool = require("../../db");

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'SELECT id,title,author, poster_path FROM "Fiction Profile"."BOOK" WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        const media = {
            id: result.rows[0].id,
            title: result.rows[0].title,
            poster_path: result.rows[0].poster_path,
            author: result.rows[0].author,


        };

        res.json({ media });
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports = router;