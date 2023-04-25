import HeaderHome from "@/components/HeaderHome";
import Loaders from "@/components/Loaders";
import SideBar from "@/components/SideBar";
import SideBarMobile from "@/components/SideBarMobile";
import TopUp from "@/components/TopUp";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import profile from "../../../assets/profile/profile.png";
import { useDispatch, useSelector } from "react-redux";
import { transferBalance } from "@/utils/https/transfer";
import ReactCodeInput from "react-code-input";
import { ToastContainer, toast } from "react-toastify";
import { cekPin } from "@/utils/https/users";
import FooterHome from "@/components/FooterHome";
import { useRouter } from "next/router";
import { transactionActions } from "@/redux/slices/transactions";
import privateRoute from "@/utils/wrapper/private.route";
import Layout from "@/components/Layout";
function Confirmation() {
  const [topUp, setTopUp] = useState();
  const dispatch = useDispatch();
  const router = useRouter();
  const controller = useMemo(() => new AbortController(), []);
  const [loading, setLoading] = useState();
  const [input, setInput] = useState(true);
  const [data, setData] = useState();
  const [modalPin, setModalPin] = useState(false);
  const [cekPinError, setCekPinError] = useState(false);
  const [getPin, setGetPin] = useState("");
  const valuePin = (e) => (setInput(true), setGetPin(`${e}`));
  const transactions = useSelector((state) => state.transactions.data);
  const profileUser = useSelector((state) => state.profile.data.data);
  const token = useSelector((state) => state.auth.data.data.token);
  // console.log(transactions);
  const transferHandler = (e) => {
    e.preventDefault();
    if (getPin.length < 6 || !getPin)
      return setInput(false), toast.error("Please input pin correctly");
    setInput(true);
    setLoading(true);
    cekPin(getPin, token, controller)
      .then(() => {
        transferBalance(
          {
            receiverId: transactions.receiverId,
            amount: transactions.amount,
            notes: transactions.notes,
          },
          token,
          controller
        )
          .then((res) => {
            // console.log(res);
            router.push("/transfer/succes");
          })
          .catch((err) => {
            console.log(err);
            toast.error("error");
            router.push("/transfer/failed");
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch((err) => {
        setInput(false);
        toast.error(err.response.data.msg);
        setLoading(false);
        setCekPinError(true);
        return;
      })
      .finally(() => {
        setLoading(false);
      });
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
  const rupiah = (number) => {
    if (number) {
      return `IDR ${number
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}`;
    }
  };
  const style = {
    className: "reactCodeInput arrow",
    inputStyle: {
      fontFamily: "Nunito Sans",
      marginLeft: "7.5px",
      marginRight: "7.5px",
      MozAppearance: "textfield",
      width: "11.5%",
      borderRadius: "3px",
      fontSize: "30px",
      height: "50px",
      backgroundColor: "white",
      color: "#3A3D42",
      borderBottom: `2px solid ${input ? "#6379F4" : "#FF5B37"}`,
      textAlign: "center",
      marginBottom: "3rem",
      outline: "none",
      WebkitAppearance: "none",
    },
  };
  // console.log(transactions);
  return (
    <Layout title={"Confirm"}>
      {loading && (
        <div className="fixed w-full h-full bg-[rgba(0,0,0,.5)] z-50">
          <Loaders />
        </div>
      )}
      <SideBarMobile setTopUp={setTopUp} />
      {topUp && <TopUp setTopUp={setTopUp} />}
      {modalPin && (
        <>
          <div className="fixed w-full h-full flex items-center justify-center bg-[rgba(0,0,0,.5)] z-10">
            <div className="w-[350px] h-[300px] bg-white-primary px-4 py-6 rounded-lg relative">
              <button
                className="absolute w-[30px] h-[30px] rounded-full bg-red-600 hover:bg-red-400 flex justify-center items-center font-semibold text-white-primary right-0 mr-4
              "
                onClick={(e) => {
                  e.preventDefault();
                  setModalPin(false);
                  setGetPin("");
                  setInput(true);
                }}>
                X
              </button>
              <p className="font-bold mb-4">Enter Pin to transfer</p>
              <p className="text-grey-secondary opacity-90">
                Enter your 6 digits PIN for confirmation to continue
                transferring money.{" "}
              </p>
              <div className="w-ful flex justify-center mt-4">
                <ReactCodeInput
                  type="password"
                  fields={6}
                  inputMode="numeric"
                  pattern="/^-?\d+\.?\d*$/"
                  value={getPin}
                  onChange={valuePin}
                  {...style}
                />
              </div>
              <div className="w-full justify-end flex px-4">
                <button
                  className="paginasi border-2 border-solid border-blue-primary text-blue-primary before:bg-blue-primary hover:text-white-primary"
                  onClick={transferHandler}>
                  Continue
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <HeaderHome />
      <main
        className={`bg-white-secondary h-max flex px-[8%] py-8 lg:py-8 lg:px-[5%] xl:px-[8%]`}>
        <SideBar setTopUp={setTopUp} maxCustom={true} />
        <section className="w-full lg:w-[70%] mt-4 lg:mt-0">
          <div className="min-h-max shadow-lg bg-white-primary rounded-lg px-8 py-4">
            <p className="font-bold">Transfer To</p>
            <>
              <div className="flex gap-6 bg-white mt-8 px-2 py-4 mb-8 h-[11%]">
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
              <p className="font-bold">Details</p>
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
                    {rupiah(profileUser.balance) || "Rp.0"}
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
                <div className="mt-16 flex justify-end w-full">
                  <button
                    className="paginasi border-2 border-solid border-blue-primary text-blue-primary before:bg-blue-primary hover:text-white-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      setModalPin(true);
                    }}>
                    Continue
                  </button>
                </div>
              </div>
            </>
          </div>
        </section>
      </main>
      <FooterHome />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        theme="light"
      />
    </Layout>
  );
}

export default privateRoute(Confirmation);
