import React, { useState } from 'react'


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
        <div className="Inputdiv">
            <h1 className="text-center mt-5">Pern Todo List</h1>
            <form className="Inputform" onSubmit={onSubmitForm}>
                <input
                    type="text"
                    className="form-control" value={description}
                    onChange={event => setDescription(event.target.value)}
                />
                <button className="Inputbutton">Add</button>
            </form>

        </div>
    )

}

export default InputTodo