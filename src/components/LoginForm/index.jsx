import Link from "next/link";
import React, { useState } from "react";

function LoginForm() {
  const [iconEye, setIconEye] = useState(false);

  const toggleIcon = () => {
    iconEye ? setIconEye(false) : setIconEye(true);
  };
  return (
    <>
      <form className="px-12 w-full">
        <div className="mb-8 flex gap-2 relative">
          <i class="bi bi-envelope text-blue-primary text-2xl absolute top-[10%]"></i>
          <input
            type="text"
            placeholder="Enter your e-mail"
            className="w-full border-b-2 border-solid border-grey-secondary p-2 pl-10 focus:outline-none"
          />
        </div>
        <div className="mb-6 flex gap-2 relative">
          {/* password hidden */}
          <i className="bi bi-lock-fill text-blue-primary absolute text-2xl top-[10%]"></i>
          <input
            type={`${iconEye ? "text" : "password"}`}
            className={`w-full border-b-2 border-solid border-grey-secondary p-2 pl-10 focus:outline-none`}
            placeholder="Enter your password"
          />
          <i
            className={`right-2 text-blue-primary absolute text-2xl top-[10%] lg:hidden ${
              iconEye ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"
            }`}
            onClick={toggleIcon}></i>
        </div>
        <div className="w-full mb-6 text-end">
          <Link href={"/forgot"} className="text-blue-primary font-semibold">
            Forgot password?
          </Link>
        </div>
        <div>
          <button className="px-2 py-4 bg-grey-thirty w-full font-bold text-grey-secondary rounded-lg mb-6 hover:bg-blue-primary active:bg-blue-primary hover:text-white">
            Login
          </button>
          <p className="font-bold text-grey-secondary">
            Don’t have an account? Let’s{" "}
            <Link
              href={"/register"}
              className="text-blue-primary border-b-2 border-solid border-blue-primary">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
