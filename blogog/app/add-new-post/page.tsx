import AddPostForm from '@/components/AddPostForm'
import React from 'react'
import { getServerSession } from 'next-auth/next'
import {redirect} from "next/navigation"
import { authOptions } from '../api/auth/[...nextauth]/route'

const page = async () => {
  const session  = await getServerSession(authOptions)
  if(!session){
    redirect("/signin")
  }
  
  return (
    <AddPostForm/>
  )
}

export default page