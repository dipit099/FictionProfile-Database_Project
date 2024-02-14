const pool = require("./db");
const express = require("express");
const app = express();
const cors = require("cors");
const authorize = require('./middleware/authorize');
const AccountRoute = require('./routes/account/AccountRoute');
const UserMediaRoute = require('./routes/components/UserMediaAdd');
const UserFavoriteRoute = require('./routes/components/UserFavorite');


app.use(cors());
app.use(express.json());

app.use('/register', require('./routes/login/RegisterRoute'));
app.use('/login', require('./routes/login/LoginRoute'));
app.use('/trending', require('./routes/home/HomeMediaRoute'));
app.use('/movie', require('./routes/components/MovieDetails'));
app.use('/tvshow', require('./routes/components/TvShowDetails'));
app.use('/book', require('./routes/components/BookDetails'));
app.use('/manga', require('./routes/components/MangaDetails'));
app.use('/account', AccountRoute);
app.use('/user_media_add', UserMediaRoute);
app.use('/user_favorite', UserFavoriteRoute);
app.use('/top_media', require('./routes/home/TopMediaRoute'));
app.use('/discover', require('./routes/discover/DiscoverRoute'));
app.use('/rating', require('./routes/components/MediaRating'));





app.get('/auth-verify', authorize, async (req, res) => {
    try {
        // if it passes authorization than it is valid
        //console.log("in auth-verify url");
        res.json(true);
    }
    catch (err) {
        console.error("verify url" + err.message);
        res.status(500).send('Server Error');
    }
});



const PORT = 5197;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});





















// const express = require("express");
// const app = express();
// const cors = require("cors");
//
// const multer = require('multer');
// const path = require('path');
// app.use(cors());
// app.use(express.json());

// app.get('/movies', async (req, res) => {
//     try {
//         const result = await pool.query(
//             'SELECT title, poster_path FROM "Fiction Profile"."MOVIE" ORDER BY vote_count DESC LIMIT 10');
//         const movies = result.rows.map(movie => ({
//             title: movie.title,
//             poster_path: `https://image.tmdb.org/t/p/original/${movie.poster_path}`
//         }));

//         res.json({ movies });
//     } catch (error) {
//         console.error('Error executing query:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });



//setup firebase
// const firebase = require('firebase/app');
// const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');

// const firebaseConfig = {
//     apiKey: "AIzaSyAtnG5wlmolpTxWvhWlt39K8_ZbSkrBPAs",
//     authDomain: "fiction-profile-ec84d.firebaseapp.com",
//     projectId: "fiction-profile-ec84d",
//     storageBucket: "fiction-profile-ec84d.appspot.com",
//     messagingSenderId: "806361300468",
//     appId: "1:806361300468:web:e09850c1ae05096b384da1",
//     measurementId: "G-BPKCBNVQ67"
// };
// firebase.initializeApp(firebaseConfig);
// const storage = getStorage();
// const upload = multer({ storage: multer.memoryStorage() });




// app.post('/register', upload.single('profilePicture'), async (req, res) => {
//     const {
//         userName,
//         firstName,
//         lastName,
//         email,
//         pass,
//         birthdate,
//         gender,
//         role,
//     } = req.body;

//     // console.log('Received registration request:', req.body);
//     // console.log('Received profile picture:', req.file);

//     try {
//         // Check if the username or email already exists
//         const checkUserQuery = 'SELECT * FROM "Fiction Profile"."PEOPLE" WHERE username = $1 OR email = $2';
//         const checkUserResult = await pool.query(checkUserQuery, [userName, email]);
//         if (checkUserResult.rows.length > 0) {
//             // User with the same username or email already exists
//             return res.status(409).json({ error: 'Username or email already exists' });
//         }

//         //setting up profile picture path
//         const currentDate = new Date().toISOString().split('T')[0];
//         const getLastInsertedRowQuery = 'SELECT people_id FROM "Fiction Profile"."PEOPLE" ORDER BY people_id DESC LIMIT 1';
//         const lastInsertedRowResult = await pool.query(getLastInsertedRowQuery);
//         let lastId = 0;
//         if (lastInsertedRowResult.rows.length > 0) {
//             lastId = parseInt(lastInsertedRowResult.rows[0].people_id.slice(2));
//         }
//         const ppid = `pp${(lastId + 1).toString().padStart(6, '0')}`;
//         let profilePicturePath = null;
//         if (req.file) {
//             const storageRef = ref(storage, `uploads/${ppid + "_" + currentDate}`);
//             const metadata = {
//                 contentType: req.file.mimetype,
//             };
//             // Upload the file in the bucket storage
//             const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
//             //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel
//             // Grab the public url
//             const downloadURL = await getDownloadURL(snapshot.ref);

//             console.log('File successfully uploaded.');
//             console.log('File available at', downloadURL);
//             profilePicturePath = downloadURL;
//         }

//         // If the username and email are unique, insert the new user into the database
//         const insertUserQuery =
//             'INSERT INTO "Fiction Profile"."PEOPLE" (username, first_name, last_name, email, password, birthdate, gender, role, joined_date, profile_pic_path) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
//         await pool.query(insertUserQuery, [
//             userName,
//             firstName,
//             lastName || null,
//             email,
//             pass,
//             birthdate || null, // Assuming birthdate is optional
//             gender || null,
//             role,
//             currentDate,
//             profilePicturePath, // Assuming profile picture is optional
//         ]);
//         console.log('User registered successfully');
//         res.status(201).json({
//             message: 'User registered successfully',
//             //  role: storedRole,
//             //  profilePicPath: profilePicturePath,
//             //     message: 'file uploaded to firebase storage',
//             //     name: req.file.originalname,
//             //     type: req.file.mimetype,
//             //     downloadURL: downloadURL
//         });

//     }

//     catch (error) {
//         console.error('Error during registration:', error.message);
//         res.status(500).json({
//             error: 'Internal server error'
//         });
//     }
// });


// app.post('/login', async (req, res) => {
//     const { email, pass, role } = req.body;

//     try {
//         // Check if the email exists in the "People" table
//         const checkUserQuery = 'SELECT * FROM "Fiction Profile"."PEOPLE" WHERE email = $1';
//         const checkUserResult = await pool.query(checkUserQuery, [email]);
//         if (checkUserResult.rows.length === 0) {
//             // User with the provided email does not exist
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // Compare the provided password with the password from the database (assuming it's stored as VARCHAR)
//         const storedPassword = checkUserResult.rows[0].password;
//         if (pass !== storedPassword) {
//             // Password does not match
//             return res.status(401).json({ error: 'Invalid password' });
//         }

//         // Check if the user has the correct role
//         const storedRole = checkUserResult.rows[0].role;

//         if (role !== storedRole) {
//             // User does not have the required role
//             return res.status(403).json({ error: 'Invalid role' });
//         }

//         // Provide a success message or additional information as needed
//         res.status(200).json({ message: 'Login successful', role: storedRole });
//     } catch (error) {
//         console.error('Error during login:', error.message);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });







// app.post('/login', async (req, res) => {
//     const { email, pass, role } = req.body;

//     try {
//         // Check if the email exists in the "People" table
//         const checkUserQuery = 'SELECT * FROM "Fiction Profile"."PEOPLE" WHERE email = $1 AND role = $3';
//         const checkUserResult = await pool.query(checkUserQuery, [email]);

//         if (checkUserResult.rows.length === 0) {
//             // User with the provided email does not exist
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // Compare the provided password with the password from the database (assuming it's stored as VARCHAR)
//         const storedPassword = checkUserResult.rows[0].password;

//         if (pass !== storedPassword) {
//             // Password does not match
//             return res.status(401).json({ error: 'Invalid password' });
//         }

//         // Provide a success message or additional information as needed
//         res.status(200).json({ message: 'Login successful' });
//     } catch (error) {
//         console.error('Error during login:', error.message);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// ROUTES //

// Create a todo
// app.post("/todos", async (req, res) => {
//     try {
//         const { description } = req.body;
//         const newTodo = await pool.query(
//             'INSERT INTO "Fiction Profile"."todo" (description) VALUES($1) RETURNING *',
//             [description]
//         );
//         res.json(newTodo.rows[0]);
//     } catch (err) {
//         console.error(err.message);
//     }
// });

// // Get all todos
// app.get("/todos", async (req, res) => {
//     try {
//         const allTodos = await pool.query('SELECT * FROM "Fiction Profile"."todo"');
//         res.json(allTodos.rows);
//     } catch (err) {
//         console.error(err.message);
//     }
// });

// // Get a todo
// app.get("/todos/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const todo = await pool.query(
//             'SELECT * FROM "Fiction Profile"."todo" WHERE todo_id = $1',
//             [id]
//         );
//         res.json(todo.rows[0]);
//     } catch (err) {
//         console.error(err.message);
//     }
// });

// // Update a todo
// app.put("/todos/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { description } = req.body;
//         const updateTodo = await pool.query(
//             'UPDATE "Fiction Profile"."todo" SET description = $1 WHERE todo_id = $2',
//             [description, id]
//         );
//         res.json("Todo was updated!");
//     } catch (err) {
//         console.error(err.message);
//     }
// });
// //delete a todo
// app.delete("/todos/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deleteTodo = await pool.query(
//             'DELETE FROM "Fiction Profile"."todo" WHERE todo_id = $1',
//             [id]
//         );
//         res.json("Todo was deleted!");
//     } catch (err) {
//         console.log(err.message);
//     }
// });

