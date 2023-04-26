import Link from "next/link";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loaders from "../Loaders";
import { logOut } from "@/utils/https/auth";
import { authAction } from "@/redux/slices/auth";
import { profileAction } from "@/redux/slices/profile";
import { ToastContainer, toast } from "react-toastify";

function SideBarMobile({ setTopUp }) {
  const token = useSelector((state) => state.auth.data.data.token);
  const controller = useMemo(() => new AbortController(), []);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [sidebar, setSideBar] = useState(false);
  const transferRegex = /^\/transfer(\/.*)?$/;
  const profileRegex = /^\/profile(\/.*)?$/;
  const router = useRouter();
  const toggleSidebar = (e) => {
    e.preventDefault();
    setSideBar(!sidebar);
  };
  const logoutHandle = (e) => {
    e.preventDefault();
    setLoading(true);
    logOut(token, controller)
      .then((res) => {
        toast.success(res.data.msg);
        dispatch(authAction.filter());
        dispatch(profileAction.filter());
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(setLoading(false));
  };
  return (
    <>
      {loading && (
        <div className="fixed w-full h-full bg-[rgba(0,0,0,.5)] z-[60]">
          <Loaders />
        </div>
      )}
      {modal && (
        <>
          <div className="fixed top-0 right-0 w-full h-screen flex items-center justify-center bg-[rgba(0,0,0,.5)] z-50">
            <div className="w-[350px] h-[300px] bg-white-primary px-4 py-6 rounded-lg relative">
              <button
                className="absolute w-[30px] h-[30px] rounded-full bg-red-600 hover:bg-red-400 flex justify-center items-center font-semibold text-white-primary right-0 mr-4
              "
                onClick={(e) => {
                  e.preventDefault();
                  setModal(false);
                }}>
                X
              </button>
              <p className="font-bold mb-4">confirmation</p>
              <p className="text-grey-secondary opacity-90">
                are you sure you want to log out?
              </p>
              <div className="w-full justify-center flex px-4 mt-32">
                <button
                  className="paginasi border-2 border-solid border-blue-primary text-blue-primary before:bg-blue-primary hover:text-white-primary"
                  onClick={logoutHandle}>
                  Continue
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <button
        className="drawer-button py-8 bg-blue-900 fixed top-[40%] rounded-r-3xl hover:bg-blue-700 hover:delay-100 hover:transition-all cursor-pointer lg:hidden"
        onClick={toggleSidebar}>
        <i className="bi bi-arrow-bar-right text-white font-bold text-2xl"></i>
      </button>
      <div
        className={`fixed h-screen w-full delay-200 bg-[rgba(0,0,0,.5)] z-10 lg:hidden side-bar ${
          sidebar ? "block" : "hidden"
        }`}
        onClick={toggleSidebar}></div>
      <div
        className={`fixed h-screen w-[70%] bg-white side-bar z-20 pt-12 flex flex-col lg:hidden gap-12 ${
          sidebar ? "left-0" : "left-[-100%]"
        }`}>
        <button
          className="drawer-button py-8 bg-blue-900 absolute top-[40%] right-[-9%] md:right-[-4%] rounded-r-3xl hover:bg-blue-700 hover:delay-100 hover:transition-all cursor-pointer lg:hidden"
          onClick={toggleSidebar}>
          <i className="bi bi-arrow-bar-left text-white font-bold text-2xl"></i>
        </button>
        <Link
          href={"/home"}
          className={`flex pl-[15%] gap-4 text-2xl hover:border-l-4 hover:border-solid hover:border-blue-primary hover:text-blue-primary hover:font-semibold ${
            router.pathname === "/home"
              ? "border-l-4 border-solid border-blue-600 text-blue-primary font-semibold"
              : "text-grey-secondary font-medium"
          }`}>
          <i className="bi bi-grid"></i>
          <p>Dashboard</p>
        </Link>
        <Link
          href={"/transfer"}
          className={`flex pl-[15%] gap-4 text-2xl hover:border-l-4 hover:border-solid hover:border-blue-primary hover:text-blue-primary hover:font-semibold ${
            transferRegex.test(router.pathname)
              ? "border-l-4 border-solid border-blue-600 text-blue-primary font-semibold"
              : "text-grey-secondary font-medium"
          }`}>
          <i className="bi bi-wallet2"></i>
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
          <i className="bi bi-plus-circle "></i>
          <p>Top Up</p>
        </button>
        <Link
          href={"/profile"}
          className={`flex pl-[15%] gap-4 text-2xl hover:border-l-4 hover:border-solid hover:border-blue-primary hover:text-blue-primary hover:font-semibold ${
            profileRegex.test(router.pathname)
              ? "border-l-4 border-solid border-blue-600 text-blue-primary font-semibold"
              : "text-grey-secondary font-medium"
          }`}>
          <i className="bi bi-person-plus-fill "></i>
          <p>Profile</p>
        </Link>
        <button
          className={`flex pl-[15%] gap-4 text-2xl text-grey-secondary font-medium absolute bottom-0 mb-12 hover:border-l-4 hover:border-solid hover:border-blue-primary hover:text-blue-primary hover:font-semibold`}
          onClick={(e) => {
            e.preventDefault();
            setModal(true);
          }}>
          <i className="bi bi-box-arrow-right"></i>
          <p>Logout</p>
        </button>
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
    </>
  );
}

export default SideBarMobile;
