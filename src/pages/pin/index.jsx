import React, { useState } from "react";
import Image from "next/image";
import branding from "../../assets/background/handphone.svg";
// import LoginForm from "@/components/LoginForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import succes from "../../assets/icon/success.svg";
import axios from "axios";

function Register() {
  const [inputValues, setInputValues] = useState(["", "", "", "", "", ""]);
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
        <section className="lg:w-[50%] bg-white-primary text-grey-primary flex flex-col items-center text-center rounded-lg pt-8 h-[70vh] lg:pr-20 lg:pl-8 xl:pl-12 lg:pt-24">
          <p className="text-grey-primary font-bold text-2xl mb-4 lg:hidden">
            Create Security PIN
          </p>
          <p className="mb-8 text-grey-secondary lg:hidden">
            Create a PIN that’s contain 6 digits number for <br /> security
            purpose in FazzPay.
          </p>
          <p className="hidden lg:block lg:text-start lg:text-2xl lg:font-bold lg:w-full">
            Secure Your Account, Your Wallet, <br /> and Your Data With 6 Digits
            PIN <br />
            That You Created Yourself.
          </p>
          <br />
          <p className="hidden lg:block lg:text-start lg:text-lg text-grey-primary opacity-50 lg:w-full mb-12">
            Create 6 digits pin to secure all your money and your data in
            FazzPay app. Keep it secret and don’t tell anyone about your FazzPay
            account password and the PIN.
          </p>
          <form className="px-12 w-full lg:px-0">
            <div className="mb-8 flex gap-2 relative">
              <div className="w-full flex gap-4 mb-12 h-[80px]">
                <input
                  type="text"
                  className="w-[15%] border-b-2 h-full border-solid border-grey-secondary m-auto flex items-center justify-center text-center text-3xl font-bold"
                  maxLength={1}
                  value={inputValues[0]}
                  onChange={(e) => {
                    const newInputValues = [...inputValues];
                    newInputValues[0] = e.target.value;
                    setInputValues(newInputValues);
                  }}
                />
                <input
                  type="text"
                  className="w-[15%] border-b-2 h-full border-solid border-grey-secondary m-auto flex items-center justify-center text-center text-3xl font-bold"
                  maxLength={1}
                  value={inputValues[1]}
                  onChange={(e) => {
                    const newInputValues = [...inputValues];
                    newInputValues[1] = e.target.value;
                    setInputValues(newInputValues);
                  }}
                />
                <input
                  type="text"
                  className="w-[15%] border-b-2 h-full border-solid border-grey-secondary m-auto flex items-center justify-center text-center text-3xl font-bold"
                  maxLength={1}
                  value={inputValues[2]}
                  onChange={(e) => {
                    const newInputValues = [...inputValues];
                    newInputValues[2] = e.target.value;
                    setInputValues(newInputValues);
                  }}
                />
                <input
                  type="text"
                  className="w-[15%] border-b-2 h-full border-solid border-grey-secondary m-auto flex items-center justify-center text-center text-3xl font-bold"
                  maxLength={1}
                  value={inputValues[3]}
                  onChange={(e) => {
                    const newInputValues = [...inputValues];
                    newInputValues[3] = e.target.value;
                    setInputValues(newInputValues);
                  }}
                />
                <input
                  type="text"
                  className="w-[15%] border-b-2 h-full border-solid border-grey-secondary m-auto flex items-center justify-center text-center text-3xl font-bold"
                  maxLength={1}
                  value={inputValues[4]}
                  onChange={(e) => {
                    const newInputValues = [...inputValues];
                    newInputValues[4] = e.target.value;
                    setInputValues(newInputValues);
                  }}
                />
                <input
                  type="text"
                  className="w-[15%] border-b-2 h-full border-solid border-grey-secondary m-auto flex items-center justify-center text-center text-3xl font-bold"
                  maxLength={1}
                  value={inputValues[5]}
                  onChange={(e) => {
                    const newInputValues = [...inputValues];
                    newInputValues[5] = e.target.value;
                    setInputValues(newInputValues);
                  }}
                />
              </div>
            </div>
            <div className="lg:w-full">
              <button
                type="submit"
                className="px-2 py-4 bg-grey-thirty w-full font-bold text-grey-secondary rounded-lg mb-6 hover:bg-blue-primary active:bg-blue-primary hover:text-white"
                onClick={handleLogin}>
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
    </>
  );
}

export default Register;
