import React from 'react'
function InputTodo() {
    const [description, setDescription] = React.useState("ttty");
    const onSubmitForm = async (event) => {
        event.preventDefault();
        try {
            const body = { description };
            const response = await fetch("http://localhost:3000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            window.location = "/";
        } catch (error) {
            console.log("error")
            console.error(error.message);
        }
    }
    return (
        <>
            <h1 className="text-center mt-5">Pern Todo List</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input
                    type="text"
                    className="form-control"
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                />
                <button className="btn btn-success">Add</button>
            </form>

        </>
    )

}

export default InputTodo