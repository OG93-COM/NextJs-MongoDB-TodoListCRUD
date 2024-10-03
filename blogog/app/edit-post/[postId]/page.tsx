import React from "react";
import EditPostForm from "@/components/EditPostForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import axios from "axios";
import { TPost } from "@/app/types";

const getPost = async (id: string): Promise<TPost | null> => {
  try {
    const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/posts/${id}`);
    if (res.status === 200) {
      const post = res.data;
      return post;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

const page = async ({ params }: { params: { postId: string } }) => {
  const id = params.postId;
  console.log(id);

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }
  const post = await getPost(id);


  return (
    <>
    { post ? <EditPostForm post={post}/> : (<div>Invalid Post</div>)}
    </>
  );
};

export default page;
