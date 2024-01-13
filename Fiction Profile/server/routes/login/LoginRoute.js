// loginRoute.js
const express = require("express");
const router = express.Router();
const pool = require("../../db");

router.post('/', async (req, res) => {
    // Your login route logic here
    // ...
    const { email, pass, role } = req.body;

    try {
        // Check if the email exists in the "People" table
        const checkUserQuery = 'SELECT * FROM "Fiction Profile"."PEOPLE" WHERE email = $1';
        const checkUserResult = await query(checkUserQuery, [email]);
        if (checkUserResult.rows.length === 0) {
            // User with the provided email does not exist
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the provided password with the password from the database (assuming it's stored as VARCHAR)
        const storedPassword = checkUserResult.rows[0].password;
        if (pass !== storedPassword) {
            // Password does not match
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Check if the user has the correct role
        const storedRole = checkUserResult.rows[0].role;

        if (role !== storedRole) {
            // User does not have the required role
            return res.status(403).json({ error: 'Invalid role' });
        }

        // Provide a success message or additional information as needed
        res.status(200).json({ message: 'Login successful', role: storedRole });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
