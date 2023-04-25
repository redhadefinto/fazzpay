/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import Loaders from "../Loaders";

function InfoCard({ setTopUp }) {
  const profile = useSelector((state) => state.profile.data.data);
  const router = useRouter();
  const rupiah = (number) => {
    if (number) {
      return `IDR ${number
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}`;
    }
  };
  return (
    <>
      {!profile ? (
        <div className="fixed top-0 right-0 w-full h-full bg-[rgba(0,0,0,.5)] z-[60]">
          <Loaders />
        </div>
      ) : (
        <section className="flex shadow-xl bg-blue-primary w-full text-white-primary px-4 py-8 rounded-3xl lg:px-8">
          <div className="w-[60%] flex flex-col gap-4 justify-center">
            <p>Balance</p>
            <p className="font-bold text-xl flex flex-wrap lg:text-3xl">
              {rupiah(profile.balance) || "Rp. 0"}
            </p>
            <p>{profile.noTelp || "Phone number empty"}</p>
          </div>
          <div className="flex w-[40%] flex-col gap-6 lg:items-end">
            <button
              className="flex gap-2 border-2 border-solid border-white bg-[rgba(255,255,255,.2)] px-2 py-2 rounded-lg cursor-pointer hover:bg-blue-900 lg:w-[70%]"
              onClick={(e) => {
                e.preventDefault();
                router.push("/transfer?page=1&limit=10&search=");
              }}>
              <i className="bi bi-wallet2"></i>
              <p>Transfer</p>
            </button>
            <button
              className="flex gap-2 border-2 border-solid border-white bg-[rgba(255,255,255,.2)] px-2 py-2 rounded-lg cursor-pointer hover:bg-blue-900 lg:w-[70%]"
              onClick={(e) => {
                e.preventDefault();
                setTopUp(true);
              }}>
              <i className="bi bi-plus-circle "></i>
              <p>Top Up</p>
            </button>
          </div>
        </section>
      )}
    </>
  );
}

export default InfoCard;
