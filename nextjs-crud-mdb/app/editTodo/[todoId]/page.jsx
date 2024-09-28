"use client"
import React, { useRef, useState } from 'react'
import axios from 'axios'
import EditTodoForm from '@/components/EditTodoForm'

const getTodo = async (todoId) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/todos/${todoId}`)
    return res.data.todos;

  } catch (error) {
    console.log("get Todo Error :" + error)

  }
}


const page = async ({ params }) => {
  const id = params
  const todo = await getTodo(params.todoId);
  const {title, description} = todo

  return (
    <EditTodoForm id={id.todoId} title={title} description={description}/>
  )
}

export default page