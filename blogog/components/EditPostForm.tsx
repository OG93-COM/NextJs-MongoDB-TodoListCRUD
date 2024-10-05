"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoLink } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { TCategory, TPost } from "@/app/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaRegImages } from "react-icons/fa";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { FcRemoveImage } from "react-icons/fc";
import { toast } from "react-hot-toast";

const EditPostForm = ({ post }: { post: TPost }) => {
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
      setCategories(res.data);
    };
    fetchCategories();

    const initialitionValue = () => {
      setTitle(post.title);
      setContent(post.content);
      setImgUrl(post.imgUrl || "");
      setPublicId(post.publicId);
      setSelectedCategory(post.catName || "");
      setLinks(post.links || []);
    };

    initialitionValue();
  }, [
    post.title,
    post.content,
    post.imgUrl,
    post.publicId,
    post.catName,
    post.links,
  ]);

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

  const removeImage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/removeImg", { publicId });
      console.log(publicId);
      if (res.status === 200) {
        setPublicId("");
        setImgUrl("");
      }
    } catch (error) {
      console.log("Image Cant be Rremoved ", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      setError("Title and content Are required");
      return;
    }

    try {
      const res = await axios.put(`/api/posts/${post.id}`, {
        title,
        content,
        links,
        imgUrl,
        selectedCategory,
        publicId,
      });
      if (res.status === 200) {
        toast.success('Post Edited With success')
        setError("");

        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      console.log(err);
      setError("Post cant be updated");
    }
  };

  return (
    <div>
      <h1 className="title-page">Edit post</h1>
      <form className="p-6" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          placeholder="Post title"
        />
        <textarea
          onChange={(e) => setContent(e.target.value)}
          value={content}
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
              <div key={idx} className="flex items-center gap-1">
                <IoLink size={14} />
                <Link
                  className="text-sky-600 hover:text-sky-400 flex justify-start items-center gap-2 text-nowrap overflow-hidden text-ellipsis"
                  href={item}
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

        <div className="mb-4">
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
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
          Update Post
        </button>
        <div className="text-red-500 font-bold text-sm mt-2">
          {error && <div>{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default EditPostForm;
