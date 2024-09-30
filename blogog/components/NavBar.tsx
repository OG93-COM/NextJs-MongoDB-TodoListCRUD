import Link from "next/link";
import React from "react";
import { IoMdLogIn } from "react-icons/io";
import { MdOutlineAddCard } from "react-icons/md";
import Image from "next/image";
const NavBar = () => {
  return (
    <>
      <nav className="flex justify-between sm:justify-around items-center bg-sky-700 px-4 py-3 rounded-t-sm shadow-md font-bold">
        <Link
          href={"/"}
          className="text-blue-100 hover:text-blue-50 duration-500"
        >
          BLOGOG .
        </Link>
        <div className="flex items-center ">
          <div className="flex items-center text-sky-50 text-sm mr-4 gap-1 hover:text-sky-200 cursor-pointer"><MdOutlineAddCard size={18} /> Create Post</div>
        <Link
          href={"/signin"}
          className="btnSignin"
        >
          Sign In <IoMdLogIn />
        </Link>
        </div>
      </nav>
      <div className="bg-[url('../assets/bg.jpg')] h-[350px] w-full mx-auto  shadow-lg mb-10">
        <div className="flex justify-center items-center gap-2 px-4 py-5">
          <h1 className="text-4xl font-black  text-sky-950">
            <span className="text-sky-500 tracking-tighter">
              Want News?
            </span>
            <br /> Welcome To your Blog OG App
          </h1>
          <Image
            className="drop-shadow-md"
            src="/blog-header.png"
            width={300}
            height={500}
            alt="Picture of the author"
          />
        </div>
      </div>
    </>
  );
};

export default NavBar;
