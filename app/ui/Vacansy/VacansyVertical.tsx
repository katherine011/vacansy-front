"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getCookie } from "cookies-next";
import Link from "next/link";
import axios from "axios";
import Default from "../../images/images.jpg";
import Location from "../../icons/location (2).png";
import Clock from "../../icons/clock.png";
import Cap from "../../icons/graduation-cap.png";
import Wallet from "../../icons/wallet.png";

interface Type {
  title: string;
  companyName: string;
  salaryRange: string;
  createdAt: string;
  _id: string;
  location?: string; // Optional fields based on the original component
  workType?: string;
  experience?: string;
}

const VacansyVertical = () => {
  const [vacancies, setVacancies] = useState<Type[]>([]);
  const token = getCookie("token");

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const response = await axios.get("http://localhost:3001/jobs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const filteredVacancies = response.data.map((vacancy: any) => ({
          title: vacancy.title,
          companyName: vacancy.companyName,
          salaryRange: vacancy.salaryRange,
          createdAt: new Date(vacancy.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          _id: vacancy._id,
          location: vacancy.location || "Tbilisi", // Default or API-provided
          workType: vacancy.workType || "Full-time", // Default or API-provided
          experience: vacancy.experience || "Not specified", // Default or API-provided
        }));
        setVacancies(filteredVacancies);
      } catch (err) {
        console.error("Error fetching vacancies:", err);
      }
    };

    fetchVacancies();
  }, [token]);

  return (
    <div className="w-[100%] min-h-[70vh] max-h-fit flex flex-col bg-white border border-gray-100">
      {vacancies.length > 0 ? (
        vacancies.map((vacancy, index) => (
          <Link href={`/vacancy/${vacancy._id}`} key={index}>
            <div className="w-[100%] p-3 pl-7 border border-gray-100 flex flex-row justify-between cursor-pointer hover:bg-purple-50">
              <div className="w-[100%] flex flex-row gap-4 items-start justify-between">
                <Image
                  src={Default}
                  alt="default"
                  width={50}
                  height={50}
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="w-[100%] font-semibold flex flex-col">
                  <h1 className="font-[inter] font-semibold text-black">
                    {vacancy.companyName}
                  </h1>
                  <h1 className="text-xl font-[inter] font-semibold text-black">
                    {vacancy.title}
                  </h1>
                  <div className="w-[100%] gap-16 font-semibold flex flex-row mt-2 ">
                    <div className="flex flex-row items-center gap-1 ">
                      <Image
                        src={Location}
                        alt="location"
                        width={20}
                        height={20}
                        className="w-[20px] h-[20px]"
                      />
                      <p className="font-[inter] font-semibold  text-black">
                        {vacancy.location}
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <Image
                        src={Clock}
                        alt="work type"
                        width={20}
                        height={20}
                        className="w-[20px] h-[20px]"
                      />
                      <p className="font-[inter] font-semibold  text-black">
                        {vacancy.workType}
                      </p>
                    </div>
                    <div className="w-[100%] flex flex-row items-center gap-2">
                      <Image
                        src={Cap}
                        alt="experience"
                        width={20}
                        height={20}
                        className="w-[20px] h-[20px]"
                      />
                      <p className="font-[inter] font-semibold  text-black">
                        {vacancy.experience}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-end gap-10 font-semibold pr-3 text-end w-[100%]">
                  <p className="font-[inter] font-medium text-gray-400">
                    {vacancy.createdAt}
                  </p>
                  <div className="flex flex-row items-center gap-2">
                    <Image
                      src={Wallet}
                      alt="wallet"
                      width={20}
                      height={20}
                      className="w-[20px] h-[20px]"
                    />
                    <p className="font-[inter] font-semibold text-black">
                      {vacancy.salaryRange}{" "}
                      <span className="font-[inter] font-medium text-gray-400">
                        /თვეში
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="text-center p-5 font-[inter] font-medium text-gray-400">
          No vacancies found
        </div>
      )}
    </div>
  );
};

export default VacansyVertical;
