import Image from "next/image";
import React from "react";

type Props = {
  src: any;
  alt: string;
  title: string;
  vacansy: string;
  width: number;
  height: number;
};

const CategoryCard = ({ src, alt, title, vacansy, width, height }: Props) => {
  return (
    <div className="w-[194px] h-[150px] hover:border-none cursor-pointer flex flex-col items-start  justify-start gap-2 p-4 rounded-[12px] border border-gray-200 shadow-3xs bg-white ">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-[30px] h-[30px] "
      />
      <div className="w-[100%] gap-2 flex flex-col items-center "></div>
      <p className="font-semibold">{title}</p>
      <p className="font-semibold">{vacansy}</p>
    </div>
  );
};

export default CategoryCard;
