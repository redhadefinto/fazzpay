/* eslint-disable react-hooks/exhaustive-deps */
import HeaderHome from "@/components/HeaderHome";
import SideBar from "@/components/SideBar";
import SideBarMobile from "@/components/SideBarMobile";
import TopUp from "@/components/TopUp";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import profile from "../../assets/profile/profile.png";
import { useRouter } from "next/router";
import FooterHome from "@/components/FooterHome";
import { ToastContainer, toast } from "react-toastify";
import { updateImage } from "@/utils/https/users";
import { profileAction } from "@/redux/slices/profile";
import Loaders from "@/components/Loaders";
import { logOut } from "@/utils/https/auth";
import { authAction } from "@/redux/slices/auth";
import privateRoute from "@/utils/wrapper/private.route";
function Profile() {
  const [topUp, setTopUp] = useState();
  const controller = useMemo(() => new AbortController(), []);
  const dispatch = useDispatch();
  const router = useRouter();
  const [profileUpdate, setProfileUpdate] = useState("");
  const [imageToDB, setImageToDB] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateRes, setUpdateRes] = useState();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const inputFileRef = React.createRef();
  const profileUser = useSelector((state) => state.profile.data.data);
  const id = useSelector((state) => state.auth.data.data.id);
  const token = useSelector((state) => state.auth.data.data.token);
  // console.log(token);
  const inputImage = () => {
    setIsUpdate(true);
    inputFileRef.current.click();
  };
  const toInfo = () => {
    router.push("/profile/personalinfo");
  };
  const toChangePwd = () => {
    router.push("/profile/change-password");
  };
  const editImageHandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setProfileUpdate(imageUrl);
      setImageToDB(e.target.files[0]);
    }
  };
  const updateHandle = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (imageToDB == "") {
      return toast.error("please input your image");
    }
    if (imageToDB) formData.append("image", imageToDB);
    setLoading(true);
    updateImage(formData, id, token, controller)
      .then((res) => {
        // dispatch(profileAction.getProfileThunk({ id, token, controller }));
        setProfileUpdate("");
        toast.success(res.msg);
        setIsUpdate(false);
        setUpdateRes(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const logoutHandle = (e) => {
    e.preventDefault();
    setLoading(true);
    logOut(token, controller)
      .then((res) => {
        toast.success(res.data.msg);
        dispatch(authAction.filter());
        dispatch(profileAction.filter());
        setTimeout(() => {
          router.slice("/login");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(setLoading(false));
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
  const toChangePin = () => {
    router.push("/profile/change-pin");
  };
  console.log(profileUpdate);
  return (
    <>
      {loading && (
        <div className="fixed w-full h-full bg-[rgba(0,0,0,.5)] z-[60]">
          <Loaders />
        </div>
      )}
      {modal && (
        <>
          <div className="fixed top-0 right-0 w-full h-screen flex items-center justify-center bg-[rgba(0,0,0,.5)] z-20">
            <div className="w-[350px] h-[300px] bg-white-primary px-4 py-6 rounded-lg relative">
              <button
                className="absolute w-[30px] h-[30px] rounded-full bg-red-600 hover:bg-red-400 flex justify-center items-center font-semibold text-white-primary right-0 mr-4
              "
                onClick={(e) => {
                  e.preventDefault();
                  setModal(false);
                }}>
                X
              </button>
              <p className="font-bold mb-4">confirmation</p>
              <p className="text-grey-secondary opacity-90">
                are you sure you want to log out?
              </p>
              <div className="w-full justify-center flex px-4 mt-32">
                <button
                  className="paginasi border-2 border-solid border-blue-primary text-blue-primary before:bg-blue-primary hover:text-white-primary"
                  onClick={logoutHandle}>
                  Continue
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <SideBarMobile setTopUp={setTopUp} />
      {topUp && <TopUp setTopUp={setTopUp} />}
      <HeaderHome />
      <main
        className={`bg-white-secondary h-max flex px-[8%] py-8 lg:py-8 lg:px-[5%] xl:px-[8%]`}>
        <SideBar setTopUp={setTopUp} />
        <section className="w-full min-h-max h-full lg:w-[70%] mt-4 lg:mt-0">
          <div className="min-h-max bg-white-primary rounded-lg py-8">
            <div className=" flex flex-col justify-center items-center gap-3">
              <div className=" w-20 h-20 rounded-md overflow-hidden">
                {profileUpdate && (
                  <Image
                    src={profileUpdate}
                    width={60}
                    height={60}
                    alt="pp"
                    className=" w-full h-full object-cover"
                  />
                )}
                <Image
                  src={
                    profileUser.image == null
                      ? `${process.env.CLOUDINARY_LINK}Fazzpay/example_qx2pf0.png`
                      : `${process.env.CLOUDINARY_LINK}${profileUser.image}`
                  }
                  width={60}
                  height={60}
                  alt="pp"
                  className=" w-full h-full object-cover"
                />
              </div>
              <input
                type="file"
                name="image"
                hidden={true}
                ref={inputFileRef}
                onChange={editImageHandler}
              />
              <div className=" text-base text-[#7A7886] flex gap-1 justify-center items-center cursor-pointer">
                {isUpdate ? (
                  <div className="flex gap-8">
                    <button
                      className="paginasi text-center border-2 border-solid border-red-600 text-red-600 before:bg-red-600 hover:text-white-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsUpdate(false);
                        setProfileUpdate("");
                      }}>
                      Cancel
                    </button>
                    <button
                      className="paginasi text-center border-2 border-solid border-blue-primary text-blue-primary before:bg-blue-primary hover:text-white-primary"
                      onClick={updateHandle}>
                      Save Profile
                    </button>
                  </div>
                ) : (
                  <div
                    className="text-base text-[#7A7886] flex gap-1 justify-center items-center cursor-pointer"
                    onClick={inputImage}>
                    <i className=" text-sm bi bi-pencil"></i>
                    <p>Edit</p>
                  </div>
                )}
              </div>
              <div className=" text-dark font-bold text-2xl">
                <p>
                  {profileUser.firstName} {profileUser.lastName}
                </p>
              </div>
              <div className=" text-lg text-greyFont">
                <p>
                  {profileUser.noTelp === null
                    ? "'Please Manage phone number'"
                    : profileUser.noTelp}
                </p>
              </div>
              <section className=" flex flex-col w-full justify-center items-center mt-4 gap-5">
                <div
                  className={`flex bg-[#E5E8ED] w-[80%] md:w-[50%] px-5 py-5 font-bold justify-between rounded-xl cursor-pointer hover:bg-blue-600 hover:text-white hover:delay-200`}
                  onClick={toInfo}>
                  <p className=" text-lg text-dark leading-7">
                    Personal Information
                  </p>
                  <div className=" text-2xl">
                    <i className=" font-bold text-2xl text-greyFont bi bi-arrow-right"></i>
                  </div>
                </div>
                <div
                  className=" flex bg-[#E5E8ED] w-[80%] md:w-[50%] px-5 py-5 font-bold justify-between rounded-xl cursor-pointer hover:bg-blue-600 hover:text-white hover:delay-200"
                  onClick={toChangePin}>
                  <p className=" text-lg text-dark leading-7">Change Pin</p>
                  <div className=" text-2xl">
                    <i className=" font-bold text-2xl text-greyFont bi bi-arrow-right"></i>
                  </div>
                </div>
                <div
                  className=" flex bg-[#E5E8ED] w-[80%] md:w-[50%] px-5 py-5 font-bold justify-between rounded-xl cursor-pointer hover:bg-blue-600 hover:text-white hover:delay-200"
                  onClick={toChangePwd}>
                  <p className=" text-lg text-dark leading-7">
                    Change Password
                  </p>
                  <div className=" text-2xl">
                    <i className=" font-bold text-2xl text-greyFont bi bi-arrow-right"></i>
                  </div>
                </div>
                <button
                  className=" flex bg-[#E5E8ED] w-[80%] md:w-[50%] px-5 py-5 font-bold justify-between rounded-xl cursor-pointer hover:bg-blue-600 hover:text-white hover:delay-200"
                  onClick={(e) => {
                    e.preventDefault();
                    setModal(true);
                  }}>
                  <p className=" text-lg text-dark leading-7">Logout</p>
                </button>
              </section>
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
    </>
  );
}

export default privateRoute(Profile);
