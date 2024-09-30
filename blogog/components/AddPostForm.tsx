"use client";

import { categoryData } from "@/data";
import Link from "next/link";
import React, { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoLink } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";

const AddPostForm = () => {
  const [links, setLinks] = useState<string[]>([]);
  const [linkInput, setLinkInput] = useState("");

  const addlink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (linkInput.trim() !== "") {
      setLinks((prev) => [...prev, linkInput]);
      setLinkInput("");
    }
  };

  const deleteLink = (index:number) => {
    setLinks(prev => prev.filter((_,i)=> i !== index))
  }
  return (
    <div>
      <h1 className="title-page">Add new post</h1>
      <form className="p-6">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          placeholder="Post title"
        />
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          rows={5}
          placeholder="Content"
        />
        <div className="flex gap-2">
          <input
            onChange={(e) => {
              setLinkInput(e.target.value);
            }}
            value={linkInput}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Past links here and click add"
          />
          <button
            onClick={addlink}
            className="flex  items-center gap-2 mb-4 px-3 bg-slate-200 rounded-md text-sm font-semibold text-slate-800 hover:text-slate-600 duration-300"
          >
            <IoIosAddCircleOutline size={18} /> Add
          </button>
        </div>
        {links?.length > 0 && (
          <div className="mb-3">
            {links.map((item, idx) => (
              <div className="flex items-center gap-1">
                <IoLink size={14}/>
                <Link
                  className="text-sky-600 hover:text-sky-400 flex justify-start items-center gap-2 text-nowrap overflow-hidden text-ellipsis"
                  href={item}
                  key={idx}
                >
                   {item}
                </Link>
                <span onClick={()=>deleteLink(idx)} className="cursor-pointer hover:scale-105 duration-300">
                  <AiOutlineDelete size={20} color="tomato" />
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="mb-4">
          <select className="block appearance-none w-full bg-white border border-gray-200 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
            <option value={""}>Select Category</option>
            {categoryData?.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <button
          className="bg-sky-700 hover:bg-sky-500 text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Create Post
        </button>
        <div className="text-red-500 font-bold text-sm mt-2">
          Title and Content are required.
        </div>
      </form>
    </div>
  );
};

export default AddPostForm;
