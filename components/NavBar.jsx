import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <nav className='flex justify-between items-center bg-slate-800  px-5 py-3 rounded-sm shadow-md font-bold'>
        <Link href={"/"} className='text-slate-300 hover:text-slate-50 duration-500'>OGTODO..</Link>
        <Link href={"/addTodo"} className='bg-slate-100 p-2 rounded-sm text-slate-800 hover:text-slate-600 duration-300'>Add New Todo</Link>
    </nav>
  )
}

export default NavBar