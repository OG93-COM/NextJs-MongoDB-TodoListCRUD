import React from 'react'
import RemoveIcon from './RemoveIcon'
import Link from 'next/link'
import { HiPencilAlt } from 'react-icons/hi'
import axios from 'axios'

const getTodos = async () => {
    try {
        const res = await axios.get("http://localhost:3000/api/todos")
            return res.data;
    } catch (error) {
        console.log("get Todo Error :" + error)

    }
}

const TodoLists = async () => {

    const todos = await getTodos();
    return (
        <>
            {todos?.map((item,idx) => (

                <div key={idx} className='flex justify-between items-start my-2 rounded p-4 border border-slate-300'>
                    <div>
                        <h2 className='text-2xl font-bold '>{item.title}</h2>
                        <div className='text-md'>{item.description}</div>
                    </div>
                    <div className='flex gap-2'>
                        <RemoveIcon id={item._id}/>
                        <Link href={`/editTodo/${item._id}`}>
                            <HiPencilAlt size={24} />
                        </Link>
                    </div>
                </div>
            ))
            }
        </>
    )
}

export default TodoLists