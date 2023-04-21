import { topUp } from "@/utils/https/users";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loaders from "../Loaders";
import { profileAction } from "@/redux/slices/profile";

function TopUp({ setTopUp }) {
  const controller = useMemo(() => new AbortController(), []);
  const dispatch = useDispatch();
  const [price, setPrice] = useState("");
  const [input, setInput] = useState(true);
  const [loading, setLoading] = useState(false);
  const [linkTopUp, setLinkTopUp] = useState("");
  const token = useSelector((state) => state.auth.data.data.token);
  // const id = useSelector((state) => state.auth.data.data.id);
  const valuePrice = (e) => {
    setInput(true);
    setPrice(e.target.value);
  };
  const toogleSucces = () => {
    setTopUp(false);
    setLinkTopUp("");
    setPrice("");
  };
  const handleTopUp = (e) => {
    e.preventDefault();
    if (price == "")
      return setInput(false), toast.error("Enter your top up amount");
    setLoading(true);
    topUp({ amount: price }, token, controller)
      .then((res) => {
        setLinkTopUp(res.data.data.redirectUrl);
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
    <>
      {loading && (
        <div className="fixed w-full h-full bg-[rgba(0,0,0,.5)] z-[60]">
          <Loaders />
        </div>
      )}
      <div className="fixed h-screen w-full flex justify-center items-center bg-[rgba(0,0,0,.5)] z-30">
        <div
          className={`w-[380px] h-[360px] md:w-[450px] md:h-[360px] relative bg-white rounded-2xl py-4 pt-12 px-8 ${
            linkTopUp && "h-[450px] md:h-[450px]"
          }`}>
          <p
            className="font-semibold text-2xl absolute right-[8%] cursor-pointer text-grey-secondary"
            onClick={(e) => {
              e.preventDefault();
              setTopUp(false);
            }}>
            X
          </p>
          <p className="font-bold text-grey-primary text-xl mb-4">TopUp</p>
          <p className="text-grey-secondary opacity-90 mb-12">
            Enter the amount of money, and click submit
          </p>
          {linkTopUp && (
            <>
              <div className="fixed w-[320px] h-[50px] md:w-[380px] mt-28 text-center flex justify-center items-center font-bold bg-blue-primary text-white rounded-2xl z-40 hover:bg-blue-950 cursor-pointer">
                <Link href={linkTopUp} target="_blank" onClick={toogleSucces}>
                  Proceed to payment
                </Link>
              </div>
              <button
                className="fixed  w-[320px] h-[50px] md:w-[380px] mt-48 text-center flex justify-center items-center font-bold bg-red-500 text-white rounded-2xl z-40 hover:bg-red-800 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  setLinkTopUp("");
                  setPrice("");
                }}>
                Cancel
              </button>
            </>
          )}
          <input
            type="number"
            inputMode="numeric"
            disabled={linkTopUp}
            className={`border-2 border-solid active:outline-none focus:outline-none w-full focus:border-black text-3xl py-4 text-center arrow
          ${input ? "border-blue-primary" : "border-red-600"}`}
            value={price}
            onChange={valuePrice}
          />
          <div className="w-full flex items-end justify-end">
            <button
              className={`btn px-6 py-2 rounded-lg bg-blue-primary text-white hover:bg-blue-900 mt-12 ${
                linkTopUp ? "hidden" : "block"
              }`}
              onClick={handleTopUp}>
              Submit
            </button>
          </div>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
          theme="light"
        />
      </div>
    </>
  );
}

export default TopUp;
