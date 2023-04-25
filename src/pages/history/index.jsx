import CardHist from "@/components/CardHist";
import HeaderHome from "@/components/HeaderHome";
import Loaders from "@/components/Loaders";
import SideBar from "@/components/SideBar";
import SideBarMobile from "@/components/SideBarMobile";
import TopUp from "@/components/TopUp";
import { getHistories, getHistory } from "@/utils/https/history";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

function History() {
  const [topUp, setTopUp] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const controller = useMemo(() => new AbortController(), []);
  const token = useSelector((state) => state.auth.data.data.token);
  // const [isLoading, setLoading] = useState(true);
  const [metaPage, setMetaPage] = useState(1);
  const [sort, setSort] = useState("");
  const [metaLimit, setMetaLimit] = useState(7);
  const [totalPage, setTotalPage] = useState("");
  const [filter, setFilter] = useState("");
  const [dataHistory, setDataHistory] = useState([]);
  // const sortHandler = (e) => {
  //   setSort(e.target.value);
  // };
  const fetching = async () => {
    setLoading(true);
    router.replace({
      pathname: "/history",
      query: {
        page: metaPage,
        limit: metaLimit,
        filter,
      },
    });
    const params = { page: metaPage, limit: metaLimit, filter };
    try {
      const result = await getHistories(token, params, controller);
      // console.log(result.data);
      if (result.status && result.status === 200) {
        setDataHistory(result.data.data);
        setTotalPage(result.data.pagination.totalPage);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePagination = (info) => {
    if (info === "next") return setMetaPage(metaPage + 1);
    if (info === "prev") return setMetaPage(metaPage - 1);
  };
  useEffect(() => {
    fetching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, metaPage]);
  // console.log(`filter ${filter}`);
  // console.log(`sort: ${sort}`);
  return (
    <>
      {/* {loading && (
        <div className="fixed w-full h-full bg-[rgba(0,0,0,.5)] z-[60]">
          <Loaders />
        </div>
      )} */}
      <SideBarMobile setTopUp={setTopUp} />
      {topUp && <TopUp setTopUp={setTopUp} />}
      <HeaderHome />
      <main
        className={`bg-white-secondary h-max flex px-[8%] py-8 lg:py-8 lg:px-[5%] xl:px-[8%]`}>
        <SideBar setTopUp={setTopUp} />
        <section className="w-full min-h-screen h-full lg:w-[70%] mt-4 lg:mt-0 overflow-scroll overflow-x-hidden">
          <div className="min-h-screen bg-white-primary rounded-lg py-8 px-6">
            {loading ? (
              <div className="w-full h-full relative pt-[70%]">
                <Loaders />
              </div>
            ) : (
              <>
                <section className=" flex justify-between mb-3 ">
                  <p className=" text-lg text-dark font-bold">
                    Transactions History
                  </p>
                  <div className="relative">
                    <select
                      className="border text-lg cursor-pointer bg-greythirty  rounded-md text-dark h-10 px-5  hover:border-gray-400 focus:outline-none appearance-none"
                      name="filter"
                      id="filter"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}>
                      <option
                        className=" cursor-pointer font-medium"
                        value={""}>
                        {" "}
                        -- Select Filter --{" "}
                      </option>
                      <option
                        className=" cursor-pointer font-medium"
                        value="WEEK">
                        Week
                      </option>
                      <option
                        className=" cursor-pointer font-medium"
                        value="MONTH">
                        Month
                      </option>
                      <option
                        className=" cursor-pointer font-medium"
                        value="YEAR">
                        Year
                      </option>
                    </select>
                  </div>
                </section>
                <section className=" flex flex-col  md:pr-4">
                  {dataHistory.map((data) => (
                    <CardHist
                      key={data.id}
                      img={data.image}
                      firstName={data.firstName}
                      lastName={data.lastName}
                      fullName={data.fullName}
                      notes={data.notes}
                      type={data.type}
                      amount={data.amount}
                      times={data.createdAt}
                    />
                  ))}
                </section>
                <section className="flex gap-3 justify-center items-center mt-8">
                  <button
                    onClick={() => handlePagination("prev")}
                    disabled={metaPage === 1}
                    className={`paginasi border-2 border-solid border-blue-primary text-blue-primary before:bg-blue-primary hover:text-white-primary disabled:border-none disabled:bg-grey-thirty disabled:hover:bg-grey-thirty disabled:text-grey-secondary disabled:before:bg-grey-thirty`}>
                    Prev
                  </button>
                  <p className=" text-lg">
                    {metaPage} / {totalPage}
                  </p>
                  <button
                    onClick={() => handlePagination("next")}
                    disabled={metaPage === totalPage}
                    className={`paginasi border-2 border-solid border-blue-primary text-blue-primary before:bg-blue-primary hover:text-white-primary disabled:border-none disabled:bg-grey-thirty disabled:hover:bg-grey-thirty disabled:text-grey-secondary disabled:before:bg-grey-thirty`}>
                    Next
                  </button>
                </section>
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default History;
