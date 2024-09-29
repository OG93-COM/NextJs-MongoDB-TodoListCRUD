import React from 'react'
import {postsData} from '../data'

const Post = () => {
    console.log(postsData)
  return (
    <div className='mt-5'>
        {postsData?.map(item => (
            <p>{item.title}</p>
        ))}
    </div>
  )
}

export default Post