import CreateVacansy from "@/app/ui/Vacansy/CreateVacansy";
import VacansyDecor from "@/app/ui/Vacansy/VacansyDecor";
import React from "react";

const AddVacansyPage = () => {
  return (
    <div>
      <div className="w-[100%] h-[100vh] flex flex-row ">
        <VacansyDecor />
        <CreateVacansy />
      </div>
    </div>
  );
};

export default AddVacansyPage;
