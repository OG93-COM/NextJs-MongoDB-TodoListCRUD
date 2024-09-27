import React from 'react'
import RemoveIcon from './RemoveIcon'
import Link from 'next/link'
import { HiPencilAlt } from 'react-icons/hi'

const TodoLists = () => {
    return (
        <div className='flex justify-between items-start my-2 rounded p-4 border border-slate-300'>
            <div>
                <h2 className='text-2xl font-bold '>Title</h2>
                <div className='text-md'>Todo Discription</div>
            </div>
            <div className='flex gap-2'>
                <RemoveIcon />
                <Link href={'/editTodo/id'}>
                    <HiPencilAlt size={24} />
                </Link>
            </div>
        </div>
    )
}

export default TodoLists