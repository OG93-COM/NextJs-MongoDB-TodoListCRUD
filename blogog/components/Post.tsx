import React from "react";
import { postsData } from "../data";
import Image from "next/image";
import Link from "next/link";

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
const Post = ({
  id,
  title,
  content,
  category,
  thumbnail,
  author,
  datepublished,
  links,
  authoremail,
}: postProps) => {
  return (
    <div className="mt-5">
      <article className="py-4 flex flex-col">
        <h1 className="mb-3">{title}</h1>
        <div className="w-full my-2 relative h-72">
          {thumbnail ? (
            <Image
              className="rounded-xl shadow-sm object-cover"
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
        <div className="flex justify-between items-center text-xs px-2">
          {category && <div className="category-post-btn">{category}</div>}
          <p>
            Posted by <span className="font-bold">{author} </span>
            on {datepublished}
          </p>
        </div>
        <p className="mt-4">{content}</p>

        {links && links.length > 0 && (
          <div>
            {links?.map((link, idx) => (
              <div key={idx} className="text-sky-800 font-semibold">
                <Link key={idx} href={link}>
                  🔗 {link}
                </Link>
              </div>
            ))}
          </div>
        )}
        <hr className="mt-10" />
      </article>
    </div>
  );
};

export default Post;
