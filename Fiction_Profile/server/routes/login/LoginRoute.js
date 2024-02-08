// loginRoute.js
const express = require("express");
const router = express.Router();
const pool = require("../../db");
const bcrypt = require('bcrypt');
const jwtGenerator = require("../../utilis/jwtGenerator");

router.post('/', async (req, res) => {
    const { email, pass, role } = req.body;

    try {
        // Check if the email exists in the "People" table
        const checkUserQuery = 'SELECT * FROM "Fiction Profile"."PEOPLE" WHERE email = $1';
        const checkUserResult = await pool.query(checkUserQuery, [email]);
        if (checkUserResult.rows.length === 0) {
            // User with the provided email does not exist
            return res.status(404).json({ error: 'Invalid Credentials' });
        }

        const validPassword = await bcrypt.compare(
            pass,
            checkUserResult.rows[0].password
        );

        if (!validPassword) {
            return res.status(401).json("Invalid Credential");
        }

        // Check if the user has the correct role
        const storedRole = checkUserResult.rows[0].role;

        if (role !== storedRole) {
            // User does not have the required role
            return res.status(403).json({ error: 'Invalid role' });
        }
        const token = jwtGenerator(checkUserResult.rows[0].people_id);
        console.log("token received in LoginRoute.js: " );

        res.status(200).json({
            message: 'Login successful',
            role: storedRole,
            token: token,
            people_id: checkUserResult.rows[0].people_id

        });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
