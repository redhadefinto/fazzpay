import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

function SideBar({ setTopUp, maxCustom }) {
  // const [topUp, setTopUp] = useState();
  const router = useRouter();
  const transferRegex = /^\/transfer(\/.*)?$/;
  return (
    <section
      className={`hidden w-[30%] h-[95vh] lg:h-[105vh] xl:h-[95vh] lg:flex ${
        maxCustom && "lg:h-[155vh] xl:h-[155.1vh]"
      }`}>
      <div
        className={`w-[85%] h-full bg-white relative py-12 flex rounded-xl flex-col gap-12`}>
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
            router.pathname === "/profile"
              ? "border-l-4 border-solid border-blue-600 text-blue-primary font-semibold"
              : "text-grey-secondary font-medium"
          }`}>
          <i className="bi bi-person-plus-fill "></i>
          <p>Profile</p>
        </Link>
        <Link
          href={"/logout"}
          className={`flex pl-[15%] gap-4 text-2xl text-grey-secondary absolute bottom-0 mb-12  font-medium hover:border-l-4 hover:border-solid hover:border-blue-primary hover:text-blue-primary hover:font-semibold`}>
          <i className="bi bi-box-arrow-right"></i>
          <p>Logout</p>
        </Link>
      </div>
    </section>
  );
}

export default SideBar;
