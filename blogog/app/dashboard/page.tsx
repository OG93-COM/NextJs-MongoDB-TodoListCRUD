import Post from "@/components/Post";
import { postsData } from "@/data";
import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOptions)
  console.log(session)
  if(!session){
    redirect("/signin")
  }
  return (
    <div className="">
      <h1 className="title-page">My Posts : {session?.user?.name}</h1>
      <div className="mx-1 p-4 lg:px-10">
        {postsData?.length > 0 ? (
          postsData.map((item) => (
            <Post
              key={item.id}
              id={item.id}
              title={item.title}
              content={item.content}
              author={item.author}
              category={item.category}
              datepublished={item.datepublished}
              links={item.links || []}
              thumbnail={item.thumbnail}
              authoremail={"contact@og93.com"}
            />
          ))
        ) : (
          <div className="pt-6">No Posts Available.{" "}
            <Link className="text-sky-800 hover:text-sky-600" href={"/add-new-post/"}>Create your first post</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
