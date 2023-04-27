import Image from "next/image";
import React from "react";

function Comment({ pp, fullname, desc }) {
  return (
    <>
      <div className=" flex">
        <div className=" flex flex-col gap-[2.2rem] w-[20.9rem] h-[19.5rem] lg:w-[22.938rem] lg:h-[21.5rem] rounded-[1.3rem]  text-center justify-center items-centers px-8 py-11 bg-white  drop-shadow-lg ">
          <div className=" flex flex-col gap-[2.2rem] justify-center items-center ">
            <div className=" w-[3.8rem]  h-[3.8rem]  flex justify-center items-center">
              <Image src={pp} alt="call" width={60} height={60} />
            </div>
            <div className=" text-lg lg:text-2xl flex flex-wrap text-grey-primary font-bold">
              <p>{fullname}</p>
            </div>
          </div>
          <div className=" text-base lg:text-lg leading-8 flex flex-wrap text-grey-primary">
            <p>{desc}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Comment;
