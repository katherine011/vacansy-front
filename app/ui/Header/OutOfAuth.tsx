"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const OutOfAuth = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="flex flex-row items-center gap-3">
      <Link href="/login">
        <button className="w-[100px] h-[45px] rounded-[15px] border border-gray-200 hover:bg-gray-100 cursor-pointer flex items-center justify-center">
          შესვლა
        </button>
      </Link>
    </div>
  );
};

export default OutOfAuth;
