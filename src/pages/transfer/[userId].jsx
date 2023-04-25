/* eslint-disable react-hooks/exhaustive-deps */
import HeaderHome from "@/components/HeaderHome";
import SideBar from "@/components/SideBar";
import SideBarMobile from "@/components/SideBarMobile";
import TopUp from "@/components/TopUp";
import { getUserProfile } from "@/utils/https/users";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import profile from "../../assets/profile/profile.png";
import Loaders from "@/components/Loaders";
import { transferBalance } from "@/utils/https/transfer";
import { ToastContainer, toast } from "react-toastify";
import FooterHome from "@/components/FooterHome";
import transactions, { transactionActions } from "@/redux/slices/transactions";
import privateRoute from "@/utils/wrapper/private.route";

function TransferById() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [topUp, setTopUp] = useState();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState("");
  const [input, setInput] = useState(true);
  const [notes, setNotes] = useState("");
  const controller = useMemo(() => new AbortController(), []);
  const token = useSelector((state) => state.auth.data.data.token);
  const profileUser = useSelector((state) => state.profile.data.data);
  // const balance = profile.balance;
  const id = router.query.userId;
  // console.log(router.query);
  const valuePrice = (e) => {
    setInput(true);
    setPrice(e.target.value);
  };
  useEffect(() => {
    setLoading(true);
    getUserProfile(id, token, controller)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.msg);
        if (err.response.data.msg === "Id user not found") {
          router.push(`/transfer?page=1&limit=10&search=`);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const handleTransfer = (e) => {
    e.preventDefault();
    // console.log(typeof price === "");
    console.log(price);
    if (price == "")
      return setInput(false), toast.error("Enter your top up amount");
    if (profileUser.balance == 0) {
      return setInput(false), toast.error("your balance is empty");
    }
    if (profile.balance < price) {
      return toast.error("overlimit");
    }
    if (price < 1000) {
      return toast.error("minimum transfer of 2000");
    }
    console.log(data.image);
    return dispatch(
      transactionActions.getTransactionsThunk({
        receiverId: id,
        amount: price,
        notes: notes || "-",
        image: data.image,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.noTelp || "-",
      })
    )
      .then((res) => {
        toast.success("Confirmation Payment"), console.log(res);
        router.push("/transfer/confirmation");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.msg);
      });
  };
  const rupiah = (number) => {
    if (number) {
      return `IDR ${number
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}`;
    }
  };
  console.log(data);
  // console.log(balance);
  // console.log(profileUser.balance);
  return (
    <>
      <SideBarMobile setTopUp={setTopUp} />;
      {topUp && <TopUp setTopUp={setTopUp} />}
      <HeaderHome />
      <main
        className={`bg-white-secondary h-max flex px-[8%] py-8 lg:py-8 lg:px-[5%] xl:px-[8%]`}>
        <SideBar setTopUp={setTopUp} />
        <section className="w-full min-h-max  lg:w-[70%] mt-4 lg:mt-0">
          <div className="min-h-screen bg-white-primary rounded-lg px-8 py-4">
            <p className="font-bold">Transfer Money</p>
            {loading || !data ? (
              <div className="flex justify-center items-center mt-48 relative h-[100%]">
                <Loaders />
              </div>
            ) : (
              <>
                <div className="flex gap-6 bg-white mt-8 px-2 py-4 mb-8">
                  <div className="flex w-[60px] h-[60px] bg-cover">
                    <Image
                      src={
                        data.image === null
                          ? `${process.env.CLOUDINARY_LINK}Fazzpay/example_qx2pf0.png`
                          : `${process.env.CLOUDINARY_LINK}${data.image}`
                      }
                      alt="profile"
                      width={60}
                      height={60}
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-grey-primary font-bold">
                      {data.firstName} {data.lastName}
                    </p>
                    <p className="text-grey-secondary">{data.noTelp || "-"}</p>
                  </div>
                </div>
                <p className="text-[#7A7886] mb-8 text-center">
                  Type the amount you want to transfer and then press continue
                  to the next steps.
                </p>
                <input
                  type="number"
                  inputMode="numeric"
                  // disabled={linkTopUp}
                  placeholder="Rp.0"
                  className={`border-none active:outline-none font-bold focus:outline-none w-full text-3xl py-4 text-center arrow
          ${input ? "text-blue-primary" : "border-red-600"}`}
                  value={price}
                  onChange={valuePrice}
                />
                <p className="text-center mt-8">
                  {rupiah(profileUser.balance) || "Rp.0"} Available
                </p>
                <div className="flex w-full mt-8 items-center justify-center md:mt-16">
                  <div className="bg-[#3A3D421A] rounded-lg flex gap-4 relative min-[100px] w-[100%] self-center md:w-[70%]">
                    <i className="bi bi-pencil font-bold text-xl absolute top-[20%] left-6 cursor-pointer"></i>
                    <input
                      type="text"
                      className="bg-transparent px-16 min-h-[45px] py-2 w-full focus:outline-none focus:border-b-2 hover:border-b-2 border-solid border-grey-primary"
                      placeholder="Add some notes"
                      value={notes || ""}
                      onChange={(e) => {
                        setNotes(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="mt-12 w-full flex gap-4 md:items-center md:justify-around md:mt-16">
                  <button
                    className="paginasi border-2 border-solid border-red-600 text-red-600 before:bg-red-600 hover:text-white-primary"
                    onClick={() => {
                      router.push(`/transfer?page=1&limit=10&search=`);
                    }}>
                    Cancel
                  </button>
                  <button
                    className="paginasi border-2 border-solid border-blue-primary text-blue-primary before:bg-blue-primary hover:text-white-primary"
                    onClick={handleTransfer}>
                    Continue
                  </button>
                </div>
              </>
            )}
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
    </>
  );
}

export default privateRoute(TransferById);
