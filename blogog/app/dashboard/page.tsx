import Post from "@/components/Post";
import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import axios from "axios";
import { TPost } from "../types";

const getPosts = async (email: string) => {
  try {
    const res = await axios.get( `${process.env.NEXTAUTH_URL}/api/authors/${email}` );
    const { posts } = await res.data;
    return posts;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const page = async () => {
  const session = await getServerSession(authOptions);
  const userName = session?.user

  if (!session) {
    redirect("/signin");
  }
  const email = session?.user?.email;
  let posts = [];
  if (email) {
    posts = await getPosts(email);
    console.log(posts)
  }

  return (
    <div className="">
      <h1 className="title-page">My Posts : {session?.user?.name}</h1>
      <div className="mx-1 p-4 lg:px-10">
        {posts && posts.length > 0 ? (
          posts.map((post:TPost) => (
            <Post
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              author={session?.user?.name}
              category={post.catName}
              datepublished={post.createdAt}
              links={post.links || []}
              thumbnail={post.imgUrl}
              authoremail={post.authorEmail}
            />
          ))
        ) : (
          <div className="pt-6">
            No Posts Available.{" "}
            <Link
              className="text-sky-800 hover:text-sky-600"
              href={"/add-new-post/"}
            >
              Create your first post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
