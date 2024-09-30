"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { IoMdLogIn } from "react-icons/io";
import { MdOutlineAddCard } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

const NavBar = () => {
  const { status, data: session } = useSession();
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(()=>{
    const handleClickOutside = (e: MouseEvent) => {
      if(popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setMenuVisible(false)
      }
    }
      document.addEventListener('click', handleClickOutside);

      if(!menuVisible){
        document.removeEventListener('click', handleClickOutside);
      }
      return ()=> {document.removeEventListener('click', handleClickOutside);}
  },[menuVisible])

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <>
      <nav className="flex justify-between sm:justify-around items-center bg-sky-700 px-4 py-3 rounded-t-sm shadow-md font-bold">
        <Link
          href={"/"}
          className="text-blue-100 hover:text-blue-50 duration-500"
        >
          BLOGOG .
        </Link>

        <div className="flex items-center relative">
          {status === "authenticated" ? (
            <>
              <Link
                href={"/add-new-post"}
                className="hidden md:flex items-center text-sky-50 text-sm mr-2 gap-1 hover:text-sky-200"
              >
                <MdOutlineAddCard size={18} /> Create Post
              </Link>
              <Image
                onClick={toggleMenu}
                src={session?.user?.image || "/user-profile.png"}
                width={36}
                height={36}
                alt="profile picture"
                className="picture-profile"
              />
              <div
                ref={popupRef}
                className={`${!menuVisible ? "hidden" : ""} absolute bg-sky-50 min-w-[180px] rounded-lg shadow-lg p-4 z-10 top-10 right-0 text-sm flex flex-col gap-3`}>
                <div>
                  <div>Hello, {session?.user?.name}</div>
                  <div className="text-xs font-extralight">
                    {session?.user?.email}
                  </div>
                </div>
                <Link className="hover:text-sky-800" href={"/dashboard"} onClick={toggleMenu}>
                  Dashboard
                </Link>
                <Link className="hover:text-sky-800" href={"/add-new-post"} onClick={toggleMenu}>
                  Create New Post
                </Link>
                <button className="btnSignin" onClick={() => signOut()}>
                  Logout <IoLogOutOutline />
                </button>
              </div>
            </>
          ) : (
            <Link href={"/signin"} className="btnSignin">
              Sign In <IoMdLogIn />
            </Link>
          )}
        </div>
      </nav>

      <div className="bg-[url('../assets/bg.jpg')] h-[350px] w-full mx-auto  shadow-lg mb-10">
        <div className="flex justify-center items-center gap-2 px-4 py-5">
          <h1 className="text-4xl font-black  text-sky-950">
            <span className="text-sky-500 tracking-tighter">Want News?</span>
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
