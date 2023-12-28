import React, { Fragment, useEffect, useState } from 'react'
import EditTodo from './EditTodo';
import './ListTodo.css';



function ListTodo() {

    const [todos, setTodos] = useState([]);
    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5197/todos");
            const jsonData = await response.json();
            setTodos(jsonData);
            console.log(jsonData);
        } catch (error) {
            console.log("error")
            console.error(error.message);
        }
    }

    const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5197/todos/${id}`, {
                method: "DELETE"
            });
            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (error) {
            console.error(error.message);
        }
    }
    useEffect(() => {
        getTodos();
    }); /*using [] otherwise useeffect runs all time every second */

    return (
        <div className='Listdiv'>
            <h1>ListTodos</h1>
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>

                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td><EditTodo todo={todo} /></td>
                            <td><button className='btn btn-danger' onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>


                        </tr>
                    ))}
                </tbody>
            </table>

        </div>

    )
}
export default ListTodo;