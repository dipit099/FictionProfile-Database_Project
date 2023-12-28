import React, { useEffect, useState, Fragment } from 'react'

function EditTodo({ todo }) {

    console.log(todo);
    const [description, setDescription] = useState(todo.description);

    //edit description function
    const updateDescription = async (e) => {
        e.preventDefault();
        try {
            const body = { description };
            const response = await fetch(`http://localhost:5197/todos/${todo.todo_id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
            window.location = "/"; /*refresh page*/
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>


            <button type="button"
                class="btn btn-warning"
                data-toggle="modal"
                data-target={`#id${todo.todo_id}`}>
                Edit
            </button>


            <div class="modal" id={`id${todo.todo_id}`}>
                <div class="modal-dialog">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h4 class="modal-title">Edit</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>


                        <div class="modal-body">
                            <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
                        </div>


                        <div class="modal-footer">
                            <button type="button"
                                class="btn btn-warning"
                                data-dismiss="modal"
                                onClick={e => updateDescription(e)}
                            >Confirm</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                        </div>

                    </div>
                </div>
            </div>


        </Fragment>
    )
}
export default EditTodo