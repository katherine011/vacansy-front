"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Square from "../../icons/two-columns.png";
import Squares from "../../icons/four-squares-button-of-view-options.png";
import Menu from "../../icons/menu (1).png";
import VacansyVertical from "./VacansyVertical";
import VacansyHorisontal from "./VacansyHorisontal";
import Bag from "../../icons/briefcase (1).png";
import Ways from "../../icons/three-way (2).png";
import Location from "../../icons/location (1).png";
import Search from "../../icons/search.png";
import Filter from "../../icons/filter.png";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Vacansy = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeView, setActiveView] = useState<"vertical" | "horizontal">(
    "vertical"
  );
  const [openModal, setOpenModal] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    location: "",
    jobCategory: "",
    workType: "",
    language: "",
    experience: "",
  });

  useEffect(() => {
    const params = {
      search: searchParams.get("search") || "",
      location: searchParams.get("location") || "",
      jobCategory: searchParams.get("jobCategory") || "",
      workType: searchParams.get("workType") || "",
      language: searchParams.get("language") || "",
      experience: searchParams.get("experience") || "",
    };
    console.log("Filters state:", filters);
    setFilters(params);
  }, [searchParams]);

  const updateURLWithFilters = (updatedFilters: typeof filters) => {
    const query = new URLSearchParams();
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value) query.set(key, value);
    });

    router.push(`/vacancy?${query.toString()}`);
  };

  const handleSearch = () => {
    updateURLWithFilters(filters);
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      location: "",
      jobCategory: "",
      workType: "",
      language: "",
      experience: "",
    });

    const url = new URL(window.location.href);
    url.search = ""; // remove all query params
    router.push(url.pathname); // redirect to clean path only
  };

  return (
    <div className="pt-[80px] w-[100%] h-fit gap-30">
      <div className="flex flex-col">
        <div className="w-[100%] p-7 bg-white flex items-center justify-center pl-[140px] pr-[180px] gap-2">
          <div className="w-[100%] h-[60px] border pl-10 pr-10 border-gray-200 shadow-2xs p-4 rounded-[12px] flex flex-row items-center gap-3 ">
            <div className="w-[100%] relative flex flex-row items-center justify-between gap-2">
              <Image
                src={Bag}
                alt="bag"
                width={40}
                height={40}
                className="w-[22px] h-[22px]"
              />
              <input
                type="text"
                placeholder="ვაკანსიის ძებნა"
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
                className="border-none outline-none w-[100%]"
              />
              <div className="w-[1px] h-[30px] bg-gray-300 absolute right-7"></div>
            </div>
            <div className="w-[100%] relative flex flex-row items-center gap-2">
              <Image
                src={Ways}
                alt="bag"
                width={40}
                height={40}
                className="w-[30px] h-[30px]"
              />
              <input
                type="text"
                placeholder="სამუშაო ტიპები"
                value={filters.workType}
                onChange={(e) =>
                  setFilters({ ...filters, workType: e.target.value })
                }
                className="border-none outline-none w-[100%]"
              />
              <div className="w-[0.9px] h-[30px] bg-gray-300 absolute right-7"></div>
            </div>
            <div className="w-[100%] flex flex-row items-center gap-2">
              <Image
                src={Location}
                alt="bag"
                width={40}
                height={40}
                className="w-[25px] h-[25px]"
              />
              <input
                type="text"
                placeholder="მდებარეობა"
                value={filters.location}
                onChange={(e) =>
                  setFilters({ ...filters, location: e.target.value })
                }
                className="border-none outline-none w-[100%]"
              />
            </div>
            <div className="w-[2%] items-end">
              <button
                className="rounded-full w-[45px] h-[45px] flex items-center justify-center cursor-pointer bg-[#a155b9]"
                onClick={handleSearch}
              >
                <Image
                  src={Search}
                  alt="bag"
                  width={40}
                  height={40}
                  className="w-[25px] h-[25px]"
                />
              </button>
            </div>
          </div>
          <button
            onClick={() => setOpenModal(!openModal)}
            className="w-[200px] h-[45px] flex-row rounded-[12px] border-black border hover:bg-gray-100 text- cursor-pointer flex items-center justify-center font-semibold text-"
          >
            <Image
              src={Filter}
              alt="bag"
              width={40}
              height={40}
              className="w-[28px] h-[22px] pr-2"
            />
            ფილტრები
          </button>
        </div>

        {openModal && (
          <div className="w-[100%] bg-white pl-[140px] pr-[140px] pb-10 gap-4 flex flex-row">
            <div>
              <Select
                value={filters.jobCategory}
                onValueChange={(value) =>
                  setFilters({ ...filters, jobCategory: value })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="კატეგორიები" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>კატეგორიები</SelectLabel>
                    <SelectItem value="საბანკო სფერო">საბანკო სფერო</SelectItem>
                    <SelectItem value="IT დეველოპმენტი">
                      IT დეველოპმენტი
                    </SelectItem>
                    <SelectItem value="გაყიდვები/ვაჭრობა">
                      გაყიდვები/ვაჭრობა
                    </SelectItem>
                    <SelectItem value="საოფისე">საოფისე</SelectItem>
                    <SelectItem value="მომსახურე პერსონალი">
                      მომსახურე პერსონალი
                    </SelectItem>
                    <SelectItem value="მედიცინა/ფარმაცევტი">
                      მედიცინა/ფარმაცევტი
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select
                value={filters.language}
                onValueChange={(value) =>
                  setFilters({ ...filters, language: value })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="ენები" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>ენები</SelectLabel>
                    <SelectItem value="ქართული">ქართული</SelectItem>
                    <SelectItem value="ინგლისური">ინგლისური</SelectItem>
                    <SelectItem value="რუსული">რუსული</SelectItem>
                    <SelectItem value="ესპანური">ესპანური</SelectItem>
                    <SelectItem value="იტალიური">იტალიური</SelectItem>
                    <SelectItem value="თურქული">თურქული</SelectItem>
                    <SelectItem value="გერმანული">გერმანული</SelectItem>
                    <SelectItem value="ფრანგული">ფრანგული</SelectItem>
                    <SelectItem value="კორეული">კორეული</SelectItem>
                    <SelectItem value="ჩინური">ჩინური</SelectItem>
                    <SelectItem value="იაპონური">იაპონური</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select
                value={filters.experience}
                onValueChange={(value) =>
                  setFilters({ ...filters, experience: value })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="გამოცდილება" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>გამოცდილება</SelectLabel>
                    <SelectItem value="0-2 წლამდე">0-2 წლამდე</SelectItem>
                    <SelectItem value="2-5 წლამდე">2-5 წლამდე</SelectItem>
                    <SelectItem value="5+ წელი">5+ წელი</SelectItem>
                    <SelectItem value="გამოუცდელი">გამოუცდელი</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <button
              type="submit"
              className="font-semibold w-[250px] h-[38px] cursor-pointer rounded-[10px] hover:bg-gray-100 flex items-center justify-center text-red-700"
              onClick={clearFilters}
            >
              ფილტრების გასუფთავება
            </button>
          </div>
        )}
      </div>

      <div className="w-full items-center border border-gray-100 justify-center pl-[140px] pr-[140px]">
        <div className="w-full max-h-fit rounded-t-[22px] border border-gray-100 flex flex-col bg-white mt-10">
          <div className="w-full flex flex-row justify-between items-center p-3">
            <div className="w-[80px] rounded-full bg-purple-100 flex flex-row">
              <button
                onClick={() => setActiveView("vertical")}
                className={`w-[40px] h-[40px] rounded-full flex items-center cursor-pointer justify-center ${
                  activeView === "vertical" ? "bg-[#c886dc]" : "bg-purple-100"
                }`}
              >
                <Image src={Square} alt="vertical" width={20} height={20} />
              </button>
              <button
                onClick={() => setActiveView("horizontal")}
                className={`w-[40px] h-[40px] rounded-full flex items-center cursor-pointer justify-center ${
                  activeView === "horizontal" ? "bg-[#c886dc]" : "bg-purple-100"
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

          {activeView === "vertical" && <VacansyVertical filters={filters} />}
          {activeView === "horizontal" && (
            <VacansyHorisontal filters={filters} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Vacansy;
