import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className='className="flex justify-between sm:justify-around items-center bg-sky-700 mt-5 px-4  py-3 rounded-sm shadow-md font-bold"'>
      <Link href={"https://www.og93.com/"}>
        <p className="text-sky-50 font-thin text-center">
          © Copyright Oussama Galai.
        </p>
      </Link>
    </div>
  );
};

export default Footer;
