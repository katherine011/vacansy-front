"use client";

import Image from "next/image";
import React, { useState } from "react";
import Square from "../../icons/two-columns.png";
import Squares from "../../icons/four-squares-button-of-view-options.png";
import Menu from "../../icons/menu (1).png";
import VacansyVertical from "./VacansyVertical";
import VacansyHorisontal from "./VacansyHorisontal";

const VacansyCards = () => {
  const [activeView, setActiveView] = useState<"vertical" | "horizontal">(
    "vertical"
  );

  return (
    <div className="w-full items-center border border-gray-100 justify-center pl-[140px] pr-[140px]">
      <div className="w-full max-h-fit rounded-t-[22px] border border-gray-100  flex flex-col bg-white mt-10">
        <div className="w-full flex flex-row justify-between items-center p-3">
          <div className="w-[80px] rounded-full bg-purple-200 flex flex-row">
            <button
              onClick={() => setActiveView("vertical")}
              className={`w-[40px] h-[40px] rounded-full flex items-center cursor-pointer justify-center
              ${activeView === "vertical" ? "bg-[#a155b9]" : "bg-purple-200"}`}
            >
              <Image src={Square} alt="vertical" width={20} height={20} />
            </button>

            <button
              onClick={() => setActiveView("horizontal")}
              className={`w-[40px] h-[40px] rounded-full flex items-center cursor-pointer justify-center
              ${
                activeView === "horizontal" ? "bg-[#a155b9]" : "bg-purple-200"
              }`}
            >
              <Image src={Squares} alt="horizontal" width={18} height={18} />
            </button>
          </div>

          <div className="flex flex-row gap-3 items-center">
            <p>თარიღი კლებადი</p>
            <Image
              src={Menu}
              alt="menu"
              width={25}
              height={25}
              className="cursor-pointer"
            />
          </div>
        </div>

        {activeView === "vertical" && <VacansyVertical />}
        {activeView === "horizontal" && <VacansyHorisontal />}
      </div>
    </div>
  );
};

export default VacansyCards;
