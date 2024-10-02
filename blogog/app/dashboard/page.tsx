import Post from "@/components/Post";
import { postsData } from "@/data";
import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { TPost } from "../types";
import axios from "axios";

const getMyPosts = async ():Promise<TPost [] | null> => {
  try {
    const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/posts`);
    const postsData = await res.data;
    return postsData;
  } catch (error) {
    console.log(error);
  }
  return null
};

const page = async () => {
  const session = await getServerSession(authOptions)

  if(!session){
    redirect("/signin")
  }

  const posts = await getMyPosts()
  
  const myPosts = posts?.filter(post => post.authorEmail === session.user?.email)
  console.log(myPosts)
  return (
    <div className="">
      <h1 className="title-page">My Posts : {session?.user?.name}</h1>
      <div className="mx-1 p-4 lg:px-10">
        {myPosts?.length > 0 ? (
          myPosts.map((post) => (
            <Post
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.content}
                author={post.author.name}
                category={post.catName}
                datepublished={post.createdAt}
                links={post.links || []}
                thumbnail={post.imageUrl}
                authoremail={post.authorEmail}
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
