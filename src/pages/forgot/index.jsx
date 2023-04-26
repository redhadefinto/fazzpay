import React, { useMemo, useState } from "react";
import Image from "next/image";
import branding from "../../assets/background/handphone.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Loaders from "@/components/Loaders";
import { forgot } from "@/utils/https/auth";
import publicRouter from "@/utils/wrapper/public.route";
import publicRoute from "@/utils/wrapper/public.route";
import Layout from "@/components/Layout";

function Forgot() {
  const controller = useMemo(() => new AbortController(), []);
  const [loading, setLoading] = useState();
  const [input, setInput] = useState(true);
  const [email, setEmail] = useState();
  const handleEmail = (e) => {
    setInput(true);
    setEmail(e.target.value);
  };
  const handleForgot = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return setInput(false), toast.error("Data cannot be empty");
    if (!emailRegex.test(email))
      return setInput(false), toast.error("Invalid email");
    setInput(true);
    setLoading(true);
    forgot(
      { email, linkDirect: "http://localhost:3000/resetpassword" },
      controller
    )
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.msg);
      })
      .catch((err) => {
        console.log(err);
        setInput(false);
        toast.error(err.response.data.msg);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Layout title={"Forgot"}>
      {loading && (
        <div className="fixed w-full h-full bg-[rgba(0,0,0,.5)] z-10">
          <Loaders />
        </div>
      )}
      <main className="lg:flex min-h-screen bg-white-primary">
        <section className="w-[50%] pl-12 py-12 hidden lg:auth-bg lg:block">
          <p className="text-3xl font-bold pl-12 text-white-primary">FazzPay</p>
          <Image src={branding} alt="branding" />
          <p className="pl-4 xl:pl-12 font-bold text-2xl mb-8 text-white-primary text-start">
            App that Covering Banking Needs.
          </p>
          <p className="pl-4 xl:pl-12 xl:pr-4 text-white-secondary">
            FazzPay is an application that focussing in banking needs for all
            users in the world. Always updated and always following world
            trends. 5000+ users registere d in FazzPay everyday with worldwide
            users coverage.
          </p>
        </section>
        <div className="h-[23vh] grid place-content-center bg-white-secondary text-blue-primary lg:hidden">
          <p className="font-bold text-3xl">FazzPay</p>
        </div>
        <section className="lg:w-[50%] bg-white-primary text-grey-primary flex flex-col items-center text-center rounded-lg pt-8 h-[70vh] lg:pr-20 lg:pl-8 xl:pl-12 lg:pt-24">
          <p className="text-grey-primary font-bold text-2xl mb-4 lg:hidden">
            Reset Password
          </p>
          <p className="mb-8 text-grey-secondary lg:hidden">
            Enter your FazzPay e-mail so we can send <br /> you a password reset
            link.
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
            <div className="mb-32 flex gap-2 relative">
              <i
                className={`bi bi-envelope text-2xl absolute top-[10%] ${
                  !email && "text-grey-secondary"
                } ${input ? "text-blue-primary" : "text-danger"}`}></i>
              <input
                type="text"
                placeholder="Enter your e-mail"
                value={email}
                onChange={handleEmail}
                className={`w-full border-b-2 border-solid p-2 pl-10 focus:outline-none lg:w-[90%] ${
                  !email && "border-grey-secondary"
                } ${input ? "border-blue-primary" : "border-danger"}`}
              />
            </div>
            <div className="lg:w-[90%]">
              <button
                type="submit"
                className="px-2 py-4 bg-grey-thirty w-full font-bold text-grey-secondary rounded-lg mb-6 hover:bg-blue-primary active:bg-blue-primary hover:text-white"
                onClick={handleForgot}>
                Confirm
              </button>
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
    </Layout>
  );
}

export default publicRoute(Forgot);
