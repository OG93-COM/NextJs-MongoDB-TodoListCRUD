import { useRouter } from 'next/router'
import React, { useState } from 'react'
import axios from 'axios';


const EditTodoForm = ({ id, title, description }) => {

    // const navigate = useRouter()
    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);

    const handleEditTodo = (e) => {
        e.preventDefault()
        const newObj = {
            newTitle,
            newDescription
        }
        try {
            axios.put(`http://localhost:3000/api/todos/${id}`, newObj)
                .then(res => {
                    console.log("TODO Updated 🏆🏆🏆🏆", newObj)

                })

        } catch (error) {
            console.log("Todo update Error :" + error)

        }
    }
    return (
        <>
            <h1 className='text-xl font-bold border-b pb-3 text-slate-800'>Edit Todo <span className='text-slate-500 text-sm'>"{title}"</span></h1>
            <form class="w-full mt-5 px-2" onSubmit={handleEditTodo}>
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                    Title : {newTitle}
                </label>
                <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} class="appearance-none block w-full bg-gray-100 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="input-title" type="text" placeholder="add title here" />
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                    Description :
                </label>
                <input value={newDescription} onChange={(e) => setNewDescription(e.target.value)} class="appearance-none block w-full bg-gray-100 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="input-title" type="text" placeholder="add description here" />
                <button class="w-full bg-slate-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Update Todo
                </button>
            </form>
        </>
    )
}

export default EditTodoForm