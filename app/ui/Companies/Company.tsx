"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getCookie } from "cookies-next";
import axios from "axios";
import Filtered from "../../icons/filter.png";
import Location from "../../icons/location-pin.png";
import People from "../../icons/people (1).png";
import Case from "../../icons/briefcase (3).png";
import Default from "../../images/images.jpg";
import Bell from "../../icons/bell (1).png";
import Sun from "../../icons/sun (1).png";
import Search from "../../icons/magnifying-glass.png";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ka";

dayjs.extend(relativeTime);
dayjs.locale("ka");

interface Type {
  _id: string;
  companyName: string;
  profilePhoto?: string;
  jobs: string[];
  description: string;
  personalId?: string;
  createdAt: string;
}

const Company = () => {
  const [vacancies, setVacancies] = useState<Type[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const token = getCookie("token");

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/auth/companies",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const filteredVacancies = response.data.map((vacancy: any) => ({
          description: vacancy.description,
          companyName: vacancy.companyName,
          personalId: vacancy.personalId,
          createdAt: vacancy.createdAt,
          _id: vacancy._id,
          profilePhoto: vacancy.profilePhoto,
          jobs: vacancy.jobs || [],
        }));

        setVacancies(filteredVacancies);
      } catch (err) {
        console.error("Error fetching vacancies:", err);
      }
    };

    fetchVacancies();
  }, [token]);

  const filteredCompanies = vacancies.filter((company) =>
    company.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="pt-[80px] w-[100%] h-fit gap-30">
      <div className="w-[100%] p-7 bg-white flex items-center justify-center pl-[140px] pr-[140px]">
        <div className="w-[100%] h-[60px] border-2 border-gray-700 p-4 rounded-[12px] flex flex-row items-center gap-3">
          <Image
            src={Search}
            alt="search"
            width={20}
            height={20}
            className="w-[20px] h-[20px]"
          />
          <input
            type="text"
            placeholder="კომპანიის დასახელება"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-none outline-none w-[100%]"
          />
        </div>
      </div>

      <div className="pl-[140px] pr-[140px]">
        <div className="w-[100%] rounded-t-2xl min-h-[70vh] max-h-fit flex flex-col mt-10 bg-white border border-gray-200">
          <div className="flex flex-row  relative items-center m-5 pl-5 pr-5 justify-between">
            <div className="flex flex-row items-center gap-2">
              <Image
                src={Sun}
                alt="default"
                width={30}
                height={30}
                className="w-[30px] h-[30px]"
              />
              <p className="font-semibold">ვაკანსიები</p>
            </div>
            <button onClick={() => setOpenModal(!openModal)}>
              <Image
                src={Filtered}
                alt="default"
                width={20}
                height={20}
                className="w-[20px] h-[20px] rounded-[2px]"
              />
            </button>
            {openModal && (
              <div className="w-[150px] bg-white right-0 top-8 absolute h-[100px] rounded-[14px] border border-gray-200 shadow-md p-2 flex flex-col ">
                <button
                  onClick={() => {
                    setSortOrder("newest");
                    setOpenModal(false);
                  }}
                  className="flex items-center justify-center w-[100%] cursor-pointer h-[40px] font-semibold hover:bg-gray-200 rounded-[12px] "
                >
                  უახლესი
                </button>
                <button
                  onClick={() => {
                    setSortOrder("newest");
                    setOpenModal(false);
                  }}
                  className="flex items-center justify-center w-[100%] cursor-pointer h-[40px] font-semibold hover:bg-gray-200 rounded-[12px] "
                >
                  უძველესი
                </button>
              </div>
            )}
          </div>

          <div className="w-[100%] h-fit p-[30px] flex flex-wrap gap-[20px] border-gray-200 border">
            {sortedCompanies.map((company) => (
              <div
                key={company._id}
                className="w-[570px] cursor-pointer h-[190px] bg-white border hover:bg-purple-50 border-gray-300 rounded-[22px] p-4 flex flex-col justify-between hover:shadow-xs hover:border-[#a155b9] hover:border-1 transition-shadow"
              >
                <div className="p-3 h-full flex flex-col justify-between">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-row items-start gap-4 justify-start">
                      <Image
                        src={company.profilePhoto || Default}
                        alt="company-logo"
                        width={60}
                        height={60}
                        className="rounded-full object-cover"
                      />
                      <div className="flex w-[100%] items-start justify-start flex-col gap-3">
                        <div className="w-[100%] flex items-center justify-between">
                          <h1 className="text-2xl font-[800] hover:text-[#a155b9] cursor-pointer">
                            {company.companyName}
                          </h1>
                          <div className="rounded-full w-[37px] h-[37px] flex items-center justify-center bg-gray-100 hover:bg-gray-200">
                            <Image
                              src={Bell}
                              alt="bell"
                              width={20}
                              height={20}
                              className="w-[20px] h-[20px]"
                            />
                          </div>
                        </div>
                        <p>{company.description}</p>
                      </div>
                    </div>
                  </div>

                  <ul className="flex flex-row gap-5 font-[inter] font-semibold mt-8">
                    <li className="flex flex-row gap-3">
                      <Image
                        src={Location}
                        alt="location"
                        width={25}
                        height={25}
                      />
                      <p>თბილისი</p>
                    </li>
                    <li className="flex flex-row gap-3">
                      <Image src={People} alt="people" width={25} height={25} />
                      <p>დასაქმებული</p>
                    </li>
                    <li className="flex flex-row items-center gap-3">
                      <Image src={Case} alt="case" width={23} height={23} />
                      <p>{company.jobs?.length || 0} ვაკანსია</p>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Company;
