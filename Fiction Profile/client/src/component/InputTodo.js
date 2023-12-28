import React, { Fragment, useState } from 'react'
import './InputTodo.css';


function InputTodo() {
    const [description, setDescription] = useState("");
    const onSubmitForm = async (event) => {
        event.preventDefault();
        try {
            const body = { description };
            const response = await fetch("http://localhost:5197/todos",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
            console.log(response);

        } catch (error) {
            console.log("error")
            console.error(error.message);
        }
    }
    return (
        <div className='InputTododiv'>
            <h1>Pern Todo List</h1>
            <form onSubmit={onSubmitForm}>
                <input
                    type="text"
                    value={description}
                    placeholder='Add Todo'
                    onChange={event => setDescription(event.target.value)}
                />
                <button>Add</button>
            </form>

        </div>
    )

}

export default InputTodo