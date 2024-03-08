const express = require("express");
const router = express.Router();
const pool = require("../../db");
const multer = require('multer');
const { getDownloadURL, uploadBytesResumable, ref } = require('firebase/storage');
const { storage } = require('../../config/firebaseConfig');
const cors = require("cors");
const path = require('path');
const upload = multer({ storage: multer.memoryStorage() });
const sharp = require('sharp');

// Function to resize an image
async function resizeImage(inputPath, outputPath, width, height) {
    try {
        const image = await Jimp.read(inputPath);
        await image.resize(width, height).write(outputPath);
        console.log('Image resized successfully!');
    } catch (error) {
        console.error('Error resizing image:', error);
    }
}

router.get('/', async (req, res) => {
    try {
        const { people_id } = req.query;
        // console.log("people_id " +people_id);

        const checkUserQuery = 'SELECT * FROM "Fiction Profile"."PEOPLE" WHERE people_id = $1';
        const checkUserResult = await pool.query(checkUserQuery, [people_id]);
        if (checkUserResult.rows.length === 0) {
            // User with the provided people_id does not exist
            return res.status(404).json({ error: 'User not found' });
        }
        console.log(checkUserResult.rows[0]);
        res.status(200).json(checkUserResult.rows[0]);
    } catch (error) {
        console.error('Error fetching user data:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.post('/update', upload.single('profilePicture'), async (req, res) => {

    try {

        const {
            people_id,
            firstName,
            lastName,
            birthdate,
            gender
        } = req.body;

        console.log('Received profile picture:', req.file);
        console.log('Received update request:', req.body);

        // Convert birthdate to a valid date or set it to null if it's null or empty
        const formattedBirthdate = birthdate ? new Date(birthdate) : null;


        const ppid = people_id;
        const currentDate = new Date().toISOString().split('T')[0];
        let profilePicturePath = null;
        if (req.file) {
            const storageRef = ref(storage, `uploads/${ppid + "_" + currentDate}`);
            const metadata = {
                contentType: req.file.mimetype,
            };

            //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel
            // Use sharp to resize and compress the image
            const compressedImageBuffer = await sharp(req.file.buffer)
                .jpeg({ quality: 50 }) // Set the desired JPEG quality
                .toBuffer();

            // Upload the compressed image in the bucket storage
            const snapshot = await uploadBytesResumable(storageRef, compressedImageBuffer, metadata);
            // Grab the public url
            const downloadURL = await getDownloadURL(snapshot.ref);

            console.log('File successfully uploaded.');
            console.log('File available at', downloadURL);
            profilePicturePath = downloadURL;
        }

        const updateUserQuery =
            'UPDATE "Fiction Profile"."PEOPLE" SET first_name = $1, last_name = $2, birthdate = $3, gender = $4, profile_pic_path = $5 WHERE people_id = $6 RETURNING *';

        const updateUser = await pool.query(updateUserQuery, [
            firstName,
            lastName,
            birthdate,
            gender,
            profilePicturePath || '',
            people_id, // assuming people_id is the user's unique identifier
        ]);

        // Send response if the update is successful
        if (updateUser.rowCount > 0) {
            res.status(200).send('Profile updated successfully');
        } else {
            res.status(400).send('Failed to update profile');
        }
    } catch (error) {
        console.error('Error updating user profile:', error.message);
        res.status(500).json({ error: 'Internal server error' });

    }



});
module.exports = router;
