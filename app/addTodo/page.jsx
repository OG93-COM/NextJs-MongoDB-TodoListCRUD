"use client"
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const AddTodoPage = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const router = useRouter()

    const addTodo = async (title, description) => {
        if (title !== "" && description !== "") {
            try {
                const res = await axios.post("http://localhost:3000/api/todos/", { title, description })
                router.refresh()
                router.push('/')
            } catch (error) {
                console.log("Todos Cant Be Added" + error)
            }
        }
    }

    return (
        <>
            <h1 className='text-xl font-bold border-b pb-3 text-slate-800'>Add New Todo</h1>
            <form className="w-full mt-5 px-2">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Title :
                </label>
                <input onChange={(e) => setTitle(e.target.value)} class="appearance-none block w-full bg-gray-100 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="input-title" type="text" placeholder="add title here" />
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Description :
                </label>
                <input onChange={(e) => setDescription(e.target.value)} class="appearance-none block w-full bg-gray-100 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="input-title" type="text" placeholder="add description here" />
                <button
                    onClick={() => addTodo(title, description)}
                    className="w-full bg-slate-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Add
                </button>
            </form>
        </>
    )
}

export default AddTodoPage