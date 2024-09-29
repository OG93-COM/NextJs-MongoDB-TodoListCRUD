import React from "react";
import { postsData } from "../data";
import Image from "next/image";

const Post = () => {
  return (
    <div className="mt-5">
      {postsData?.map((item) => (
        <article className="py-4">
          <h1 className="mb-2">{item.title}</h1>
          <Image className="rounded-xl shadow-sm my-2" src={item.thumbnail} width={900} height={250} alt={item.title}/>
          <p>{item.content}</p>
          <p>{item.category}</p>

          <hr className="mt-10"/>
        </article>
      ))}
    </div>
  );
};

export default Post;
