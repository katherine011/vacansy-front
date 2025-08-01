"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";

import SaveBlack from "../../../icons/bookmark.png";
import Wallet from "../../../icons/wallet.png";
import Bag from "../../../icons/briefcase (2).png";
import Clock from "../../../icons/clock (1).png";
import Cap from "../../../icons/graduation-cap.png";
import IDk from "../../../icons/language.png";
import { getCookie } from "cookies-next";
import { DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ModalForId from "./ModalForId";
import JobModalWrapper from "./JobModalWrapper";
import { JobSchemaType } from "@/lib/validation/job-schema";

interface VacancyType extends JobSchemaType {
  companyName: string;
  customId: string;
  id: string;
}

const MyVacansyDetails = () => {
  const { id } = useParams();
  const [vacancy, setVacancy] = useState<VacancyType | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchVacancy = async () => {
      try {
        const token = getCookie("token");
        const res = await axios.get(`http://localhost:3001/jobs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVacancy(res.data);
      } catch (error) {
        console.error("Error fetching vacancy:", error);
      }
    };

    if (id) fetchVacancy();
  }, [id]);

  return (
    <div className="w-[100%] min-h-[70vh] max-h-fit flex flex-col ">
      <div className="w-[100%] min-h-[83vh] p-8 max-h-fit rounded-t-[18px] gap-7 flex flex-col bg-white border border-gray-300 shadow-xl mt-30">
        <div className="w-[100%] flex flex-row items-center justify-between  ">
          <div className="w-[100%] flex flex-col gap-3 items-start justify-between ">
            <h1 className="font-semibold text-2xl ">{vacancy?.title}</h1>
            <div className="flex flex-row items-center gap-4 font-semibold cursor-pointer">
              <p className="hover:text-gray-500">{vacancy?.companyName}</p>
              <p>●</p>
              <p>{vacancy?.location}</p>
            </div>
          </div>
          <div className="w-[100%] flex flex-row items-center justify-end gap-3 ">
            {vacancy?.status === "approved" && (
              <Sheet open={open} onOpenChange={setOpen}>
                <DialogTitle></DialogTitle>
                <SheetTrigger asChild>
                  <button className="w-[140px] h-[40px] border border-gray-400 cursor-pointer flex items-center justify-center font-semibold rounded-[10px]">
                    განახლება
                  </button>
                </SheetTrigger>
                <SheetContent className="w-[1200px]">
                  <JobModalWrapper
                    job={vacancy!}
                    onClose={() => setOpen(false)}
                    onSuccess={() => setOpen(false)}
                  />
                </SheetContent>
              </Sheet>
            )}

            {vacancy?.status === "approved" ? (
              <button className="w-[180px] h-[40px] bg-green-700 cursor-default text-white flex items-center justify-center font-semibold rounded-[10px]">
                დადასტურებული
              </button>
            ) : (
              <button className="w-[180px] h-[40px] bg-red-700 cursor-default text-white flex items-center justify-center font-semibold rounded-[10px]">
                მოლოდინშია
              </button>
            )}
          </div>
        </div>

        <h1 className="font-semibold text-purple-700 -mt-5 ">
          ID: {vacancy?.customId}
        </h1>

        <div className="flex items-center flex-row gap-2">
          <Image
            src={Wallet}
            alt="wallet"
            width={30}
            height={30}
            className="w-[20px] h-[20px]"
          />
          <p className="font-semibold text-xl">{vacancy?.salaryRange}</p>
        </div>

        <div className="flex items-center flex-row gap-6">
          <div className="flex flex-row items-start justify-between gap-[250px]">
            <div className="flex items-start justify-between flex-col gap-6">
              <div className="flex flex-row gap-3 items-center">
                <Image
                  src={Clock}
                  alt="clock"
                  width={30}
                  height={30}
                  className="w-[20px] h-[20px]"
                />
                <p className="text-xl">{vacancy?.workType}</p>
              </div>
              <div className="flex flex-row items-center gap-3">
                <Image
                  src={Bag}
                  alt="bag"
                  width={30}
                  height={30}
                  className="w-[20px] h-[20px]"
                />
                <p className="text-xl">{vacancy?.title}</p>
              </div>
            </div>
            <div className="flex items-start justify-between flex-col gap-3">
              <div className="flex flex-row gap-3 items-center">
                <Image
                  src={Cap}
                  alt="cap"
                  width={30}
                  height={30}
                  className="w-[24px] h-[24px]"
                />
                <p className="text-xl">{vacancy?.experience}</p>
              </div>
              <div className="flex flex-row gap-3 items-center">
                <Image
                  src={IDk}
                  alt="lang"
                  width={30}
                  height={30}
                  className="w-[30px] h-[30px]"
                />
                <p className=" text-xl">ქართული</p>
              </div>
            </div>
          </div>
        </div>

        <h1 className="font-semibold text-2xl mt-6">● ვაკანსიის შესახებ</h1>
        <div className="w-[100%] min-h-[140px] max-h-fit border border-gray-300 shadow-xl rounded-[12px] bg-white p-5 flex items-start">
          <p className="font-semibold text-blue-950">{vacancy?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default MyVacansyDetails;
