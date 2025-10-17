// src/components/login/Header.tsx
import { useContext } from "react";
import { UserContext } from "./login/LoginExtra";

export function Header() {
  const { user } = useContext(UserContext);

  return (
    <header className="bg-white shadow-lg py-1 z-10">
      <div className="w-full px-4 flex items-center justify-between">
        {/* Logo + tiêu đề bên trái */}
        <div className="flex items-center">
          <img
            src="/vnu-logo.svg"
            alt="VNU Logo"
            className="h-18 w-auto mr-4"
          />
          <div className="flex flex-col">
            <h1 className="text-3xl text-green-800 yrsa-font">
              CỔNG THÔNG TIN ĐÀO TẠO ĐẠI HỌC
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
