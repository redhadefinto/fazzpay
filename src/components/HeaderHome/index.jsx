import React from "react";
import Image from "next/image";
import profile from "../../assets/profile/profile.png";
import { useSelector } from "react-redux";
function HeaderHome() {
  const profileUser = useSelector((state) => state.profile.data.data);
  return (
    <nav className="flex bg-blue-primary px-[8%] py-8 rounded-b-3xl lg:rounded-none lg:bg-white-primary lg:px-[5%] xl:px-[8%]">
      <div className="w-[50%] lg:flex items-center hidden">
        <p className=" lg:text-blue-primary font-bold text-3xl">FazzPay</p>
      </div>
      <div className="lg:w-[50%] w-full flex gap-6 items-center lg:justify-end relative">
        <Image
          src={
            profileUser.image === null
              ? `${process.env.CLOUDINARY_LINK}Fazzpay/example_qx2pf0.png`
              : `${process.envCLOUDINARY_LINK}${profileUser.image}`
          }
          alt="profile"
          width={50}
          height={50}
        />
        <div className="flex flex-col gap-1 lg:mr-[20%] xl:mr-[17%]">
          <p className="font-semibold text-base text-white lg:text-black">
            {profileUser.firstName} {profileUser.lastName || ""}
          </p>
          <p className="text-white lg:text-grey-primary opacity-90">
            {profileUser.noTelp || "Phone number empty"}
          </p>
        </div>
        <i className="bi bi-bell text-2xl font-semibold place-items-end absolute right-0 text-white lg:text-black"></i>
      </div>
    </nav>
  );
}

export default HeaderHome;
