import Link from "next/link";
import React from "react";
import { SiGnuprivacyguard } from "react-icons/si";
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
        <Link
          href={"/singup"}
          className="btnSignup"
        >
          SignUp <SiGnuprivacyguard />
        </Link>
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
