import CategotyList from "@/components/CategotyList";
import Post from "@/components/Post";
import { postsData } from "@/data";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="mx-1 p-4 lg:px-10">
        <CategotyList />
        {postsData?.length > 0
          ? postsData.map((item) => (
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
          : "No Posts Available"}
      </div>
    </>
  );
}
