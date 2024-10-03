import { TCategory, TPost } from "@/app/types";
import CategotyList from "@/components/CategotyList";
import Post from "@/components/Post";
import axios from "axios";
import Link from "next/link";


const getPosts = async (cat:string):Promise<TPost [] | null> => {
    try {
      const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/posts`);
      const postsData = await res.data.filter(post => post.catName.toLowerCase().replaceAll('%20'," ") === cat.toLowerCase().replaceAll('%20'," "))
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
        <div
          className="category-btn"
        >
          {category.replaceAll("%20", " ")}
        </div>
        {posts?.length > 0 ? posts?.map((post:TPost) => (
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
          : "No Posts Available"}
          </>
    </div>
  )
}

export default page