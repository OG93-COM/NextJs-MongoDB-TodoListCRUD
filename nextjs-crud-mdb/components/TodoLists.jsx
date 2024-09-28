import React from 'react'
import RemoveIcon from './RemoveIcon'
import Link from 'next/link'
import { HiPencilAlt } from 'react-icons/hi'

const getTodos = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/todos/')
        if (!res.ok) {
            throw new Error("faild to fetch TODOS")
        }
        return res.json();
    } catch (error) {
        console.log("get Todo Error :" + error)

    }
}

const TodoLists = async () => {
    const { todos } = await getTodos()
    console.log("Here TODO 📝📝📝📝",todos)
    return (
        <>
            {todos?.map(item => (

                <div className='flex justify-between items-start my-2 rounded p-4 border border-slate-300'>
                    <div>
                        <h2 className='text-2xl font-bold '>{item.title}</h2>
                        <div className='text-md'>Todo Discription</div>
                    </div>
                    <div className='flex gap-2'>
                        <RemoveIcon />
                        <Link href={'/editTodo/id'}>
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