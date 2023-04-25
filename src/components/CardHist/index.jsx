import React from "react";
import Image from "next/image";

function CardHist(props) {
  const rupiah = (number) => {
    if (number) {
      return `IDR ${number
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}`;
    }
  };

  const imgUrl =
    "https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/" +
    props.img;

  const imgDefault =
    "https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/";
  return (
    <section className=" flex  justify-between  w-full mt-8 bg-white drop-shadow-lg px-2 py-4 rounded-lg hover:bg-slate-100 hover:transition-transform hover:scale-105 cursor-pointer">
      <div className=" flex gap-5">
        <div className=" w-[3.3rem] h-[3.3rem] rounded-[0.68rem] overflow-hidden">
          <Image
            src={props.img ? imgUrl : `${imgDefault}Fazzpay/example_qx2pf0.png`}
            alt="pp"
            width={52.8}
            height={52.8}
            className=" w-full h-full object-cover"
          />
        </div>
        <div className=" flex flex-col justify-center gap-1">
          <div className=" text-base font-bold text-dark">
            <p>{props.fullName}</p>
          </div>
          <div className=" text-sm text-dark">
            <p>{props.type}</p>
          </div>
        </div>
      </div>
      <div className=" text-base text-end justify-end items-end flex font-bold cursor-pointer flex-col">
        <p
          className={`text-base lg:text-2xl md:text-lg ${
            props.type === "accept" || props.type === "topup"
              ? "text-green-500"
              : "text-error"
          } font-bold text-center md:text-end`}>
          {props.type === "accept" || props.type === "topup" ? "+ " : "- "}
          Rp. {props.amount.toLocaleString("id-ID")}
        </p>
        <p className="text-grey-primary">{props.notes || "-"}</p>
      </div>
    </section>
  );
}

export default CardHist;
