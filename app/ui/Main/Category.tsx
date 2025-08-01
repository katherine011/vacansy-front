"use client";

import React from "react";
import CategoryCard from "./CategoryCard";
import { useRouter } from "next/navigation";

import Piggy from "../../icons/piggy-bank.png";
import People from "../../icons/people.png";
import Code from "../../icons/code.png";
import Boosted from "../../icons/analyitics.png";
import File from "../../icons/folder.png";
import Medicine from "../../icons/first-aid-kit.png";

const Category = () => {
  const router = useRouter();

  const handleClick = (category: string) => {
    const encoded = encodeURIComponent(category);
    router.push(`/vacancy?category=${encoded}`);
  };

  return (
    <div className="w-[100%] gap-4 flex flex-row items-center">
      <div onClick={() => handleClick("საბანკო სფერო")}>
        <CategoryCard
          src={Piggy}
          alt=""
          title="საბანკო სფერო"
          vacansy="88 ვაკანსია"
          width={60}
          height={60}
        />
      </div>
      <div onClick={() => handleClick("IT დეველოპმენტი")}>
        <CategoryCard
          src={Code}
          alt=""
          title="IT დეველოპმენტი"
          vacansy="88 ვაკანსია"
          width={60}
          height={60}
        />
      </div>
      <div onClick={() => handleClick("გაყიდვები/ვაჭრობა")}>
        <CategoryCard
          src={Boosted}
          alt=""
          title="გაყიდვები/ვაჭრო..."
          vacansy="88 ვაკანსია"
          width={60}
          height={60}
        />
      </div>
      <div onClick={() => handleClick("მედიცინა/ფარმაცევტი")}>
        <CategoryCard
          src={File}
          alt=""
          title="მედიცინა/ფარმაც..."
          vacansy="88 ვაკანსია"
          width={60}
          height={60}
        />
      </div>
      <div onClick={() => handleClick("მომსახურე პერსონალი")}>
        <CategoryCard
          src={People}
          alt=""
          title="მომსახურე პერსო..."
          vacansy="88 ვაკანსია"
          width={60}
          height={60}
        />
      </div>
      <div onClick={() => handleClick("საოფისე")}>
        <CategoryCard
          src={Medicine}
          alt="s"
          title="საოფისე"
          vacansy="88 ვაკანსია"
          width={60}
          height={60}
        />
      </div>
    </div>
  );
};

export default Category;
