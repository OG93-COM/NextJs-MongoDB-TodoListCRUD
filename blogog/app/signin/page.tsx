import SignInBtn from "@/components/SignInBtn";
import Image from "next/image";
import React from "react";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }

  // const { status } = useSession();

  return (
    <div className="flex justify-center items-center flex-wrap">
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
    </div>
  );
};

export default page;
