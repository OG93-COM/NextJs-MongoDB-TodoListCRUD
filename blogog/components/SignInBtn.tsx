import React from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SignInBtn = () => {
  return (
    <>
      <div className="btn-singin-platform">
        <FaGithub size={30} /> Sign In With Github
      </div>
      <div className="btn-singin-platform">
        <FcGoogle size={30} /> Sign In With Google
      </div>
    </>
  );
};

export default SignInBtn;
