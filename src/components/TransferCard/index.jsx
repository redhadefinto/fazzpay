import Image from "next/image";
import React from "react";
import profile from "../../assets/profile/profile.png";
import { useRouter } from "next/router";
function TransferCard({ userId, image, firstName, lastName, phone }) {
  const router = useRouter();
  return (
    <>
      <div
        className="flex gap-6 bg-white drop-shadow-lg px-2 py-4 rounded-lg hover:bg-slate-100 hover:transition-transform hover:scale-105 cursor-pointer"
        onClick={() => {
          router.push(`/transfer/${userId}`);
        }}>
        <Image
          src={image}
          alt="profile"
          width={60}
          height={60}
          className="rounded-lg"
        />
        <div className="flex flex-col gap-2">
          <p className="text-grey-primary font-bold">
            {firstName} {lastName}
          </p>
          <p className="text-grey-secondary">{phone}</p>
        </div>
      </div>
    </>
  );
}

export default TransferCard;
