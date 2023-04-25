import HeaderHome from "@/components/HeaderHome";
import Layout from "@/components/Layout";
import Loaders from "@/components/Loaders";
import SideBar from "@/components/SideBar";
import SideBarMobile from "@/components/SideBarMobile";
import TopUp from "@/components/TopUp";
import { profileAction } from "@/redux/slices/profile";
import { changePassword, updatePassword } from "@/utils/https/auth";
import { updateUserProfile } from "@/utils/https/users";
import privateRoute from "@/utils/wrapper/private.route";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function ChangePhoneNumber() {
  const [topUp, setTopUp] = useState();
  const router = useRouter();
  const profileUser = useSelector((state) => state.profile.data.data);
  const dispatch = useDispatch();
  const controller = useMemo(() => new AbortController(), []);
  const [input, setInput] = useState(true);
  const token = useSelector((state) => state.auth.data.data.token);
  const [loading, setLoading] = useState(false);
  const id = useSelector((state) => state.auth.data.data.id);
  const [form, setForm] = useState({
    phoneNumber: "",
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
    updateUserProfile({ noTelp: form.phoneNumber }, id, token, controller)
      .then((res) => {
        setInput(true);
        toast.success(res.data.msg);
        setLoading(true);
        dispatch(profileAction.getProfileThunk({ id, token, controller }))
          .then()
          .catch()
          .finally(() => {
            setLoading(false);
          });
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
  // console.log(profileUser);
  return (
    <Layout title={"Change Phone"}>
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
          <div className="min-h-screen shadow-lg bg-white-primary rounded-lg py-8 lg:py-12">
            <section className=" flex px-8 flex-col gap-6 mb-14">
              <div className=" text-dark font-bold text-xl">
                <h3>Edit Phone Number</h3>
              </div>
              <div className=" text-grey-secondary text-lg">
                <p>
                  Add at least one phone number for the transfer <br /> ID so
                  you can start transfering your money to <br /> another user.
                </p>
              </div>
            </section>
            <div className="flex flex-col px-8 gap-[1.3rem] w-full items-center mt-32">
              <form
                className=" flex flex-col lg:px-8 w-full gap-[1.3rem] justify-center items-center mt-12"
                onSubmit={handleSave}>
                <div className="mb-8 flex gap-2 relative w-full md:w-[60%] pl-4 text-greyFont">
                  <i
                    className={`bi bi-telephone-plus text-2xl absolute top-[10%] `}></i>

                  <input
                    type="text"
                    name="phoneNumber"
                    id="phone"
                    value={form.phoneNumber}
                    onChange={onChangeForm}
                    placeholder="Enter your phone number"
                    className={`w-full border-b-2 border-solid  p-2 pl-10 focus:outline-none lg:w-[90%] text-xl `}
                  />
                </div>
                <div className=" flex mt-9 w-full justify-center items-center ">
                  <button className=" bg-blue-primary p-5 text-xl text-white font-bold rounded-lg w-[60%] justify-center items-center">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
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

export default privateRoute(ChangePhoneNumber);
