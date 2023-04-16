import React from "react";

function FooterHome() {
  return (
    <>
      <footer className="bg-blue-primary flex flex-col text-white-primary lg:px-[5%] xl:px-[8%] py-6 lg:flex-row">
        <div className="lg:w-[50%] pl-[8%] mb-4 lg:mb-0 lg:pl-0">
          <p>2020 FazzPay. All right reserved.</p>
        </div>
        <div className="lg:w-[50%] flex flex-col gap-4 justify-end pl-[8%] lg:gap-8 lg:pl-0 lg:flex-row">
          <p>+62 5637 8882 9901</p>
          <p>contact@fazzpay.com</p>
        </div>
      </footer>
    </>
  );
}

export default FooterHome;
