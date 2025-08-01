import React from "react";
import Header from "../Header/Header";
import VacanciesSlider from "./VacanciesSlider";
import NewOpportunity from "./NewOpportunity";
import Category from "./Category";
import MainSearch from "./MainSearch";
import MainDecor from "./MainDecor";
import CompaniesSlider from "./CompaniesSlider";
import Footer from "./Footer";

const Main = () => {
  return (
    <div className="w-[100%] flex flex-col gap-20  pt-30  ">
      <div className="w-[100%] flex flex-col gap-20  pl-[140px] pr-[140px] ">
        <MainSearch />
        <NewOpportunity />
        <Category />
        <VacanciesSlider />
        <MainDecor />
        <CompaniesSlider />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
