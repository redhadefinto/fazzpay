/* eslint-disable jsx-a11y/alt-text */
import Head from "next/head";
import Image from "next/image";
import phoneImg from "../assets/vector/phone.svg";
import call from "../assets/vector/call.svg";
import lock from "../assets/vector/lock.svg";
import phoeDash from "../assets/vector/png-phone.png";
import download from "../assets/vector/download.svg";
import bgTop from "../assets/background/bgtop.webp";
import bnb from "../assets/partners/airbnb.svg";
import cannon from "../assets/partners/cannon.svg";
import dell from "../assets/partners/dell.svg";
import microsoft from "../assets/partners/microsoft.svg";
import dropbox from "../assets/partners/dropbox.svg";
import hm from "../assets/partners/h&m.svg";
import pp from "../assets/vector/1.png";
import pp2 from "../assets/vector/2.svg";
import pp3 from "../assets/vector/3.png";

import React from "react";
import Link from "next/link";

function LandingPage() {
  return (
    <main className=" flex flex-col ">
      <section className=" flex px-[10%] lg:px-[8%] xl:px-[10%]   relative flex-col hero-home lg:bg-none pb-[11rem] lg:pb-[2rem] ">
        <section className=" flex w-full mt-14 justify-between">
          <div>
            <p className="text-2xl flex justify-center md:text-4xl font-bold font-NunitoSans text-white lg:text-blue-primary">
              FazzPay
            </p>
          </div>
          <div className=" flex gap-4 md:gap-8">
            <div className=" flex ">
              <Link
                href={"/login"}
                className="text-center flex items-center justify-center rounded-xl bg-blue-primary text-white text-xs md:text-lg font-bold border-2 hover:bg-blue-primary hover:border-white border-white w-20 h-10 md:w-[7.5rem] md:h-12 hover:border-[3px]">
                Login
              </Link>
            </div>
            <div className=" flex">
              <Link
                href={"/register"}
                className="text-center flex items-center justify-center rounded-xl bg-white text-blue-primary text-xs md:text-lg   font-bold border-2 hover:bg-white hover:border-primary border-white w-20 h-10 md:w-[7.5rem] md:h-12">
                Sign Up
              </Link>
            </div>
          </div>
        </section>

        <section className=" mt-[6.5rem] xl:mt-[8.8rem] flex justify-between gap-[3.6rem] xl:gap-0 ">
          <section className=" flex flex-col gap-11">
            <p className=" text-4xl  md:text-[2.75rem] lg:text-[3.3rem] xl:text-5xl leading-[3rem] md:leading-[4.2rem] xl:leading-[93px] text-white lg:text-grey-primary font-extrabold">
              Awesome App <br />
              For Saving
              <span className="text-white lg:text-blue-primary"> Time.</span>
            </p>
            <p className=" leading-8 lg:text-grey-primary text-white ">
              We bring you a mobile app for banking problems that <br />
              oftenly wasting much of your times.
            </p>
            <button className="bg-white lg:bg-blue-primary  font-extrabold w-[10.813rem] h-[3.563rem] rounded-xl text-blue-primary lg:text-white hover:bg-blue-primary border-2 border-white hover:border-white hover:border-[3px]">
              Try it Free
            </button>
          </section>
          <section className="hidden lg:flex mt-[-5.2rem] pr-4 xl:pr-7">
            <Image src={phoneImg} alt="phone" />
          </section>
          <div className="hidden w-[50%] xl:w-auto lg:flex absolute top-0 right-0 z-[-10] ">
            <Image src={bgTop} alt="bg-top" />
          </div>
        </section>
      </section>
      <section className=" flex flex-col bg-[#EFF0FC] px-[10%] lg:px-[8%] xl:px-[10%] py-20 pb-[7rem]">
        <section className=" flex flex-col text-center gap-9 pt-20 pb-3">
          <p className=" text-grey-primary text-[2.75rem] lg:text-6xl font-extrabold ">
            <span className=" text-blue-primary">About </span>the Application.
          </p>
          <p className=" text-sm md:text-lg">
            We have some great features from the application and it’s totally
            free <br /> to use by all users around the world.
          </p>
        </section>

        <section className=" mt-16 flex flex-col lg:flex-row justify-center gap-10 xl:gap-6 items-center  flex-wrap xl:justify-around ">
          <div className=" flex flex-col gap-[2.2rem] w-[20.9rem] h-[19.5rem] lg:w-[22.938rem] lg:h-[21.5rem] rounded-[1.3rem]  text-center justify-center items-centers px-8 py-11 bg-white">
            <div className=" flex flex-col gap-[2.2rem] justify-center items-center ">
              <div className=" w-[3.8rem] rounded-full h-[3.8rem] bg-[#EFF0FC] cursor-pointer flex justify-center items-center">
                <Image src={call} alt="call" />
              </div>
              <div className=" text-lg lg:text-2xl flex flex-wrap text-grey-primary font-bold">
                <p>24/7 Support</p>
              </div>
            </div>
            <div className=" text-base lg:text-lg leading-8 flex flex-wrap text-grey-primary">
              <p>
                We have 24/7 contact support so you can contact us whenever you
                want and we will respond it.
              </p>
            </div>
          </div>
          <div className=" flex flex-col gap-[2.2rem] w-[20.9rem] h-[19.5rem] lg:w-[22.938rem] lg:h-[21.5rem] rounded-[1.3rem] text-center justify-center items-center px-8 py-11 bg-white">
            <div className=" flex flex-col gap-[2.2rem] justify-center items-center ">
              <div className=" w-[3.8rem] rounded-full h-[3.8rem] bg-[#EFF0FC]  cursor-pointer flex justify-center items-center">
                <Image src={lock} alt="lock" />
              </div>
              <div className=" text-lg lg:text-2xl flex flex-wrap text-grey-primary font-bold">
                <p>Data Privacy</p>
              </div>
            </div>
            <div className=" text-base lg:text-lg leading-8 flex flex-wrap text-grey-primary">
              <p>
                We make sure your data is safe in our database and we will
                encrypt any data you submitted to us.
              </p>
            </div>
          </div>
          <div className=" flex flex-col gap-[2.2rem] w-[20.9rem] h-[19.5rem] lg:w-[22.938rem] lg:h-[21.5rem] rounded-[1.3rem] text-center justify-center items-center px-8 py-11 bg-white">
            <div className=" flex flex-col gap-[2.2rem] justify-center items-center ">
              <div className=" w-[3.8rem] rounded-full h-[3.8rem] bg-[#EFF0FC] cursor-pointer flex justify-center items-center">
                <Image src={download} alt="download" />
              </div>
              <div className=" text-lg lg:text-2xl flex flex-wrap text-grey-primary font-bold">
                <p>Easy Download</p>
              </div>
            </div>
            <div className=" text-base lg:text-lg leading-8 flex flex-wrap text-grey-primary">
              <p>
                Zwallet is 100% totally free to use it’s now available on Google
                Play Store and App Store.
              </p>
            </div>
          </div>
        </section>
      </section>
      <section className=" flex w-full px-[10%] lg:px-[8%] xl:px-[10%] gap-10 py-28 justify-center items-center text-center xl:justify-between flex-col xl:flex-row">
        <section className=" flex w-full xl:w-[40%] flex-wrap gap-10 text-center xl:text-start justify-center">
          <p className="  text-grey-primary font-extrabold text-4xl  md:text-[2.75rem] lg:text-[3.3rem] xl:text-6xl leading-[3rem] md:leading-[4.2rem] xl:leading-[93px]  ">
            100+ <span className=" text-blue-primary ">Trusted </span>Partners.
          </p>
          <p className=" text-base md:text-lg text-grey-primary leading-8 w-full">
            We have reached global level and have 100+ <br /> brand partners
            around the globe.
          </p>
        </section>
        <section className=" flex w-full xl:w-[50%] flex-wrap gap-[2rem] justify-center items-center">
          <div>
            <Image src={bnb} alt="airbnb" />
          </div>
          <div>
            <Image src={cannon} alt="cannon" />
          </div>
          <div>
            <Image src={dell} alt="dell" />
          </div>
          <div>
            <Image src={microsoft} alt="microsoft" />
          </div>
          <div>
            <Image src={dropbox} alt="dropbox" />
          </div>
          <div>
            <Image src={hm} alt="h&m" />
          </div>
        </section>
      </section>
      <section className="flex w-full px-[10%] lg:px-[8%] xl:px-[10%] bg-[#EFF0FC] py-20 gap-10 lg:justify-between">
        <section className=" hidden lg:flex lg:w-[50%] xl:w-[40%]">
          <Image src={phoeDash} alt="phonedash" />
        </section>
        <section className=" flex w-full lg:w-[50%]  xl:w-[60%] flex-col lg:gap-[1rem]  xl:gap-10 justify-center">
          <div className=" text-4xl text-center lg:text-start  md:text-[2.75rem] lg:text-[2.5rem] xl:text-6xl font-extrabold text-grey-primary leading-[3rem] md:leading-[4.2rem] xl:leading-[93px]  ">
            <p className="mb-8 lg:mb-0">
              All The <span className=" text-blue-primary">Great</span> FazzPay
              Features.
            </p>
          </div>
          <div className=" flex flex-col p-6 bg-white gap-4 rounded-3xl lg:gap-4">
            <div className=" flex items-center gap-2">
              <p className=" text-xl text-blue-primary font-bold">1. </p>
              <p className=" font-bold text-xl"> Small Fee</p>
            </div>
            <div className=" text-lg flex flex-wrap">
              <p>
                We only charge 5% of every success transaction done in FazzPay
                app.
              </p>
            </div>
          </div>
          <div className=" flex flex-col  p-[1.6rem] bg-white gap-4 rounded-3xl">
            <div className=" flex items-center gap-2">
              <p className=" text-xl text-blue-primary font-bold">2. </p>
              <p className=" font-bold text-xl"> Data Secured</p>
            </div>
            <div className=" text-lg flex flex-wrap">
              <p>
                All your data is secured properly in our system and it’s
                encrypted.
              </p>
            </div>
          </div>
          <div className=" flex flex-col  p-6 bg-white gap-4 rounded-3xl">
            <div className=" flex items-center gap-2">
              <p className=" text-xl text-blue-primary font-bold">3. </p>
              <p className=" font-bold text-xl"> User Friendly</p>
            </div>
            <div className=" text-lg flex flex-wrap">
              <p>
                FazzPay come up with modern and sleek design and not
                complicated.
              </p>
            </div>
          </div>
        </section>
      </section>
      <section className=" flex flex-col  bg-[#FAFCFF] px-[10%] lg:px-[8%] xl:px-[10%] py-20 pb-[7rem]">
        <section className=" flex flex-col text-center gap-9 pt-20 pb-3">
          <p className=" text-grey-primary text-[2.75rem] lg:text-6xl font-extrabold ">
            What Users are <span className=" text-blue-primary">Saying.</span>
          </p>
          <p className=" text-sm md:text-lg">
            We have some great features from the application and it’s totally
            free <br /> to use by all users around the world.
          </p>
        </section>

        <section className=" mt-16 flex overflow-scroll  overflow-y-hidden lg:overflow-auto gap-10 xl:gap-6 items-center  xl:justify-around py-16 ">
          <div className=" flex">
            <div className=" flex flex-col gap-[2.2rem] w-[20.9rem] h-[19.5rem] lg:w-[22.938rem] lg:h-[21.5rem] rounded-[1.3rem]  text-center justify-center items-centers px-8 py-11 bg-white  drop-shadow-lg ">
              <div className=" flex flex-col gap-[2.2rem] justify-center items-center ">
                <div className=" w-[3.8rem]  h-[3.8rem]  flex justify-center items-center">
                  <Image src={pp} alt="call" />
                </div>
                <div className=" text-lg lg:text-2xl flex flex-wrap text-grey-primary font-bold">
                  <p>Sherina Chaw</p>
                </div>
              </div>
              <div className=" text-base lg:text-lg leading-8 flex flex-wrap text-grey-primary">
                <p>
                  “I use this app since 2 years ago and this is the best app
                  that I’ve ever use in my entire life”
                </p>
              </div>
            </div>
          </div>

          <div className=" flex">
            <div className=" flex flex-col gap-[2.2rem] w-[20.9rem] h-[19.5rem] lg:w-[22.938rem] lg:h-[21.5rem] rounded-[1.3rem]  text-center justify-center items-centers px-8 py-11 bg-white  drop-shadow-lg ">
              <div className=" flex flex-col gap-[2.2rem] justify-center items-center ">
                <div className=" w-[3.8rem]  h-[3.8rem]  flex justify-center items-center">
                  <Image src={pp2} alt="call" />
                </div>
                <div className=" text-lg lg:text-2xl flex flex-wrap text-grey-primary font-bold">
                  <p>Jessica Mera</p>
                </div>
              </div>
              <div className=" text-base lg:text-lg leading-8 flex flex-wrap text-grey-primary">
                <p>
                  “I use Zwallet to manage all financial needs. It’s super easy
                  to use and it’s 100% free app”
                </p>
              </div>
            </div>
          </div>

          <div className=" flex">
            <div className=" flex flex-col gap-[2.2rem] w-[20.9rem] h-[19.5rem] lg:w-[22.938rem] lg:h-[21.5rem] rounded-[1.3rem]  text-center justify-center items-centers px-8 py-11 bg-white  drop-shadow-lg ">
              <div className=" flex flex-col gap-[2.2rem] justify-center items-center ">
                <div className=" w-[3.8rem]  h-[3.8rem]  flex justify-center items-center">
                  <Image src={pp3} alt="call" />
                </div>
                <div className=" text-lg lg:text-2xl flex flex-wrap text-grey-primary font-bold">
                  <p>Robert Chandler</p>
                </div>
              </div>
              <div className=" text-base lg:text-lg leading-8 flex flex-wrap text-grey-primary">
                <p>
                  “Since I’m using this app, I’m not going to move to another
                  similar app. Thank you Zwallet!”
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>
      <section className=" flex flex-col bg-blue-primary py-20 w-full px-[10%] lg:px-[8%] xl:px-[10%]">
        <section className=" flex flex-col  gap-8">
          <div className=" text-2xl lg:text-4xl text-white font-bold">
            <p>FazzPay</p>
          </div>
          <div>
            <p className=" text-sm lg:text-base text-[#EFEFEF]">
              Simplify financial needs and saving <br /> much time in banking
              needs with one <br /> single app.
            </p>
          </div>
          <hr />
        </section>
        <section className=" flex flex-col lg:flex-row justify-between mt-7 gap-4 lg:gap-0">
          <div className="text-sm lg:text-base text-[#EFEFEF]">
            <p>2020 FazzPay. All right reserved.</p>
          </div>
          <div className=" flex gap-4 lg:gap-10 flex-col lg:flex-row">
            <p className="text-sm lg:text-base text-[#EFEFEF]">
              +62 5637 8882 9901
            </p>
            <p className=" text-sm lg:text-base text-[#EFEFEF]">
              Contact@fazzpay.com
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}

export default LandingPage;
