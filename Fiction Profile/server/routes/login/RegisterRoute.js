// registerRoute.js
const express = require("express");
const router = express.Router();
const multer = require('multer');
const { getDownloadURL, uploadBytesResumable, ref } = require('firebase/storage');
const { storage } = require('../../config/firebaseConfig');
const pool = require("../../db");
// const bcrypt = require("bcrypt");


const cors = require("cors");
const path = require('path');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('profilePicture'), async (req, res) => {
    // Your register route logic here
    // ...
    const {
        userName,
        firstName,
        lastName,
        email,
        pass,
        birthdate,
        gender,
        role,
    } = req.body;

    console.log('Received registration request:', req.body);
    // console.log('Received profile picture:', req.file);

    try {
        // Check if the username or email already exists
        const checkUserQuery = 'SELECT * FROM "Fiction Profile"."PEOPLE" WHERE username = $1 OR email = $2';
        const checkUserResult = await query(checkUserQuery, [userName, email]);
        if (checkUserResult.rows.length > 0) {
            // User with the same username or email already exists
            console.log('Username or email already exists');
            return res.status(409).json(
                { error: 'Username or email already exists' }
                );
        }

        //setting up profile picture path
        const currentDate = new Date().toISOString().split('T')[0];
        const getLastInsertedRowQuery = 'SELECT people_id FROM "Fiction Profile"."PEOPLE" ORDER BY people_id DESC LIMIT 1';
        const lastInsertedRowResult = await query(getLastInsertedRowQuery);
        let lastId = 0;
        if (lastInsertedRowResult.rows.length > 0) {
            lastId = parseInt(lastInsertedRowResult.rows[0].people_id.slice(2));
        }
        const ppid = `pp${(lastId + 1).toString().padStart(6, '0')}`;
        let profilePicturePath = null;
        if (req.file) {
            const storageRef = ref(storage, `uploads/${ppid + "_" + currentDate}`);
            const metadata = {
                contentType: req.file.mimetype,
            };
            // Upload the file in the bucket storage
            const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
            //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel
            // Grab the public url
            const downloadURL = await getDownloadURL(snapshot.ref);

            console.log('File successfully uploaded.');
            console.log('File available at', downloadURL);
            profilePicturePath = downloadURL;
        }

        // If the username and email are unique, insert the new user into the database
        const insertUserQuery =
            'INSERT INTO "Fiction Profile"."PEOPLE" (username, first_name, last_name, email, password, birthdate, gender, role, joined_date, profile_pic_path) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
        await query(insertUserQuery, [
            userName,
            firstName,
            lastName || null,
            email,
            pass,
            birthdate || null, // Assuming birthdate is optional
            gender || null,
            role,
            currentDate,
            profilePicturePath, // Assuming profile picture is optional
        ]);
        console.log('User registered successfully');
        res.status(201).json({
            message: 'User registered successfully',
            //  role: storedRole,
            //  profilePicPath: profilePicturePath,
            //     message: 'file uploaded to firebase storage',
            //     name: req.file.originalname,
            //     type: req.file.mimetype,
            //     downloadURL: downloadURL
        });

    }

    catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});

module.exports = router;
