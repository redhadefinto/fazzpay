import FooterHome from "@/components/FooterHome";
import HeaderHome from "@/components/HeaderHome";
import Layout from "@/components/Layout";
import Loaders from "@/components/Loaders";
import SideBar from "@/components/SideBar";
import SideBarMobile from "@/components/SideBarMobile";
import TopUp from "@/components/TopUp";
import { cekPin } from "@/utils/https/users";
import privateRoute from "@/utils/wrapper/private.route";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import ReactCodeInput from "react-code-input";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function ChangePin() {
  const [topUp, setTopUp] = useState();
  const router = useRouter();
  const controller = useMemo(() => new AbortController(), []);
  const [input, setInput] = useState(true);
  const [getPin, setGetPin] = useState("");
  const valuePin = (e) => (setInput(true), setGetPin(`${e}`));
  const token = useSelector((state) => state.auth.data.data.token);
  const [loading, setLoading] = useState(false);
  const pinHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    cekPin(getPin, token, controller)
      .then((res) => {
        toast.success(res.data.msg);
        setTimeout(() => {
          router.replace("/profile/new-pin");
        }, 3000);
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
        // console.log(err);
        setInput(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const style = {
    className: "reactCodeInput arrow",
    inputStyle: {
      fontFamily: "Nunito Sans",
      marginLeft: "7.5px",
      marginRight: "7.5px",
      MozAppearance: "textfield",
      width: "11.5%",
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
    <Layout title={"Verify Pin"}>
      {loading && (
        <div className="fixed w-full h-full bg-[rgba(0,0,0,.5)] z-[60]">
          <Loaders />
        </div>
      )}
      <SideBarMobile setTopUp={setTopUp} />
      {topUp && <TopUp setTopUp={setTopUp} />}
      <HeaderHome />
      <main
        className={`bg-white-secondary h-max flex px-[8%] py-8 lg:py-8 lg:px-[5%] xl:px-[8%]`}>
        <SideBar setTopUp={setTopUp} />
        <section className="w-full h-full min-h-max lg:w-[70%] mt-4 lg:mt-0">
          <div className="min-h-screen shadow-lg bg-white-primary rounded-lg py-8">
            <section className=" flex px-8 flex-col gap-6 mb-14">
              <div className=" text-dark font-bold text-xl">
                <h3>Change Pin</h3>
              </div>
              <div className=" text-[#7A7886] text-base md:text-lg">
                <p>
                  Enter your current 6 digits Fazzpay PIN below <br /> to
                  continue to the next steps.
                </p>
              </div>
            </section>
            <div className=" flex flex-col  lg:px-8 gap-[1.3rem] w-full items-center lg:mt-28">
              <form
                className="mt-[3rem] xl:mt-[4rem] gap-[1rem] flex flex-col w-full md:w-[80%] justify-center"
                onSubmit={pinHandler}>
                <div className="flex justify-center items-center gap-2 w-full ">
                  <div className="w-full flex items-center justify-center lg:pl-16">
                    <ReactCodeInput
                      type="number"
                      fields={6}
                      pattern="/^-?\d+\.?\d*$/"
                      onChange={valuePin}
                      value={getPin}
                      {...style}
                    />
                  </div>
                </div>
                <div className=" mt-6 lg:mt-2 flex justify-center items-center w-full">
                  <button
                    type="submit"
                    // onSubmit={confirmHandler}
                    disabled={!getPin}
                    className="px-2 py-4 lg:w-[85%] justify-center items-center disabled:bg-grey-thirty disabled:text-[#88888F] w-full font-bold  rounded-lg mb-6 bg-blue-primary text-white">
                    Change Pin
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <FooterHome />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        theme="light"
      />
    </Layout>
  );
}

export default privateRoute(ChangePin);
