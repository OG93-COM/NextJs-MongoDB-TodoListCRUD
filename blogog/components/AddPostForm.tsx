"use client";

import React, { useEffect, useState } from "react";
import { TCategory } from "@/app/types";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";

import { IoIosAddCircleOutline } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import { IoLink } from "react-icons/io5";
import { FaRegImages } from "react-icons/fa";
import { FcRemoveImage } from "react-icons/fc";
import { toast } from "react-hot-toast";

const AddPostForm = () => {
  const [links, setLinks] = useState<string[]>([]);
  const [linkInput, setLinkInput] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get("/api/categories");

      console.log(res.data);
      setCategories(res.data);
    };
    fetchCategories();
  }, []);

  const addlink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (linkInput.trim() !== "") {
      setLinks((prev) => [...prev, linkInput]);
      setLinkInput("");
    }
  };

  const deleteLink = (index: number) => {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const removeImage = async (e:React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post('api/removeImg', {publicId})
    if(res.status === 200){
      toast.success('Image removed')
      setPublicId('')
      setImgUrl('')
    }
    } catch (error) {
      console.log("Image Cant be Rremoved ", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      if(!title){
        toast.error('Title is required')
      } else if (!content) { toast.error('Content is required')}
      setError("Title and content Are required");
      return;
    }
    try {
      const res = await axios.post("api/posts/", {
        title,
        content,
        links,
        imgUrl,
        selectedCategory,
        publicId,
      });
      if (res.status === 200) {
        toast.success('Successfully post added!')
        setError("");
        router.push("/");
      } 
    } catch (err) {
      toast.error("Something went wrong")
      setError("Post cant be ceated");
    }
  };
  return (
    <div>
      <h1 className="title-page">Add new post</h1>
      <form className="p-6" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setTitle(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          placeholder="Post title"
        />
        <textarea
          onChange={(e) => setContent(e.target.value)}
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
                <IoLink size={14} />
                <Link
                  className="text-sky-600 hover:text-sky-400 flex justify-start items-center gap-2 text-nowrap overflow-hidden text-ellipsis"
                  href={item}
                  key={idx}
                >
                  {item}
                </Link>
                <span
                  onClick={() => deleteLink(idx)}
                  className="cursor-pointer hover:scale-105 duration-300"
                >
                  <AiOutlineDelete size={20} color="tomato" />
                </span>
              </div>
            ))}
          </div>
        )}

        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          onSuccess={(result) => {
            setPublicId(result?.info?.public_id as string);
            setImgUrl(result?.info?.url as string);
          }}
        >
          {({ open }) => {
            return (
              <div
                onClick={() => open()}
                className="relative flex flex-col justify-center items-center gap-2 hover:scale-105 duration-300 bg-sky-50 h-28 w-full my-2 text-gray-500 font-semibold text-xs rounded-xl border border-dashed cursor-pointer"
              >
                <FaRegImages size={24} />
                Upload Image for the post
                {imgUrl && (
                  <Image
                    src={imgUrl}
                    fill
                    alt={title}
                    className="rounded-xl absolute object-cover inset-0"
                  />
                )}
              </div>
            );
          }}
        </CldUploadWidget>
        {publicId && (
          <div
            className="flex items-center gap-2 pb-5 cursor-pointer text-red-600 text-sm font-medium "
            onClick={removeImage}
          >
            <FcRemoveImage size={24} className="hover:scale-105" />
            Remove Image
          </div>
        )}

        <div className="my-4">
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block appearance-none w-full bg-white border border-gray-200 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value={""}>Select Category</option>
            {categories?.map((item) => (
              <option key={item.id} value={item.catName}>
                {item.catName}
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
          {error && <div>{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default AddPostForm;
