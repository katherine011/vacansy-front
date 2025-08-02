export const category = [
  "საბანკო სფერო",
  "IT დეველოპმენტი",
  "გაყიდვები/ვაჭრობა",
  "საოფისე",
  "მომსახურე პერსონალი",
  "მედიცინა/ფარმაცია",
];

export const subcategory = [
  "ფრონტენდ დეველოპერი",
  "ბექენდ დეველოპერი",
  "UI/UX დიზაინერი",
  "სისტემური ადმინისტრატორი",
  "QA ტესტერი",
  "მონაცემთა ანალიტიკოსი",
  "DevOps ინჟინერი",
  "ლექტორი",
  "სკოლის მასწავლებელი",
  "რეპეტიტორი",
  "ბიბლოთეკარი",
  "სტომატოლოგი",
  "ექიმი-თერაპევტი",
  "მედდა",
  "ფარმაცევტი",
  "მარკეტინგის სპეციალისტი",
  "გრაფიკული დიზაინერი",
  "კონტენტ მენეჯერი",
  "პროექტ მენეჯერი",
  "ბუღალტერი",
  "იურისტი",
  "ადმინისტრატორი",
  "რეკლამის სპეციალისტი",
  "მომსახურე პერსონალი",
  "მთარგმნელი",
  "HR მენეჯერი",
  "ტაქსის მძღოლი",
  "მეთონე",
  "დამლაგებელი",
  "სერვის მენეჯერი",
];

export const experience = [
  "დამწყები",
  "საშუალო",
  "უფროსი სპეციალისტი",
  "დამწყები სპეციალისტი",
];

export const educate = [
  "სტუდენტი",
  "ბაკალავრი",
  "მაგისტრი",
  "დოქტორი",
  "კურსდამთავრებული",
  "პროფესორი",
  "რეზიდენტი",
  "აკადემიკოსი",
  "სპეციალისტი",
  "განათლების გარეშე",
];

export const hiredType = [
  "სასწრაფო",
  "საკონტაქტო",
  "სტაჟირება",
  "სეზონური",
  "ფრილანსი",
];

export const workingType = [
  "ოფისიდან",
  "დისტანციური",
  "ჰიბრიდი",
  "თავისუფალი გრაფიკი",
];

export const shift = [
  "სრული განაკვეთი",
  "ნახევარი განაკვეთი",
  "საათობრივი",
  "ცვლები",
];

import { getCookie } from "cookies-next";

export const getRoleFromToken = () => {
  const rawToken = getCookie("token");
  const token = typeof rawToken === "string" ? rawToken : undefined;

  if (!token) return "unauthenticated";
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    );
    const decoded = JSON.parse(jsonPayload);
    return decoded.role || "unauthenticated";
  } catch (err) {
    console.error("Invalid token format:", err);
    return "unauthenticated";
  }
};
