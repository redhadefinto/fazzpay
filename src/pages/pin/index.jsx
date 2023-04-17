import React, { useMemo, useState } from "react";
import Image from "next/image";
import branding from "../../assets/background/handphone.svg";
// import LoginForm from "@/components/LoginForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import succes from "../../assets/icon/success.svg";
import axios from "axios";
import dynamic from "next/dynamic";
import { setPin } from "@/utils/https/auth";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Loaders from "@/components/Loaders";
const ReactCodeInput = dynamic(import("react-code-input"));

function Pin() {
  const controller = useMemo(() => new AbortController(), []);
  const router = useRouter();
  const [input, setInput] = useState(true);
  const [getPin, setGetPin] = useState("");
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const valuePin = (e) => (setInput(true), setGetPin(`${e}`));
  const token = useSelector((state) => state.auth.data.data.token);
  const id = useSelector((state) => state.auth.data.data.id);
  const toogleModal = (e) => {
    e.preventDefault();
    setModal(!modal);
  };
  const handlePin = (e) => {
    e.preventDefault();
    setLoading(true);
    setPin({ pin: getPin }, id, token, controller)
      .then(() => {
        toast.success("Set Pin Succes");
        setTimeout(() => {
          return router.replace("/home");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const style = {
    className: "reactCodeInput",
    inputStyle: {
      fontFamily: "Nunito Sans",
      marginLeft: "7.5px",
      marginRight: "7.5px",
      MozAppearance: "textfield",
      width: "12.2%",
      borderRadius: "3px",
      fontSize: "30px",
      height: "50px",
      backgroundColor: "white",
      color: "#3A3D42",
      borderBottom: `2px solid ${input ? "#6379F4" : "#FF5B37"}`,
      textAlign: "center",
      marginBottom: "3rem",
      outline: "none",
    },
  };

  return (
    <>
      {loading && (
        <div className="fixed w-full h-full bg-[rgba(0,0,0,.5)] z-50">
          <Loaders />
        </div>
      )}
      {modal && (
        <div className="fixed h-screen w-full flex justify-center items-center bg-[rgba(0,0,0,.5)] z-30">
          <div className="w-[450px] h-[300px] relative bg-white rounded-2xl py-8 pt-12 px-8 ">
            <p
              className="font-semibold text-2xl absolute right-[8%] cursor-pointer text-grey-secondary"
              onClick={toogleModal}>
              X
            </p>
            <p className="font-bold text-grey-primary text-xl mb-4">Pin</p>
            <p className="text-grey-secondary opacity-90 mb-12">
              Are you sure of the PIN you entered
            </p>
            <p className="mt-4 font-bold text-grey-primary text-xl text-center">
              {getPin}
            </p>
            <div className="w-full flex items-end justify-center">
              <button
                className="btn px-6 py-2 rounded-lg bg-blue-primary text-white hover:bg-blue-900 mt-12"
                onClick={handlePin}>
                confirm
              </button>
            </div>
          </div>
        </div>
      )}
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
            trends. <br /> 5000+ users Pine d in FazzPay everyday with worldwide{" "}
            <br />
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
            Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN
            That You Created Yourself.
          </p>
          <br />
          <p className="hidden lg:block lg:text-start lg:text-lg text-grey-primary opacity-50 lg:w-full mb-20">
            Create 6 digits pin to secure all your money and your data in
            FazzPay app. Keep it secret and don’t tell anyone about your FazzPay
            account password and the PIN.
          </p>
          <form className="px-8 w-full lg:px-0">
            <div className="mb-8 flex gap-2 relative">
              <div className="">
                <ReactCodeInput
                  type="number"
                  fields={6}
                  pattern="/^-?\d+\.?\d*$/"
                  value={getPin}
                  onChange={valuePin}
                  {...style}
                />
              </div>
            </div>
            <div className="lg:w-full">
              <button
                type="submit"
                className="px-2 py-4 bg-grey-thirty w-full font-bold text-grey-secondary rounded-lg mb-6 hover:bg-blue-primary active:bg-blue-primary hover:text-white"
                onClick={(e) => {
                  e.preventDefault();
                  if (getPin.length < 6 || !getPin)
                    return (
                      setInput(false), toast.error("Please input pin correctly")
                    );
                  setModal(true);
                }}>
                Set Pin
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

export default Pin;
