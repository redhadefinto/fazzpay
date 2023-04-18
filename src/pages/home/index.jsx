/* eslint-disable react-hooks/exhaustive-deps */
import FooterHome from "@/components/FooterHome";
import HeaderHome from "@/components/HeaderHome";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import BarChart from "@/components/BarChart";
import privateRoute from "@/utils/wrapper/private.route";
import InfoCard from "@/components/InfoCard";
import SideBar from "@/components/SideBar";
import TopUp from "@/components/TopUp";
import SideBarMobile from "@/components/SideBarMobile";
import CardHomeHistory from "@/components/CardHomeHistroy";
import { getDashBoard } from "@/utils/https/users";
import { useDispatch, useSelector } from "react-redux";
import Loaders from "@/components/Loaders";
import { profileAction } from "@/redux/slices/profile";

function Home() {
  const [topUp, setTopUp] = useState();
  const dispatch = useDispatch();
  const controller = useMemo(() => new AbortController(), []);
  const [chart, setChart] = useState([]);
  const [loading, setLoading] = useState();
  const [topUpSucces, setTopUpSucces] = useState(false);
  const router = useRouter();
  const token = useSelector((state) => state.auth.data.data.token);
  const id = useSelector((state) => state.auth.data.data.id);
  useEffect(() => {
    setLoading(true);
    getDashBoard(id, token, controller)
      .then((res) => {
        setChart(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    dispatch(
      profileAction.getProfileThunk({
        id,
        token,
        controller,
      })
    );
  }, []);
  const rupiah = (number) => {
    if (number) {
      return `IDR ${number
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}`;
    }
  };
  return (
    <>
      {loading && (
        <div className="fixed w-full h-full bg-[rgba(0,0,0,.5)] z-[60]">
          <Loaders />
        </div>
      )}
      {/* SideBar Mobile Start */}
      <SideBarMobile setTopUp={setTopUp} />
      {/* SideBar Mobile Start */}
      {topUp && <TopUp setTopUp={setTopUp} />}
      <HeaderHome />
      <main
        className={`bg-white-secondary min-h-screen flex px-[8%] lg:py-8 lg:px-[5%] xl:px-[8%]`}>
        {/* Side Bar */}
        <SideBar
          setTopUp={setTopUp}
          topUpSucces={topUpSucces}
          setTopUpSucces={setTopUpSucces}
        />
        <section className="w-full lg:w-[70%] mt-8 lg:mt-0">
          {/* Info Card */}
          <InfoCard setTopUp={setTopUp} />
          <section className="lg:flex lg:mt-12 gap-8 mt-8 lg:h-[70vh] mb-8 xl:h-[60vh]">
            <div className="bg-white lg:w-[60%] py-8 mb-12 lg:mb-0 rounded-xl">
              <div className="flex bg-white">
                <div className="w-[60%] flex flex-col items-center">
                  <i className="bi bi-arrow-down text-green-500 text-3xl font-extrabold"></i>
                  <p className="text-grey-secondary">Income</p>
                  <p className="text-grey-primary font-semibold mt-2">
                    {rupiah(chart.totalIncome) || "Rp. 0"}
                  </p>
                </div>
                <div className="w-[50%] flex flex-col items-center">
                  <i className="bi bi-arrow-up text-red-500 text-3xl font-extrabold"></i>
                  <p className="text-grey-secondary">Expense</p>
                  <p className="text-grey-primary font-semibold mt-2">
                    {rupiah(chart.totalExpense) || "Rp. 0"}
                  </p>
                </div>
              </div>
              <div className="hidden h-[200px] mt-12 w-full lg:flex items-center justify-center">
                <BarChart />
              </div>
            </div>
            <div className="lg:w-[40%] bg-white px-4 py-8 rounded-xl">
              <div className="flex justify-between mb-12">
                <p className="font-semibold">Transaction History</p>
                <Link href={"/history"} className="font-bold text-blue-primary">
                  See all
                </Link>
              </div>
              {/* data transactions */}
              <div className="flex flex-col gap-4 xl:gap-6">
                <CardHomeHistory />
                <CardHomeHistory />
                <CardHomeHistory />
                <CardHomeHistory />
              </div>
            </div>
          </section>
        </section>
        <div></div>
      </main>
      <FooterHome />
    </>
  );
}

export default privateRoute(Home);
