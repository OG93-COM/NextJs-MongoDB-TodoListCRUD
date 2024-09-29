import CategotyList from "@/components/CategotyList";
import Image from "next/image";


export default function Home() {
  return (
    <>
      <div className="border mx-1 p-4 lg:px-10">
        <CategotyList />
      </div>
    </>
  );
}
