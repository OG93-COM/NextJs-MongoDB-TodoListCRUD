import React, { useState } from "react";
import { postsData } from "../data";
import Image from "next/image";
import Link from "next/link";
import { IoLink } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import DeleteBtn from "./DeleteBtn";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface postProps {
  id: string;
  title: string;
  content: string;
  category?: string;
  thumbnail?: string;
  author: string;
  datepublished: string;
  links?: string[];
  authoremail: string;
}

const Post = async ({
  id,
  title,
  content,
  category,
  thumbnail,
  author,
  datepublished,
  links,
  authoremail,
}: (postProps)) => {
  const session = await getServerSession(authOptions);
  const isEditable = session && session?.user?.email === authoremail;

  //Date Format
  const dateObj = new Date(datepublished);
  const option: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const formatDate = dateObj.toLocaleDateString("fr-FR", option);

  return (
    <div className="mt-5 border-b py-4">
      <article className="flex flex-col">
        <h1 className="mb-3">{title}</h1>
        <div className="w-full my-2 relative h-72">
          {thumbnail ? (
            <Image
              className="rounded-md shadow-lg object-cover"
              src={thumbnail}
              fill
              alt={title}
            />
          ) : (
            <Image
              className="rounded-xl shadow-sm object-cover"
              src={"/placehold-image.jpg"}
              fill
              alt="This post dosnt have an image"
            />
          )}
        </div>
        <div className="flex justify-between items-start text-xs px-2">
          {category && <div className="category-post-btn">{category}</div>}
          {author ? (
                <p>
                    Posted by <span className="font-bold">{author} </span>
                    on {formatDate}
                </p>
          ): (
                <p>Posted on {formatDate}</p>
          )}
        </div>
        <p className="my-4 leading-tight tracking-tight text-slate-700">
          {content.slice(0, 155)}
          {content.length > 155 && "... "}
          {content.length > 155 && (
            <Link className="text-sm text-sky-700 hover:text-sky-500" href={""}>
              Learn More
            </Link>
          )}
        </p>

        {links && links.length > 0 && (
          <div>
            {links?.map((link, idx) => (
              <div key={idx} className="text-sky-600 text-sm font-semibold">
                <Link
                  key={idx}
                  href={link}
                  className="flex flex-row items-center gap-2 hover:text-sky-400 max-w-full overflow-hidden"
                >
                  <IoLink /> {link}
                </Link>
              </div>
            ))}
          </div>
        )}
        <div>
          {isEditable && (
            <div className="flex items-center gap-4 mt-4">
              <Link
                href={`/edit-post/${id}`}
                className="flex items-center gap-1 hover:scale-105 duration-300"
              >
                <FaRegEdit size={18} /> Edit
              </Link>
              <DeleteBtn id={id} />
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default Post;
