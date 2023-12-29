const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

// ROUTES //

// Create a todo
app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            'INSERT INTO "Fiction Profile"."todo" (description) VALUES($1) RETURNING *',
            [description]
        );
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Get all todos
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query('SELECT * FROM "Fiction Profile"."todo"');
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Get a todo
app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query(
            'SELECT * FROM "Fiction Profile"."todo" WHERE todo_id = $1',
            [id]
        );
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query(
            'UPDATE "Fiction Profile"."todo" SET description = $1 WHERE todo_id = $2',
            [description, id]
        );
        res.json("Todo was updated!");
    } catch (err) {
        console.error(err.message);
    }
});
//delete a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query(
            'DELETE FROM "Fiction Profile"."todo" WHERE todo_id = $1',
            [id]
        );
        res.json("Todo was deleted!");
    } catch (err) {
        console.log(err.message);
    }
});



app.get('/movies', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT name, poster_path FROM "Fiction Profile"."TV Datasets" WHERE id>=1 AND id<=100');
        const movies = result.rows.map(movie => ({
            title: movie.name,
            poster_path: `https://image.tmdb.org/t/p/original/${movie.poster_path}`
        }));

        res.json({ movies });
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




app.listen(5197, () => {
    console.log("Server started on port 5197");
});
