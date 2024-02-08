const express = require("express");
const router = express.Router();
const pool = require("../../db");

router.get('/:id', async (req, res) => {

    try {
        const { id } = req.params;
        const result = await pool.query(
            'SELECT id, title, poster_path, vote_average,overview,genres FROM "Fiction Profile"."MANGA" WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        const media = {
            id: result.rows[0].id,
            title: result.rows[0].title,
            poster_path: result.rows[0].poster_path,
            vote_average: result.rows[0].vote_average,
            overview: result.rows[0].overview,
            genres: result.rows[0].genres
           

        };

        res.json({ media });
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports = router;