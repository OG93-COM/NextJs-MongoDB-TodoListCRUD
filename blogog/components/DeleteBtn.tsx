import Link from 'next/link'
import React from 'react'
import { AiOutlineDelete } from "react-icons/ai";


const DeleteBtn = () => {
  return (
    <Link href={"/"} className="text-red-500 flex items-center hover:scale-105 duration-300"><AiOutlineDelete size={18} color="tomato"/> Delete</Link>
  )
}

export default DeleteBtn