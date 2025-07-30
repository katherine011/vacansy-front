import React from "react";
import Header from "../Header/Header";
import VacanciesSlider from "./VacanciesSlider";

const Main = () => {
  return (
    <div className="w-[100%] flex-col gap-50  pl-[140px] pr-[140px] pt-30 ">
      <VacanciesSlider />
    </div>
  );
};

export default Main;
