"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { getCookie } from "cookies-next";
import Link from "next/link";
import axios from "axios";

import Default from "../../../images/images.jpg";
import Location from "../../../icons/location (2).png";
import Clock from "../../../icons/clock.png";
import Cap from "../../../icons/graduation-cap.png";
import Wallet from "../../../icons/wallet.png";

interface Type {
  title: string;
  companyName: string;
  salaryRange: string;
  createdAt: string;
  _id: string;
  location?: string;
  workType?: string;
  experience?: string;
  status: string;
}

const MyVacansy = () => {
  const [vacancies, setVacancies] = useState<Type[]>([]);
  const [filteredVacancies, setFilteredVacancies] = useState<Type[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const token = getCookie("token");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const response = await axios.get("http://localhost:3001/jobs/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const formatted = response.data.map((vacancy: any) => ({
          title: vacancy.title,
          companyName: vacancy.userId?.name || "უცნობი კომპანია",
          salaryRange: vacancy.salaryRange,
          createdAt: new Date(vacancy.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          _id: vacancy._id,
          location: vacancy.location || "Tbilisi",
          workType: vacancy.workType || "Full-time",
          experience: vacancy.experience || "Not specified",
          status: vacancy.status || "pending",
        }));

        setVacancies(formatted);
        setFilteredVacancies(formatted);
      } catch (err) {
        console.error("Error fetching vacancies:", err);
      }
    };

    if (token) fetchVacancies();
  }, [token]);

  // გარეთ დაჭერით მოდალის დახურვა
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpenModal(false);
      }
    };

    if (openModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModal]);

  const filterByStatus = (status: "approved" | "pending") => {
    const filtered =
      status === "approved"
        ? vacancies.filter((v) => v.status === "approved")
        : vacancies.filter((v) => v.status !== "approved");

    setFilteredVacancies(filtered);
    setOpenModal(false);
  };

  const clearFilter = () => {
    setFilteredVacancies(vacancies);
    setOpenModal(false);
  };

  return (
    <div className="w-full bg-white rounded-t-[12px] pb-2 border border-gray-200">
      <div className="w-full relative flex items-center justify-between p-3">
        <button
          onClick={() => setOpenModal(!openModal)}
          className="w-[100px] h-[35px] cursor-pointer flex items-center justify-center font-semibold rounded-[12px] border-gray-200 border"
        >
          ფილტრი
        </button>

        <button
          onClick={clearFilter}
          className="font-semibold cursor-pointer text-purple-900"
        >
          ფილტრის გასუფთავება
        </button>

        {openModal && (
          <div
            ref={modalRef}
            className="w-[190px] bg-white left-2 top-14 absolute h-[100px] rounded-[14px] border border-gray-200 shadow-md p-2 flex flex-col z-50"
          >
            <button
              onClick={() => filterByStatus("approved")}
              className="flex items-center justify-center w-full cursor-pointer h-[40px] font-semibold hover:bg-gray-200 rounded-[12px]"
            >
              დადასტურებული
            </button>
            <div className="w-full h-[1px] bg-gray-300 my-1"></div>
            <button
              onClick={() => filterByStatus("pending")}
              className="flex items-center justify-center w-full cursor-pointer h-[40px] font-semibold hover:bg-gray-200 rounded-[12px]"
            >
              მოლოდინის რეჟიმში
            </button>
          </div>
        )}
      </div>

      <div className="w-full min-h-[70vh] flex flex-col bg-white">
        {filteredVacancies.length > 0 ? (
          filteredVacancies.map((vacancy, index) => (
            <Link href={`/my-vacansy/${vacancy._id}`} key={index}>
              <div className="w-full p-3 pl-7 border border-gray-200 flex justify-between cursor-pointer hover:bg-purple-50">
                <div className="w-full flex flex-row gap-4 items-start justify-between">
                  <Image
                    src={Default}
                    alt="default"
                    width={50}
                    height={50}
                    className="w-[50px] h-[50px] rounded-full"
                  />
                  <div className="w-full font-semibold flex flex-col">
                    <h1 className="font-[inter] font-semibold text-black">
                      {vacancy.companyName}
                    </h1>
                    <h1 className="text-xl font-[inter] font-semibold text-black">
                      {vacancy.title}
                    </h1>
                    <div className="w-full gap-16 font-semibold flex flex-row mt-2">
                      <div className="flex flex-row items-center gap-1">
                        <Image
                          src={Location}
                          alt="location"
                          width={20}
                          height={20}
                        />
                        <p className="font-[inter] font-semibold text-black">
                          {vacancy.location}
                        </p>
                      </div>
                      <div className="flex flex-row items-center gap-2">
                        <Image
                          src={Clock}
                          alt="work type"
                          width={20}
                          height={20}
                        />
                        <p className="font-[inter] font-semibold text-black">
                          {vacancy.workType}
                        </p>
                      </div>
                      <div className="flex flex-row items-center gap-2">
                        <Image
                          src={Cap}
                          alt="experience"
                          width={20}
                          height={20}
                        />
                        <p className="font-[inter] font-semibold text-black">
                          {vacancy.experience}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-end gap-8 font-semibold pr-3 text-end w-full">
                    <p className="font-[inter] font-medium text-gray-400">
                      {vacancy.createdAt}
                    </p>
                    {vacancy.status === "approved" ? (
                      <button className="w-[170px] h-[40px] bg-green-700 cursor-pointer text-white flex items-center justify-center font-semibold rounded-[10px]">
                        დადასტურებული
                      </button>
                    ) : (
                      <button className="w-[150px] h-[40px] bg-red-700 cursor-pointer text-white flex items-center justify-center font-semibold rounded-[10px]">
                        მოლოდინშია
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center p-5 font-[inter] font-medium text-gray-400">
            ვერ მოიძებნა ვაკანსიები
          </div>
        )}
      </div>
    </div>
  );
};

export default MyVacansy;
