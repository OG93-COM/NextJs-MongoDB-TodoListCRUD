"use client";
import SignInBtn from "@/components/SignInBtn";
import Image from "next/image";
import React from "react";
import { useSession } from "next-auth/react";

const page = () => {
  const { status } = useSession();
  return (
    <div className="flex justify-center items-center flex-wrap">
      {status === "authenticated" ? (
        <div className="flex flex-col justify-center items-center">
          <h1 className="py-8">Your Are already Logged In</h1>
        </div>
      ) : (
        <>
          <Image
            className="drop-shadow-md"
            src="/signin.png"
            width={400}
            height={400}
            alt="Picture of the author"
          />
          <div className="flex flex-col justify-center items-center">
            <h1 className="py-8">Welcome to you Account</h1>
            <SignInBtn />
          </div>
        </>
      )}
    </div>
  );
};

export default page;
