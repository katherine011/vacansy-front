import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className=" w-[100%] h-[300px] bg-white pl-[140px] pr-[140px] pt-10 flex flex-row items-start justify-start gap-40  ">
      <div className="flex items-start justify-start flex-col text-gray-400 gap-1">
        <h1 className="font-semibold text-black pb-4">ნავიგაცია</h1>
        <Link href={"/vacansy"}>ვაკანსიები</Link>
        <Link href={"/company"}>კომპანიები</Link>
      </div>
      <div className="flex items-start justify-start flex-col text-gray-400 gap-1">
        <h1 className="font-semibold text-black pb-4">დახმარება</h1>
        <p>ხშირად დასმული კითხვები</p>
        <p>022 11 11 11 11</p>
        <p>info@myjob.ge</p>
        <p>ანონიმური კითხვები</p>
      </div>
      <div className="flex items-start justify-start flex-col text-gray-400 gap-1">
        <h1 className="font-semibold text-black pb-4">დამატებითი ფაილები</h1>
        <p>წესები და პირობები</p>
        <p>კონფედენციალობის პოლიტიკა</p>
        <p>გარემოსდაცვითი პოლიტიკა</p>
      </div>
    </div>
  );
};

export default Footer;
