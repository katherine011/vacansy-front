"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function HeaderRouter() {
  const pathname = usePathname();
  const hideHeaderRoutes = ["/auth", "/login", "/add-vacansy"];

  return !hideHeaderRoutes.includes(pathname) ? <Header /> : null;
}
