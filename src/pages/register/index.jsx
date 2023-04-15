import React, { useState } from "react";
import Image from "next/image";
import branding from "../../assets/background/handphone.svg";
// import LoginForm from "@/components/LoginForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import axios from "axios";

function Register() {
  const [iconEye, setIconEye] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [input, setInput] = useState(true);
  const toggleIcon = () => {
    iconEye ? setIconEye(false) : setIconEye(true);
  };
  const handleEmail = (e) => {
    setInput(true);
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setInput(true);
    setPassword(e.target.value);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password)
      return setInput(false), toast.error("Data cannot be empty");
    axios
      .post(`https://fazzpay-rose.vercel.app/auth/login`, {
        email,
        password,
      })
      .then(({ data }) => {
        console.log(data);
      });
  };
  return (
    <>
      <main className="lg:flex bg-white-primary">
        <section className="w-[50%] pl-12 py-12 hidden lg:auth-bg lg:block">
          <p className="text-3xl font-bold pl-12 text-white-primary">FazzPay</p>
          <Image src={branding} width={500} height={500} alt="branding" />
          <p className="pl-12 font-bold text-2xl mb-8 text-white-primary text-start">
            App that Covering Banking Needs.
          </p>
          <p className="pl-12 text-white-secondary">
            FazzPay is an application that focussing in banking needs for all
            users <br /> in the world. Always updated and always following world
            trends. <br /> 5000+ users registere d in FazzPay everyday with
            worldwide <br />
            users coverage.
          </p>
        </section>
        <div className="h-[23vh] grid place-content-center bg-white-secondary text-blue-primary lg:hidden">
          <p className="font-bold text-3xl">FazzPay</p>
        </div>
        <section className="lg:w-[50%] mb-12 bg-white-primary text-grey-primary flex flex-col items-center text-center rounded-lg pt-8 h-[70vh] lg:pr-20 lg:pl-8 xl:pl-12 lg:pt-24 lg:mb-0">
          <p className="text-grey-primary font-bold text-2xl mb-4 lg:hidden">
            Sign Up
          </p>
          <p className="mb-8 text-grey-secondary lg:hidden">
            Create your account to access FazzPay.
          </p>
          <p className="hidden lg:block lg:text-start lg:text-2xl lg:font-bold lg:w-full">
            Start Accessing Banking Needs <br /> With All Devices and All
            Platforms <br />
            With 30.000+ Users
          </p>
          <br />
          <p className="hidden lg:block lg:text-start lg:text-lg text-grey-primary opacity-50 lg:w-full mb-12">
            Transfering money is eassier than ever, you can access <br />{" "}
            FazzPay wherever you are. Desktop, laptop, mobile phone? <br /> we
            cover all of that for you!
          </p>
          <form className="px-12 w-full lg:px-0">
            <div className="mb-8 flex gap-2 relative">
              <i
                className={`bi bi-person text-2xl absolute top-[10%] ${
                  input ? "text-blue-primary" : "text-danger"
                }`}></i>
              <input
                type="text"
                placeholder="Enter your firstname"
                value={email}
                onChange={handleEmail}
                className={`w-full border-b-2 border-solid border-grey-secondary p-2 pl-10 focus:outline-none lg:w-[90%] ${
                  input ? "border-blue-primary" : "border-danger"
                }`}
              />
            </div>
            <div className="mb-8 flex gap-2 relative">
              <i
                className={`bi bi-person text-2xl absolute top-[10%] ${
                  input ? "text-blue-primary" : "text-danger"
                }`}></i>
              <input
                type="text"
                placeholder="Enter your lastname"
                value={email}
                onChange={handleEmail}
                className={`w-full border-b-2 border-solid border-grey-secondary p-2 pl-10 focus:outline-none lg:w-[90%] ${
                  input ? "border-blue-primary" : "border-danger"
                }`}
              />
            </div>
            <div className="mb-8 flex gap-2 relative">
              <i
                className={`bi bi-envelope-fill text-2xl absolute top-[10%] ${
                  input ? "text-blue-primary" : "text-danger"
                }`}></i>
              <input
                type="text"
                placeholder="Enter your e-mail"
                value={email}
                onChange={handleEmail}
                className={`w-full border-b-2 border-solid border-grey-secondary p-2 pl-10 focus:outline-none lg:w-[90%] ${
                  input ? "border-blue-primary" : "border-danger"
                }`}
              />
            </div>
            <div className="mb-6 flex gap-2 relative lg:mb-16">
              {/* password hidden */}
              <i
                className={`bi bi-lock-fill absolute text-2xl top-[10%] ${
                  input ? "text-blue-primary" : "text-danger"
                }`}></i>
              <input
                type={`${iconEye ? "text" : "password"}`}
                value={password}
                onChange={handlePassword}
                className={`w-full border-b-2 border-solid border-grey-secondary p-2 pl-10 focus:outline-none lg:w-[90%] ${
                  input ? "border-blue-primary" : "border-danger"
                }`}
                placeholder="Enter your password"
              />
              <i
                className={`right-2 text-blue-primary absolute text-2xl top-[10%] lg:hidden ${
                  iconEye ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"
                }`}
                onClick={toggleIcon}></i>
            </div>
            <div className="lg:w-[90%]">
              <button
                type="submit"
                className="px-2 py-4 bg-grey-thirty w-full font-bold text-grey-secondary rounded-lg mb-6 hover:bg-blue-primary active:bg-blue-primary hover:text-white"
                onClick={handleLogin}>
                Register
              </button>
              <p className="font-bold text-grey-secondary mb-12 lg:mb-0">
                Already have an account? Let’s{" "}
                <Link
                  href={"/login"}
                  className="text-blue-primary border-b-2 border-solid border-blue-primary">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </section>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
          theme="light"
        />
      </main>
    </>
  );
}

export default Register;
