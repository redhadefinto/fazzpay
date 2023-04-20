import Image from "next/image";
import React from "react";
import profile from "../../assets/profile/profile.png";
function CardHomeHistory({ fullName, image, status, amount, type }) {
  const rupiah = (number) => {
    if (number) {
      return `IDR ${number
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}`;
    }
  };
  return (
    <div className="flex gap-4">
      <div className="flex items-center justify-center">
        <Image src={image} alt="profile" width={50} height={50} />
      </div>
      <div className="flex-1">
        <p className="text-grey-primary font-bold">{fullName}</p>
        <p>{type}</p>
      </div>
      <div className="flex flex-wrap-reverse items-end">
        <p
          className={`text-center place-items-center text-sm font-semibold place-self-center ${
            type === "topup" ? "text-green-600" : "text-red-600"
          }`}>
          {type === "topup" ? "+" : "-"} {rupiah(amount)}
        </p>
      </div>
    </div>
  );
}

export default CardHomeHistory;
