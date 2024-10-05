"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'

import React from 'react'
import { HiOutlineTrash } from 'react-icons/hi'


const RemoveIcon = ({id}) => {
  const router = useRouter()

  const removeTodo = async () => {
    const confirmed = confirm("Are you sure?");
    if(confirmed){
      try {
        const res = await axios.delete(`http://localhost:3000/api/todos/?id=${id}`)
          console.log("Todos Deleted ✅")
          router.refresh()

      } catch (error) {
        console.log("Todos Cant Be Deleted ❌ " + error)
      }

    }
  }

  return (
    <button onClick={removeTodo}>
      <HiOutlineTrash size={24} color='tomato' />
    </button>
  )
}

export default RemoveIcon