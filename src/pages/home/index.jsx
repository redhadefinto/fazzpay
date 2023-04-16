import FooterHome from "@/components/FooterHome";
import HeaderHome from "@/components/HeaderHome";
import Link from "next/link";
import React, { useState } from "react";
import profile from "../../assets/profile/profile.png";
import Image from "next/image";
import { useRouter } from "next/router";
import BarChart from "@/components/BarChart";

// import "../../styles/globals.css";
function Home() {
  const [sidebar, setSideBar] = useState(false);
  const [topUp, setTopUp] = useState();
  const router = useRouter();
  const toggleSidebar = (e) => {
    e.preventDefault();
    setSideBar(!sidebar);
  };
  // console.log(router.pathname);
  return (
    <>
      <button
        className="drawer-button py-8 bg-blue-900 fixed top-[40%] rounded-r-3xl hover:bg-blue-700 hover:delay-100 hover:transition-all cursor-pointer lg:hidden"
        onClick={toggleSidebar}>
        <i class="bi bi-arrow-bar-right text-white font-bold text-2xl"></i>
      </button>
      <div
        className={`fixed h-screen w-full delay-200 bg-[rgba(0,0,0,.5)] z-10 side-bar ${
          sidebar ? "block" : "hidden"
        }`}
        onClick={toggleSidebar}></div>
      <div
        className={`fixed h-screen w-[70%] bg-white side-bar z-20 pt-12 flex flex-col gap-12 ${
          sidebar ? "left-0" : "left-[-100%]"
        }`}>
        <button
          className="drawer-button py-8 bg-blue-900 absolute top-[40%] right-[-7%] rounded-r-3xl hover:bg-blue-700 hover:delay-100 hover:transition-all cursor-pointer lg:hidden"
          onClick={toggleSidebar}>
          <i class="bi bi-arrow-bar-right text-white font-bold text-2xl"></i>
        </button>
        <Link
          href={"/home"}
          className={`flex pl-[15%] gap-4 text-2xl hover:border-l-4 hover:border-solid hover:border-blue-primary hover:text-blue-primary hover:font-semibold ${
            router.pathname === "/home"
              ? "border-l-4 border-solid border-blue-600 text-blue-primary font-semibold"
              : "text-grey-secondary font-medium"
          }`}>
          <i class="bi bi-grid"></i>
          <p>Dashboard</p>
        </Link>
        <Link
          href={"/transfer"}
          className={`flex pl-[15%] gap-4 text-2xl hover:border-l-4 hover:border-solid hover:border-blue-primary hover:text-blue-primary hover:font-semibold ${
            router.pathname === "/transfer"
              ? "border-l-4 border-solid border-blue-600 text-blue-primary font-semibold"
              : "text-grey-secondary font-medium"
          }`}>
          <i class="bi bi-wallet2"></i>
          <p>Transfer</p>
        </Link>
        <Link
          href={"/topup"}
          className={`flex pl-[15%] gap-4 text-2xl hover:border-l-4 hover:border-solid hover:border-blue-primary hover:text-blue-primary hover:font-semibold ${
            router.pathname === "/topup"
              ? "border-l-4 border-solid border-blue-600 text-blue-primary font-semibold"
              : "text-grey-secondary font-medium"
          }`}>
          <i class="bi bi-plus-circle "></i>
          <p>Top Up</p>
        </Link>
        <Link
          href={"/profile"}
          className={`flex pl-[15%] gap-4 text-2xl hover:border-l-4 hover:border-solid hover:border-blue-primary hover:text-blue-primary hover:font-semibold ${
            router.pathname === "/profile"
              ? "border-l-4 border-solid border-blue-600 text-blue-primary font-semibold"
              : "text-grey-secondary font-medium"
          }`}>
          <i class="bi bi-person-plus-fill "></i>
          <p>Profile</p>
        </Link>
        <Link
          href={"/logout"}
          className={`flex pl-[15%] gap-4 text-2xl text-grey-secondary font-medium absolute bottom-0 mb-12 hover:border-l-4 hover:border-solid hover:border-blue-primary hover:text-blue-primary hover:font-semibold`}>
          <i class="bi bi-box-arrow-right"></i>
          <p>Logout</p>
        </Link>
      </div>
      {topUp && (
        <div className="fixed h-screen w-full flex justify-center items-center bg-[rgba(0,0,0,.5)] z-30">
          <div className="w-[450px] h-[360px] relative bg-white rounded-2xl py-8 pt-12 px-8 ">
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
            <input
              type="text"
              className="border-2 border-solid border-blue-primary active:outline-none focus:outline-none w-full focus:border-black text-3xl py-4 text-center"
            />
            <div className="w-full flex items-end justify-end">
              <button className="btn px-6 py-2 rounded-lg bg-blue-primary text-white hover:bg-blue-900 mt-12">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      <HeaderHome />
      <main
        className={`bg-white-secondary min-h-screen flex px-[8%] lg:py-8 lg:px-[5%] xl:px-[8%]`}>
        <section className="hidden w-[30%] h-[95vh] lg:h-[105vh] xl:h-[95vh] lg:flex">
          <div
            className={`w-[85%] h-full bg-white relative py-12 flex rounded-xl flex-col gap-12`}>
            <Link
              href={"/home"}
              className={`flex pl-[15%] gap-4 text-2xl hover:border-l-4 hover:border-solid hover:border-blue-primary hover:text-blue-primary hover:font-semibold ${
                router.pathname === "/home"
                  ? "border-l-4 border-solid border-blue-600 text-blue-primary font-semibold"
                  : "text-grey-secondary font-medium"
              }`}>
              <i class="bi bi-grid"></i>
              <p>Dashboard</p>
            </Link>
            <Link
              href={"/transfer"}
              className={`flex pl-[15%] gap-4 text-2xl hover:border-l-4 hover:border-solid hover:border-blue-primary hover:text-blue-primary hover:font-semibold ${
                router.pathname === "/transfer"
                  ? "border-l-4 border-solid border-blue-600 text-blue-primary font-semibold"
                  : "text-grey-secondary font-medium"
              }`}>
              <i class="bi bi-wallet2"></i>
              <p>Transfer</p>
            </Link>
            <button
              className={`flex pl-[15%] gap-4 text-2xl hover:border-l-4 hover:border-solid hover:border-blue-primary hover:text-blue-primary hover:font-semibold ${
                router.pathname === "/topup"
                  ? "border-l-4 border-solid border-blue-600 text-blue-primary font-semibold"
                  : "text-grey-secondary font-medium"
              }`}
              onClick={(e) => {
                e.preventDefault();
                setTopUp(true);
              }}>
              <i class="bi bi-plus-circle "></i>
              <p>Top Up</p>
            </button>
            <Link
              href={"/profile"}
              className={`flex pl-[15%] gap-4 text-2xl hover:border-l-4 hover:border-solid hover:border-blue-primary hover:text-blue-primary hover:font-semibold ${
                router.pathname === "/profile"
                  ? "border-l-4 border-solid border-blue-600 text-blue-primary font-semibold"
                  : "text-grey-secondary font-medium"
              }`}>
              <i class="bi bi-person-plus-fill "></i>
              <p>Profile</p>
            </Link>
            <Link
              href={"/logout"}
              className={`flex pl-[15%] gap-4 text-2xl text-grey-secondary absolute bottom-0 mb-12  font-medium hover:border-l-4 hover:border-solid hover:border-blue-primary hover:text-blue-primary hover:font-semibold`}>
              <i class="bi bi-box-arrow-right"></i>
              <p>Logout</p>
            </Link>
          </div>
        </section>
        <section className="w-full lg:w-[70%] mt-8 lg:mt-0">
          <section className="flex bg-blue-primary w-full text-white-primary px-4 py-8 rounded-3xl lg:px-8">
            <div className="w-[60%] flex flex-col gap-4 justify-center">
              <p>Balance</p>
              <p className="font-bold text-xl flex flex-wrap lg:text-3xl">
                Rp120.000
              </p>
              <p>+62 813-9387-7946</p>
            </div>
            <div className="flex w-[40%] flex-col gap-6 lg:items-end">
              <button className="flex gap-2 border-2 border-solid border-white bg-[rgba(255,255,255,.2)] px-2 py-2 rounded-lg cursor-pointer hover:bg-blue-900 lg:w-[70%]">
                <i class="bi bi-wallet2"></i>
                <p>Transfer</p>
              </button>
              <button className="flex gap-2 border-2 border-solid border-white bg-[rgba(255,255,255,.2)] px-2 py-2 rounded-lg cursor-pointer hover:bg-blue-900 lg:w-[70%]">
                <i class="bi bi-plus-circle "></i>
                <p>Top Up</p>
              </button>
            </div>
          </section>
          <section className="lg:flex lg:mt-12 gap-8 mt-8 lg:h-[70vh] mb-8 xl:h-[60vh]">
            <div className="bg-white lg:w-[60%] py-8 mb-12 lg:mb-0 rounded-xl">
              <div className="flex bg-white">
                <div className="w-[60%] flex flex-col items-center">
                  <i class="bi bi-arrow-down text-green-500 text-3xl font-extrabold"></i>
                  <p className="text-grey-secondary">Income</p>
                  <p className="text-grey-primary font-semibold">Rp2.120.000</p>
                </div>
                <div className="w-[50%] flex flex-col items-center">
                  <i class="bi bi-arrow-up text-red-500 text-3xl font-extrabold"></i>
                  <p className="text-grey-secondary">Expense</p>
                  <p className="text-grey-primary font-semibold">Rp1.560.000</p>
                </div>
              </div>
              <div className="hidden h-[200px] mt-12 w-full lg:flex items-center justify-center">
                <BarChart />
              </div>
            </div>
            <div className="lg:w-[40%] bg-white px-4 py-8 rounded-xl">
              <div className="flex justify-between mb-12">
                <p className="font-semibold">Transaction History</p>
                <Link href={"/history"} className="font-bold text-blue-primary">
                  See all
                </Link>
              </div>
              {/* data transactions */}
              <div className="flex flex-col gap-4 xl:gap-6">
                <div className="flex gap-4">
                  <div className="flex items-center justify-center">
                    <Image src={profile} alt="profile" width={50} height={50} />
                  </div>
                  <div className="flex-1">
                    <p className="text-grey-primary font-bold">Samuel Suhi</p>
                    <p>Accept</p>
                  </div>
                  <p className="text-center place-items-center place-self-center">
                    +Rp50.000
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center justify-center">
                    <Image src={profile} alt="profile" width={50} height={50} />
                  </div>
                  <div className="flex-1">
                    <p className="text-grey-primary font-bold">Samuel Suhi</p>
                    <p>Accept</p>
                  </div>
                  <p className="text-center place-items-center place-self-center">
                    +Rp50.000
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center justify-center">
                    <Image src={profile} alt="profile" width={50} height={50} />
                  </div>
                  <div className="flex-1">
                    <p className="text-grey-primary font-bold">Samuel Suhi</p>
                    <p>Accept</p>
                  </div>
                  <p className="text-center place-items-center place-self-center">
                    +Rp50.000
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center justify-center">
                    <Image src={profile} alt="profile" width={50} height={50} />
                  </div>
                  <div className="flex-1">
                    <p className="text-grey-primary font-bold">Samuel Suhi</p>
                    <p>Accept</p>
                  </div>
                  <p className="text-center place-items-center place-self-center">
                    +Rp50.000
                  </p>
                </div>
              </div>
            </div>
          </section>
        </section>
        <div></div>
      </main>
      <FooterHome />
    </>
  );
}

export default Home;
