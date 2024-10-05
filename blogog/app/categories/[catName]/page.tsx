import { TCategory, TPost } from "@/app/types";
import CategotyList from "@/components/CategotyList";
import Post from "@/components/Post";
import axios from "axios";
import Link from "next/link";


const getPosts = async (cat:string):Promise<TPost [] | null> => {
    try {
      const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/posts`);
      const postsData = await res.data.filter((post:TCategory) => decodeURIComponent(post.catName) == decodeURIComponent(cat))
      return postsData;
    } catch (error) {
      console.log(error);
    }
    return null
  };



const page = async ({params}:{params:{catName:string}}) => {
    const category = params.catName
    const posts = await getPosts(category)
    console.log(posts)
    
  return (
    <div className="mx-1 p-4 lg:px-10">
        <>
        <div className="flex justify-start items-center gap-4">
        <p className="font-semibold">Category : </p>
        <span
          className="category-btn"
        >
          {decodeURIComponent(category)}
        </span>
        </div>
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
          </>
    </div>
  )
}

export default page