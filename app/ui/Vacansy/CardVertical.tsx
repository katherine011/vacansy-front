// [media pointer="file-service://file-GgXFhJdmDf6KsHomghx3RT"]
// "use client";

// import Image from "next/image";
// import React, { useState, useEffect } from "react";
// import { getCookie } from "cookies-next";
// import Link from "next/link";
// import axios from "axios";
// import Default from "../../../images/images.jpg";
// import Location from "../../../icons/location (1).png";
// import LocationBlack from "../../../icons/location (2).png";
// import Clock from "../../../icons/clock.png";
// import Case from "../../../icons/briefcase (2).png";
// import Star from "../../../icons/star.png";
// import Cap from "../../../icons/graduation-cap.png";
// import Wallet from "../../../icons/wallet.png";

// interface Type {
//   title: string;
//   companyName: string;
//   location: string;
//   workType: string;
//   education: string;
//   salaryRange: string;
//   createdAt: string;
//   id: string;
// }

// const CardVertical = () => {
//   const [vacancies, setVacancies] = useState([]);
//   const token = getCookie("token");

//   useEffect(() => {
//     const fetchVacancies = async () => {
//       try {
//         const response = await axios.get("http://localhost:3001/jobs", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         // აიღე მხოლოდ საჭირო ველები
//         const filteredVacancies = response.data.map((vacancy: Type) => ({
//           title: vacancy.title,
//           companyName: vacancy.companyName,
//           location: vacancy.location,
//           workType: vacancy.workType,
//           education: vacancy.education,
//           salaryRange: vacancy.salaryRange,
//           createdAt: new Date(vacancy.createdAt).toLocaleDateString("en-GB", {
//             day: "2-digit",
//             month: "2-digit",
//             year: "numeric",
//           }),
//           id: vacancy.id, // ID-სთვის გადამისამართების
//         }));
//         setVacancies(filteredVacancies);
//       } catch (err) {
//         console.error("Error fetching vacancies:", err);
//       }
//     };

//     fetchVacancies();
//   }, [token]);

//   return (
//     <div>
//       {vacancies.map((vacancy, index) => (
//         <div
//           key={index}
//           className="w-[100%] h-[120px] border border-gray-200 hover:bg-purple-50 cursor-pointer flex flex-row items-center justify-between p-3 gap-5 "
//         >
//           <div className="flex flex-row items-start gap-5">
//             <Image
//               src={Default}
//               alt="default"
//               width={50}
//               height={50}
//               className="rounded-full"
//             />
//             <div className="w-[100%] flex flex-col items-start justify-between gap-2">
//               <h2 className="font-[inter] font-semibold text-black">
//                 {vacancy.companyName}
//               </h2>
//               <h1 className="font-[inter] font-semibold text-black">
//                 {vacancy.title}
//               </h1>
//               <div className="w-[100%] flex flex-row items-center gap-3">
//                 <div className="flex flex-row gap-2 items-center">
//                   <Image
//                     src={LocationBlack}
//                     alt="Location"
//                     width={20}
//                     height={20}
//                   />
//                   <p>{vacancy.location}</p>
//                 </div>

//                 <div className="flex flex-row gap-2 items-center">
//                   <Image src={Clock} alt="Clock" width={20} height={20} />
//                   <p>{vacancy.workType}</p>
//                 </div>

//                 <div className="flex flex-row gap-2 items-center">
//                   <Image src={Case} alt="Case" width={20} height={20} />
//                   <p>{vacancy.education}</p>
//                 </div>

//                 <div className="flex flex-row gap-2 items-center">
//                   <Image src={Star} alt="Star" width={20} height={20} />
//                   <p>{/* Rating, if available */}</p>
//                 </div>

//                 <div className="flex flex-row gap-2 items-center">
//                   <Image src={Cap} alt="Cap" width={20} height={20} />
//                   <p>{/* Education level, if separate */}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="items-end justify-between flex flex-col h-[90px] text-end">
//             <p className="font-[inter] font-medium text-gray-400">
//               {vacancy.createdAt}
//             </p>
//             <div className="flex flex-row items-center gap-2">
//               <Image src={Wallet} alt="Wallet" width={20} height={20} />
//               <h1 className="font-[inter] font-semibold text-black">
//                 {vacancy.salaryRange}{" "}
//                 <span className="font-[inter] font-medium text-gray-400">
//                   /თვეში
//                 </span>
//               </h1>
//             </div>
//             <Link href={`/vacancy/${vacancy.id}`}>
//               <button className="mt-2 bg-blue-500 text-white px-4 py-1 rounded">
//                 გადადი
//               </button>
//             </Link>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CardVertical;
