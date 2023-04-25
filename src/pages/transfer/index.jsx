/* eslint-disable react-hooks/exhaustive-deps */
import HeaderHome from "@/components/HeaderHome";
import Loaders from "@/components/Loaders";
import SideBar from "@/components/SideBar";
import SideBarMobile from "@/components/SideBarMobile";
import TopUp from "@/components/TopUp";
import privateRoute from "@/utils/wrapper/private.route";
import React, { useEffect, useMemo, useRef, useState } from "react";

import Image from "next/image";
import TransferCard from "@/components/TransferCard";
import FooterHome from "@/components/FooterHome";
import { getContact } from "@/utils/https/users";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";

// import { useSearchParams } from "next/navigation";
function Transfer() {
  const router = useRouter();
  const controller = useMemo(() => new AbortController(), []);
  const [loading, setLoading] = useState(true);
  const [topUp, setTopUp] = useState();
  const params = router.query.search;
  const [search, setSearch] = useState(params || "");
  const [datas, setDatas] = useState([]);
  const [page, setPage] = useState(1);
  // const [params, setParams] = useState();
  const [paginations, setPagination] = useState();
  const token = useSelector((state) => state.auth.data.data.token);

  const handleSearch = (e) => {
    setPage(1);
    router.push(`/transfer?page=${page}&limit=10&search=${search}`);
  };
  // console.log(window.URL.name);
  // console.log(router.query.search);
  console.log(params);
  useEffect(() => {
    setLoading(true);
    router.push(`/transfer?page=${page}&limit=10&search=${params || search}`);
    getContact(page, params || "", token, controller)
      .then((res) => {
        // console.log(res.data.data);
        // console.log(res);
        setDatas(res.data.data);
        setPagination(res.data.pagination);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router.query.search, page]);
  // console.log(paginations);
  // console.log(datas);
  return (
    <Layout title={"Transfer"}>
      <SideBarMobile setTopUp={setTopUp} />
      {topUp && <TopUp setTopUp={setTopUp} />}
      <HeaderHome />
      <main
        className={`bg-white-secondary shadow-lg h-max flex px-[8%] py-8 lg:py-8 lg:px-[5%] xl:px-[8%]`}>
        <SideBar setTopUp={setTopUp} />
        <section className="w-full lg:w-[70%] mt-4 lg:mt-0">
          <div className="h-[95vh] shadow-lg bg-white-primary rounded-lg px-8 py-4 overflow-scroll overflow-x-hidden">
            <p className="font-bold">Search Receiver</p>
            <div className="bg-[#3A3D421A] mt-8 rounded-lg flex gap-4 relative min-[100px]">
              <i
                className="bi bi-search font-bold text-xl absolute top-[20%] left-6 cursor-pointer"
                onClick={handleSearch}></i>
              <input
                type="text"
                className="bg-transparent px-16 min-h-[45px] py-2 w-full focus:outline-none focus:border-b-2 hover:border-b-2 border-solid border-grey-primary"
                placeholder="Search receiver here"
                value={search || ""}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
            {loading ? (
              <div className="flex justify-center items-center mt-12 relative h-[50%]">
                <Loaders />
              </div>
            ) : (
              <div className="flex flex-col gap-6 mt-8">
                {datas.length <= 0 && (
                  <div className="mt-12 mb-12 text-center">
                    <p className="font-bold text-3xl text-red-600">
                      Contacts not found
                    </p>
                  </div>
                )}
                {datas.map((data) => {
                  return (
                    <TransferCard
                      key={data.id}
                      userId={data.id}
                      image={
                        data.image == null
                          ? `${process.env.CLOUDINARY_LINK}Fazzpay/example_qx2pf0.png`
                          : `${process.env.CLOUDINARY_LINK}${data.image}`
                      }
                      firstName={data.firstName}
                      lastName={data.lastName}
                      phone={data.noTelp || "-"}
                      // onClick={() => {
                      //   router.push(`/transfer/${data.id}`);
                      // }}
                    />
                  );
                })}
                <div className="w-full flex justify-center items-center gap-3 mt-8">
                  <button
                    className={`paginasi border-2 border-solid border-blue-primary text-blue-primary before:bg-blue-primary hover:text-white-primary ${
                      paginations.page === 1 &&
                      "text-grey-thirty border-grey-thirty before:bg-transparent hover:text-grey-thirty"
                    }`}
                    disabled={paginations.page === 1}
                    onClick={() => {
                      setPage(page - 1);
                    }}>
                    prev
                  </button>
                  <p className="font-semibold">
                    {paginations.totalPage === 0 ? "0" : paginations.page} /{" "}
                    {paginations.totalPage}
                  </p>
                  <button
                    className={`paginasi border-2 border-solid border-blue-primary text-blue-primary before:bg-blue-primary hover:text-white-primary ${
                      paginations.page === paginations.totalPage ||
                      (paginations.totalPage === 0 &&
                        "text-grey-thirty border-grey-thirty before:bg-transparent hover:text-grey-thirty")
                    }`}
                    disabled={
                      paginations.page === paginations.totalPage ||
                      paginations.totalPage === 0
                    }
                    onClick={() => {
                      // e.preventDefault();
                      setPage(page + 1);
                    }}>
                    next
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <FooterHome />
    </Layout>
  );
}

export default privateRoute(Transfer);
