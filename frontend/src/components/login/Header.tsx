// src/components/login/Header.tsx
import React from 'react';

export function Header() {
  return (
    <header className="bg-white shadow-lg py-4 z-10">
      <div className="w-full px-4 flex items-center">
        {/* Logo VNU */}
        <img 
          src="/vnu-logo.svg" // Sử dụng đường dẫn từ public
          alt="VNU Logo" 
          className="h-18 w-auto mr-4"
        />
        
        {/* Tiêu đề */}
        <div className="flex flex-col">
          <h1 className="text-3xl text-green-800 yrsa-font">CỔNG THÔNG TIN ĐÀO TẠO ĐẠI HỌC</h1>
        </div>
      </div>
    </header>
  );
}