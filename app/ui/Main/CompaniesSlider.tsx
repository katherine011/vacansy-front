"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { getCookie } from "cookies-next";
import Link from "next/link";

import Sun from "../../icons/sun.png";
import Location from "../../icons/location-pin.png";
import People from "../../icons/people (1).png";
import Case from "../../icons/briefcase (3).png";
import Default from "../../images/images.jpg";
import Bell from "../../icons/bell (1).png";

interface Company {
  _id: string;
  companyName: string;
  profilePhoto?: string;
  jobs: string[];
}

const CompaniesSlider = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const token = getCookie("token");

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 340;
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/auth/companies",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const sorted = response.data
          .sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 10);

        setCompanies(sorted);
      } catch (err) {
        console.error("Error fetching companies:", err);
      }
    };

    fetchCompanies();
  }, [token]);

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full flex flex-row gap-4 justify-between items-center">
        <div className="flex flex-row gap-4 items-center">
          <Image src={Sun} alt="Sun" width={40} height={40} />
          <h1 className="font-semibold font-[inter] text-xl mb-2">
            უახლესი კომპანიები
          </h1>
        </div>

        <div className="flex flex-row gap-2 cursor-pointer">
          <Link href="/company" className="no-underline hover:text-[#a155b9]">
            ყველა კომპანია
          </Link>

          <button
            onClick={() => scroll("left")}
            className="w-[30px] h-[30px] cursor-pointer rounded-full flex items-center justify-center border border-gray-400"
          >
            &lt;
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-[30px] h-[30px] cursor-pointer rounded-full flex items-center justify-center border border-gray-400"
          >
            &gt;
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex gap-4 pb-10 overflow-x-auto scroll-smooth hide-scrollbar"
      >
        {companies.map((company) => (
          <div
            key={company._id}
            className="w-[297px]  h-[320px] bg-white border border-gray-200 rounded-[22px] p-4 flex flex-col justify-between hover:shadow-xs hover:border-none transition-shadow"
          >
            <div className="p-3 w-full h-full flex flex-col justify-between pb-9">
              <div className="flex flex-col gap-4">
                <div className="flex flex-row items-start  justify-between w-[280px] pr-8 ">
                  <Image
                    src={company.profilePhoto ? company.profilePhoto : Default}
                    alt="company-logo"
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />
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
                <div>
                  <h1 className="text-2xl font-[800] hover:text-[#a155b9] cursor-pointer">
                    {company.companyName}
                  </h1>
                </div>
              </div>

              <ul className="flex flex-col gap-5 font-[inter] font-semibold mt-8">
                <li className="flex flex-row gap-3">
                  <Image src={Location} alt="location" width={25} height={25} />
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
  );
};

export default CompaniesSlider;
