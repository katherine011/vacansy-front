import Auth from "@/app/ui/Auth/Auth";
import AuthDecor from "@/app/ui/Auth/AuthDecor";
import React from "react";

const AuthPage = () => {
  return (
    <div className="w-[100%] h-[100vh] flex flex-row ">
      <AuthDecor />
      <Auth />
    </div>
  );
};

export default AuthPage;
