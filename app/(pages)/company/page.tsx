import Company from "@/app/ui/Companies/Company";
import CompanySearch from "@/app/ui/Companies/CompanySearch";
import React from "react";

const CompanyPage = () => {
  return (
    <div className="pt-[80px] w-[100%] h-fit gap-30">
      <CompanySearch />
      <div className="pl-[140px] pr-[140px] ">
        <Company />
      </div>
    </div>
  );
};

export default CompanyPage;
