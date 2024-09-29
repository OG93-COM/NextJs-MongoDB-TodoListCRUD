import CategotyList from "@/components/CategotyList";
import Post from "@/components/Post";
import Image from "next/image";


export default function Home() {
  return (
    <>
      <div className="mx-1 p-4 lg:px-10">
        <CategotyList />
        <Post/>
      </div>
    </>
  );
}
