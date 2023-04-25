import HeaderHome from "@/components/HeaderHome";
import SideBar from "@/components/SideBar";
import SideBarMobile from "@/components/SideBarMobile";
import TopUp from "@/components/TopUp";
import React, { useState } from "react";
import failedIcon from "../../assets/icon/failed.png";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import FooterHome from "@/components/FooterHome";
import privateRoute from "@/utils/wrapper/private.route";
import Layout from "@/components/Layout";
function Failed() {
  const [topUp, setTopUp] = useState();
  const dispatch = useDispatch();
  const router = useRouter();
  // const [input, setInput] = useState(true);
  const transactions = useSelector((state) => state.transactions.data);
  const profileUser = useSelector((state) => state.profile.data.data);
  const rupiah = (number) => {
    if (number) {
      return `IDR ${number
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}`;
    }
  };
  const transactionDate = () => {
    const arrbulan = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const date = new Date();
    const millisecond = date.getMilliseconds();
    const detik = date.getSeconds();
    const menit = date.getMinutes();
    const jam = date.getHours();
    const hari = date.getDay();
    const tanggal = date.getDate();
    const bulan = date.getMonth();
    const tahun = date.getFullYear();
    return `${arrbulan[bulan]} ${tanggal} , ${tahun} - ${jam}:${menit} `;
  };
  return (
    <Layout title={"Failed"}>
      <SideBarMobile setTopUp={setTopUp} />
      {topUp && <TopUp setTopUp={setTopUp} />}
      <HeaderHome />
      <main
        className={`bg-white-secondary h-max flex px-[8%] py-8 lg:py-8 lg:px-[5%] xl:px-[8%]`}>
        <SideBar setTopUp={setTopUp} />
        <section className="w-full min-h-max lg:w-[70%] mt-4 lg:mt-0">
          <div className="min-h-max shadow-lg bg-white-primary rounded-lg px-8 py-4">
            <div className="w-full flex flex-col justify-center items-center gap-4 mt-8">
              <Image src={failedIcon} alt="Succes" />
              <p className="text-[#4D4B57] font-bold text-xl">
                Transfer Failed
              </p>
            </div>
            <div className="flex items-center w-full flex-col justify-center">
              <div className="flex gap-2 bg-white mt-8 w-full flex-col px-4 py-4 rounded-lg drop-shadow-lg">
                <p className="text-[#7A7886]">Amount</p>
                <p className="font-semibold text-xl font-sans">
                  {rupiah(transactions.amount)}
                </p>
              </div>
              <div className="flex gap-2 bg-white mt-8 w-full flex-col px-4 py-4 rounded-lg drop-shadow-lg">
                <p className="text-[#7A7886]">Balance Left</p>
                <p className="font-semibold text-xl font-sans">
                  {rupiah(profileUser.balance - transactions.amount) || "Rp.0"}
                </p>
              </div>
              <div className="flex gap-2 bg-white mt-8 w-full flex-col px-4 py-4 rounded-lg drop-shadow-lg">
                <p className="text-[#7A7886]">Date & Time</p>
                <p className="font-semibold text-xl font-sans">
                  {transactionDate()}
                </p>
              </div>
              <div className="flex gap-2 bg-white mt-8 w-full flex-col px-4 py-4 rounded-lg drop-shadow-lg">
                <p className="text-[#7A7886]">Notes</p>
                <p className="font-semibold text-xl font-sans">
                  {transactions.notes}
                </p>
              </div>
            </div>
            <p className="text-[#514F5B] font-bold mt-12">Transfer to</p>
            <div className="flex gap-6 bg-white mt-4 px-2 py-4 mb-8 drop-shadow-lg rounded-md">
              <div className="flex w-[60px] h-[60px] bg-cover">
                <Image
                  src={
                    transactions.image === null
                      ? `${process.env.CLOUDINARY_LINK}Fazzpay/example_qx2pf0.png`
                      : `${process.env.CLOUDINARY_LINK}${transactions.image}`
                  }
                  alt="profile"
                  width={60}
                  height={60}
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-grey-primary font-bold">
                  {transactions.firstName} {transactions.lastName}
                </p>
                <p className="text-grey-secondary">{transactions.phone}</p>
              </div>
            </div>
            <div className="mt-16 flex justify-end w-full gap-4 lg:gap-8">
              <button className="paginasi border-2 border-solid border-blue-primary text-blue-primary before:bg-blue-primary hover:text-white-primary">
                <i className="bi bi-download mr-2 font-bold"></i>
                Download
              </button>
              <button
                className="paginasi border-2 border-solid border-blue-primary text-blue-primary before:bg-blue-primary hover:text-white-primary"
                onClick={() => {
                  router.push("/home");
                }}>
                Back To Home
              </button>
            </div>
          </div>
        </section>
      </main>
      <FooterHome />
    </Layout>
  );
}

export default privateRoute(Failed);
