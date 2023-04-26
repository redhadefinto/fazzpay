/* eslint-disable react-hooks/exhaustive-deps */
import FooterHome from "@/components/FooterHome";
import HeaderHome from "@/components/HeaderHome";
import Layout from "@/components/Layout";
import Loaders from "@/components/Loaders";
import SideBar from "@/components/SideBar";
import SideBarMobile from "@/components/SideBarMobile";
import TopUp from "@/components/TopUp";
import { profileAction } from "@/redux/slices/profile";
import { updateUserProfile } from "@/utils/https/users";
import privateRoute from "@/utils/wrapper/private.route";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function PersonalInfo() {
  const [topUp, setTopUp] = useState();
  const controller = useMemo(() => new AbortController(), []);
  const [edit, setEdit] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.data.data.token);
  const profiles = useSelector((state) => state.profile.data.data);
  const id = useSelector((state) => state.auth.data.data.id);
  const [email, setEmail] = useState(profiles.email);
  const [phone, setPhone] = useState(profiles.noTelp);
  const [updateRes, setUpdateRes] = useState();
  const [input, setInput] = useState(true);
  const [firstName, setFirstName] = useState(profiles.firstName);
  const [lastName, setLastName] = useState(profiles.lastName);
  const [loading, setLoading] = useState(false);
  const handleFirstname = (e) => {
    setInput(true);
    setFirstName(e.target.value);
  };
  const handleLastname = (e) => {
    setInput(true);
    setLastName(e.target.value);
  };
  const editHandle = (e) => {
    e.preventDefault();
    setEdit(!edit);
  };
  const handleSave = (e) => {
    e.preventDefault();
    if (!firstName || !lastName)
      return toast.error("Input must be field"), setInput(false);
    if (firstName == profiles.firstName && lastName == profiles.lastName)
      return toast.error("the data has not changed"), setInput(false);
    setLoading(true);
    updateUserProfile({ firstName, lastName }, id, token, controller)
      .then((res) => {
        setUpdateRes(res);
      })
      .catch((err) => {
        console.log(err);
        toast.err(err.response.data.msg);
      })
      .finally(() => {
        setLoading(false);
        setEdit(false);
      });
  };
  useEffect(() => {
    setLoading(true);
    dispatch(profileAction.getProfileThunk({ id, token, controller }))
      .then()
      .catch()
      .finally(() => {
        setLoading(false);
      });
  }, [updateRes]);
  return (
    <Layout title={"Personal Info"}>
      {loading && (
        <div className="fixed w-full h-full bg-[rgba(0,0,0,.5)] z-[60]">
          <Loaders />
        </div>
      )}
      <SideBarMobile setTopUp={setTopUp} />
      {topUp && <TopUp setTopUp={setTopUp} />}
      <HeaderHome />
      <main
        className={`bg-white-secondary h-max flex px-[8%] py-8 lg:py-8 lg:px-[5%] xl:px-[8%]`}>
        <SideBar setTopUp={setTopUp} />
        <section className="w-full h-full min-h-max lg:w-[70%] mt-4 lg:mt-0">
          <div className="min-h-max shadow-lg bg-white-primary rounded-lg py-8">
            <section className=" flex px-8 flex-col gap-6 mb-14">
              <div className=" text-dark font-bold text-xl">
                <h3>Personal Information</h3>
              </div>
              <div className=" text-[#7A7886] text-lg">
                <p>
                  We got your personal information from the sign <br /> up
                  proccess. If you want to make changes on <br /> your
                  information,contact our support.
                </p>
              </div>
            </section>
            <form className=" flex flex-col px-8 gap-[1.3rem]">
              <div className=" shadow-sm flex relative md:flex-row  p-4 gap-3 rounded-[1.3rem] justify-between">
                <div className=" flex flex-col gap-3 w-full">
                  <label htmlFor="firstName" className=" text-greyFont">
                    First Name
                  </label>
                  <input
                    type="text"
                    className={`utline-none text-2xl disabled:bg-white font-bold text-dark w-full ${
                      edit && "outline rounded-sm"
                    }, ${input ? "" : "outline-red-600"}`}
                    placeholder="Your First Name"
                    value={firstName}
                    onChange={handleFirstname}
                    disabled={!edit}
                  />
                </div>
                <div
                  className=" text-white rounded-md text-lg font-semibold cursor-pointer flex justify-center items-center h-[40px] w-[40px] bg-blue-600 absolute right-0 top-[-10%]"
                  onClick={editHandle}
                  // onClick={handleEdit}
                >
                  {edit ? <p>X</p> : <i className="bi bi-pencil"></i>}
                </div>
              </div>
              <div className=" shadow-sm flex w-full flex-col p-4 gap-3 rounded-[1.3rem]">
                <label htmlFor="firstName" className=" text-greyFont">
                  Last Name
                </label>
                <input
                  type="text"
                  className={`utline-none text-2xl disabled:bg-white font-bold text-dark w-full ${
                    edit && "outline rounded-sm"
                  } ${input ? "" : "outline-red-600"}`}
                  placeholder="Your Last Name"
                  value={lastName}
                  onChange={handleLastname}
                  disabled={!edit}
                />
              </div>
              <div className=" shadow-sm flex flex-col w-full p-4 gap-3 rounded-[1.3rem]">
                <label htmlFor="firstName" className=" text-greyFont">
                  Email
                </label>
                <input
                  type="text"
                  className={`outline-none text-2xl font-bold text-greyFont`}
                  placeholder="Your First Name"
                  value={email}
                />
              </div>
              <div
                className={`shadow-sm flex w-full relative md:flex-row  p-4 gap-3 rounded-[1.3rem] justify-between`}>
                <div className=" flex flex-col">
                  <label htmlFor="firstName" className=" text-greyFont">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className=" outline-none text-2xl font-bold text-dark w-full"
                    placeholder="Your First Name"
                    value={phone}
                  />
                </div>
                <div
                  className=" text-blue-600 absolute text-lg font-semibold cursor-pointer right-0"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/profile/change-phone-number");
                  }}>
                  <p>Manage</p>
                </div>
              </div>
              <div className={`mt-9 w-full justify-center items-center flex`}>
                <button
                  className={`bg-blue-600  px-4 py-2 lg:py-5 text-xl text-white font-bold rounded-lg w-[60%] justify-center items-center hover:bg-blue-400 ${
                    edit ? "block" : "hidden"
                  }`}
                  onClick={handleSave}>
                  Save Changes
                </button>
              </div>
            </form>
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

export default privateRoute(PersonalInfo);
