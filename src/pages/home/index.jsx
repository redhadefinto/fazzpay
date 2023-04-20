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
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { getHistory } from "@/utils/https/history";
function Home() {
  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
  const [topUp, setTopUp] = useState();
  const dispatch = useDispatch();
  const controller = useMemo(() => new AbortController(), []);
  const [chart, setChart] = useState([]);
  const [loading, setLoading] = useState();
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [topUpSucces, setTopUpSucces] = useState(1);
  const [histories, setHistories] = useState([]);
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
    setLoadingHistory(true);
    getHistory(token, controller)
      .then((res) => {
        // console.log(res.data.data);
        setHistories(res.data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingHistory(false));
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
  const incomeData = {
    label: "Income",
    data: chart.listIncome
      ? [
          chart.listIncome[5]?.total,
          chart.listIncome[6]?.total,
          chart.listIncome[0]?.total,
          chart.listIncome[1]?.total,
          chart.listIncome[2]?.total,
          chart.listIncome[3]?.total,
          chart.listIncome[4]?.total,
        ]
      : [],
    backgroundColor: "#1EC15F",
  };
  const expenseData = {
    label: "Expense",
    data: chart.listExpense
      ? [
          chart.listExpense[5]?.total,
          chart.listExpense[6]?.total,
          chart.listExpense[0]?.total,
          chart.listExpense[1]?.total,
          chart.listExpense[2]?.total,
          chart.listExpense[3]?.total,
          chart.listExpense[4]?.total,
        ]
      : [],
    backgroundColor: "#FF5B37",
  };
  const data = {
    labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [incomeData, expenseData],
  };
  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    legend: {
      label: {
        fontSize: 14,
        fontFamily: "Nunito Sans",
      },
    },
  };
  console.log(chart);
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
        <SideBar setTopUp={setTopUp} maxDashboard={true} />
        <section className="w-full lg:w-[70%] mt-8 lg:mt-0">
          {/* Info Card */}
          <InfoCard setTopUp={setTopUp} />
          <section className="lg:flex lg:mt-12 gap-8 mt-8 lg:h-[70vh] mb-8 xl:h-[80vh]">
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
              <div className="h-max mt-12 w-full lg:mx-2 flex lg:flex items-center justify-center">
                <Bar
                  data={data}
                  options={chartOptions}
                  className={"relative top-0"}
                  height={200}
                />
              </div>
            </div>
            <div className="lg:w-[40%] bg-white px-4 py-8 rounded-xl">
              <div className="flex justify-between mb-8 xl:mb-16">
                <p className="font-semibold">Transaction History</p>
                <Link href={"/history"} className="font-bold text-blue-primary">
                  See all
                </Link>
              </div>
              {/* data transactions */}
              <div className="flex flex-col gap-4 xl:gap-10">
                {loadingHistory ? (
                  <div className="relative h-[100%] flex justify-center items-center mt-20">
                    <Loaders />
                  </div>
                ) : (
                  histories.map((data) => {
                    // console.log(data);
                    return (
                      <CardHomeHistory
                        key={data.id}
                        fullName={data.fullName}
                        image={
                          data.image == null
                            ? `${process.env.CLOUDINARY_LINK}Fazzpay/example_qx2pf0.png`
                            : `${process.env.CLOUDINARY_LINK}${data.image}`
                        }
                        status={data.status}
                        amount={data.amount}
                        type={data.type}
                      />
                    );
                  })
                )}
              </div>
            </div>
          </section>
        </section>
      </main>
      <FooterHome />
    </>
  );
}

export default privateRoute(Home);
