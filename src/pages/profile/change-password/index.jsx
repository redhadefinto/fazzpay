import FooterHome from "@/components/FooterHome";
import HeaderHome from "@/components/HeaderHome";
import Layout from "@/components/Layout";
import Loaders from "@/components/Loaders";
import SideBar from "@/components/SideBar";
import SideBarMobile from "@/components/SideBarMobile";
import TopUp from "@/components/TopUp";
import { changePassword, updatePassword } from "@/utils/https/auth";
import privateRoute from "@/utils/wrapper/private.route";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function ChangePassword() {
  const [topUp, setTopUp] = useState();
  const router = useRouter();
  const controller = useMemo(() => new AbortController(), []);
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const [input, setInput] = useState(true);
  const token = useSelector((state) => state.auth.data.data.token);
  const [loading, setLoading] = useState(false);
  const id = useSelector((state) => state.auth.data.data.id);
  const inputFileRef = React.createRef();
  const [iconEye1, setIconEye1] = useState(false);
  const toggleIcon1 = () => {
    iconEye1 ? setIconEye1(false) : setIconEye1(true);
  };
  const [iconEye2, setIconEye2] = useState(false);
  const toggleIcon2 = () => {
    iconEye2 ? setIconEye2(false) : setIconEye2(true);
  };
  const [iconEye3, setIconEye3] = useState(false);
  const toggleIcon3 = () => {
    iconEye3 ? setIconEye3(false) : setIconEye3(true);
  };
  // const inputImage = () => {
  //   inputFileRef.current.click();
  // };

  const toInfo = () => {
    router.push("/profile/detail");
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  const toChangePwd = () => {
    router.push("/profile/edit-password");
  };

  const toChangePin = () => {
    router.push("/profile/edit-pin");
  };
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const onChangeForm = (e) => {
    setForm((form) => {
      setInput(true);
      return {
        ...form,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    updatePassword(
      {
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      },
      id,
      token,
      controller
    )
      .then((res) => {
        setEdit(false);
        setInput(true);
        toast.success(res.data.msg);
        setTimeout(() => {
          return router.replace("/profile");
        }, 4000);
      })
      .catch((err) => {
        console.log(err);
        setInput(false);
        toast.error(err.response.data.msg);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  console.log(form);
  return (
    <Layout title={"Change Password"}>
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
                <h3>Change Password</h3>
              </div>
              <div className=" text-[#7A7886] text-base md:text-lg">
                <p>
                  You must enter your current password and <br /> then type your
                  new password twice.
                </p>
              </div>
            </section>
            <div className=" flex flex-col px-8 gap-[1.3rem] w-full items-center">
              <form
                className=" mt-[3rem] xl:mt-[4rem] gap-[1rem] flex flex-col w-full md:w-[60%] justify-center "
                onSubmit={handleSave}>
                <div className="mb-6 flex gap-2 relative ">
                  <i
                    className={`bi bi-lock-fill absolute text-[#A9A9A999] text-2xl top-[10%] ${
                      input ? "text-blue-primary" : "text-red-600"
                    }`}></i>
                  <input
                    name="oldPassword"
                    id="oldPassword"
                    onChange={onChangeForm}
                    type={`${iconEye1 ? "text" : "password"}`}
                    className={`w-full border-b-2 border-solid border-grey-secondary  p-2 pl-10 focus:outline-none lg:w-[90%] ${
                      input ? "border-blue-600" : "border-red-600"
                    }`}
                    placeholder="Current password"
                  />
                  <i
                    className={`right-2 text-[#A9A9A9] absolute text-2xl cursor-pointer top-[10%] lg:right-14 xl:right-16  ${
                      iconEye1 ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"
                    }`}
                    onClick={toggleIcon1}></i>
                </div>
                <div className="mb-6 flex gap-2 relative ">
                  <i
                    className={`bi bi-lock-fill text-[#A9A9A999]  absolute text-2xl top-[10%] ${
                      input ? "text-blue-primary" : "text-red-600"
                    }`}></i>
                  <input
                    name="newPassword"
                    id="newPassword"
                    onChange={onChangeForm}
                    type={`${iconEye2 ? "text" : "password"}`}
                    className={`w-full border-b-2 border-solid border-grey-secondary  p-2 pl-10 focus:outline-none lg:w-[90%] ${
                      input ? "border-blue-600" : "border-red-600"
                    }`}
                    placeholder="New password"
                  />
                  <i
                    className={`right-2 text-[#A9A9A9] absolute text-2xl cursor-pointer top-[10%] lg:right-14 xl:right-16  ${
                      iconEye2 ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"
                    }`}
                    onClick={toggleIcon2}></i>
                </div>
                <div className="mb-6 flex gap-2 relative ">
                  <i
                    className={`bi bi-lock-fill text-[#A9A9A999] absolute text-2xl top-[10%] ${
                      input ? "text-blue-primary" : "text-red-600"
                    }`}></i>
                  <input
                    name="confirmPassword"
                    id="confirmPassword"
                    onChange={onChangeForm}
                    type={`${iconEye3 ? "text" : "password"}`}
                    className={`w-full border-b-2 border-solid border-grey-secondary p-2 pl-10 focus:outline-none lg:w-[90%] ${
                      input ? "border-blue-600" : "border-red-600"
                    }`}
                    placeholder="Confirm new password"
                  />
                  <i
                    className={`right-2 text-[#A9A9A9] absolute text-2xl cursor-pointer top-[10%] lg:right-14 xl:right-16  ${
                      iconEye3 ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"
                    }`}
                    onClick={toggleIcon3}></i>
                </div>
                <div className="lg:w-[90%] mt-6 lg:mt-2 ">
                  <button
                    type="submit"
                    // onSubmit={handleSave}
                    disabled={
                      form.newPassword == "" ||
                      form.confirmPassword == "" ||
                      form.oldPassword == ""
                    }
                    className="px-2 py-4 disabled:bg-grey-thirty disabled:text-[#88888F] disabled:cursor-not-allowed w-full font-bold  rounded-lg mb-6 bg-blue-600 text-white hover:bg-blue-400">
                    Confirm
                  </button>
                </div>
              </form>
            </div>
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

export default privateRoute(ChangePassword);
