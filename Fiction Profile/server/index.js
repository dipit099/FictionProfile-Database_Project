const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

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



app.get('/movies', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT title, poster_path FROM "Fiction Profile"."MOVIE" ORDER BY vote_count DESC LIMIT 10');
        const movies = result.rows.map(movie => ({
            title: movie.title,
            poster_path: `https://image.tmdb.org/t/p/original/${movie.poster_path}`
        }));

        res.json({ movies });
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/register', async (req, res) => {
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

    try {
        // Check if the username or email already exists
        const checkUserQuery = 'SELECT * FROM "Fiction Profile"."PEOPLE" WHERE username = $1 OR email = $2';
        const checkUserResult = await pool.query(checkUserQuery, [userName, email]);
        //final total number of rows
        // console.log(checkUserResult.rows.length);
        const getTotalRowsQuery = 'SELECT COUNT(*) FROM "Fiction Profile"."PEOPLE"';
        const totalRowsResult = await pool.query(getTotalRowsQuery);
        const totalRows = parseInt(totalRowsResult.rows[0].count);

        // Generate a unique identifier based on the total number of rows
        const getLastInsertedRowQuery = 'SELECT * FROM "Fiction Profile"."PEOPLE" ORDER BY people_id DESC LIMIT 1';
        const lastInsertedRowResult = await pool.query(getLastInsertedRowQuery);

        let lastId = 0;
        if (lastInsertedRowResult.rows.length > 0) {
            // Extract the last inserted ID
            lastId = parseInt(lastInsertedRowResult.rows[0].people_id.slice(2)); // Assuming user_id is in the format 'pp000001'
        }

        // Generate a unique identifier for the new user
        const ppid = `pp${(lastId + 1).toString().padStart(6, '0')}`;

        const currentDate = new Date().toISOString().split('T')[0];

        if (checkUserResult.rows.length > 0) {
            // User with the same username or email already exists
            return res.status(409).json({ error: 'Username or email already exists' });
        }

        // If the username and email are unique, insert the new user into the database
        const insertUserQuery =
            'INSERT INTO "Fiction Profile"."PEOPLE" (people_id, username, first_name, last_name, email, password, birthdate, gender, role, joined_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
        await pool.query(insertUserQuery, [
            ppid,
            userName,
            firstName,
            lastName,
            email,
            pass,
            birthdate,
            gender,
            role,
            currentDate

        ]);
        console.log('User registered successfully');
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});


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
app.post('/login', async (req, res) => {
    const { email, pass, role } = req.body;

    try {
        // Check if the email exists in the "People" table
        const checkUserQuery = 'SELECT * FROM "Fiction Profile"."PEOPLE" WHERE email = $1';
        const checkUserResult = await pool.query(checkUserQuery, [email]);

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


app.listen(5197, () => {
    console.log("Server started on port 5197");
});
