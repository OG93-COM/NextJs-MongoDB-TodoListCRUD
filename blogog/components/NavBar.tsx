import Link from "next/link";
import React from "react";
import { SiGnuprivacyguard } from "react-icons/si";

const NavBar = () => {
  return (
    <nav className="flex justify-between sm:justify-around items-center bg-sky-700 px-4  py-3 rounded-sm shadow-md font-bold">
      <Link
        href={"/"}
        className="text-blue-100 hover:text-blue-50 duration-500"
      >
        BLOGOG .
      </Link>
      <Link
        href={"/singup"}
        className="flex justify-center items-center gap-2 bg-sky-100/90 px-4 py-1 rounded-sm text-sky-800 hover:text-sky-600 duration-300"
      >
        SignUp <SiGnuprivacyguard />
      </Link>
    </nav>
  );
};

export default NavBar;
