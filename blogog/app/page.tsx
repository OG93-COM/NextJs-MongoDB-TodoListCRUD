import CategotyList from "@/components/CategotyList";
import Post from "@/components/Post";
import axios from "axios";
import Image from "next/image";
import { TPost } from "./types";

const getPosts = async ():Promise<TPost [] | null> => {
  try {
    const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/posts`);
    const postsData = await res.data;
    return postsData;
  } catch (error) {
    console.log(error);
  }
  return null
};

export default async function Home() {
  const posts = await getPosts();
  console.log(posts)
  return (
    <>
      <div className="mx-1 p-4 lg:px-10">
        <CategotyList />

        {posts && posts.length > 0 ? posts?.map((post:TPost) => (
              <Post
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.content}
                author={post.author.name}
                category={post.catName}
                datepublished={post.createdAt}
                links={post.links || []}
                thumbnail={post.imgUrl}
                authoremail={post.authorEmail}
              />
            ))
          : "No Posts Available"}
      </div>
    </>
  );
}
