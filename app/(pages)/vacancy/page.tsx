import VacansyCards from "@/app/ui/Vacansy/VacansyCards";
import VacansySearch from "@/app/ui/Vacansy/VacansySearch";
import React from "react";

const VacansyPage = () => {
  return (
    <div className="pt-[80px] w-[100%] h-fit gap-30">
      <VacansySearch />
      <VacansyCards />
    </div>
  );
};

export default VacansyPage;
