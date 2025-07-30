"use client";

import React, { useState } from "react";
import Logo from "../Main/Logo";
import PersonAuth from "./PersonAuth";
import CompanyAuth from "./CompanyAuth";

const Auth = () => {
  const [activeTab, setActiveTab] = useState<"person" | "company">("person");

  return (
    <div className="w-[40%] h-[100vh] absolute right-0 flex flex-col justify-start items-start pl-20 pr-28 pt-10 mb-24 gap-3">
      <div className="w-full flex justify-center items-center ">
        <Logo />
      </div>

      <div className="w-full h-[80vh] flex flex-col items-center gap-5">
        <h1 className="font-[inter] text-4xl font-semibold">
          ანგარიშის შექმნა
        </h1>

        <div className="w-full flex justify-between items-center flex-row gap-2">
          <button
            onClick={() => setActiveTab("person")}
            className={`w-full h-[50px] cursor-pointer p-3 flex justify-center rounded-[10px] items-center border-2 border-[#a155b9] font-semibold font-[inter]
              ${
                activeTab === "person"
                  ? "bg-[#a155b9] text-white"
                  : "bg-purple-100  "
              }`}
          >
            ფიზიკური პირი
          </button>

          <button
            onClick={() => setActiveTab("company")}
            className={`w-full h-[50px] cursor-pointer p-3 flex justify-center rounded-[10px] items-center border-2 border-[#a155b9] font-semibold font-[inter]
              ${
                activeTab === "company"
                  ? "bg-[#a155b9] text-white"
                  : "bg-purple-100 "
              }`}
          >
            კომპანია
          </button>
        </div>

        {activeTab === "person" && <PersonAuth />}
        {activeTab === "company" && <CompanyAuth />}
      </div>
    </div>
  );
};

export default Auth;
