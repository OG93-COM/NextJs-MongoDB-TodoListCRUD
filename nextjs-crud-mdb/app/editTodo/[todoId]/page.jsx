import React from 'react'

const page = ({params}) => {
    

  return (
    <>
    <h1 className='text-xl font-bold border-b pb-3 text-slate-800'>Edit Todo {params.todoId}</h1>
    <form class="w-full mt-5 px-2">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                Title :
            </label>
            <input class="appearance-none block w-full bg-gray-100 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="input-title" type="text" placeholder="add title here" />
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                Description :
            </label>
            <input class="appearance-none block w-full bg-gray-100 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="input-title" type="text" placeholder="add description here" />
            <button class="w-full bg-slate-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Update Todo
            </button>
        </form>
    </>
  )
}

export default page