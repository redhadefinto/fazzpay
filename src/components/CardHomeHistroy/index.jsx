import Image from "next/image";
import React from "react";
import profile from "../../assets/profile/profile.png";
function CardHomeHistory() {
  return (
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
  );
}

export default CardHomeHistory;
