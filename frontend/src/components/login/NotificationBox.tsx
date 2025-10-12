// src/components/login/NotificationBox.tsx
import React from 'react';

export function NotificationBox() {
  return (
    <div className="max-w-4xl">
      <div className="bg-yellow-200 py-2 -mx-8 -mt-8 mb-2">
        <h2 className="text-xl font-bold text-gray-800 text-left pl-8 yrsa-font">
          ĐANG ĐĂNG KÝ HỌC
        </h2>
      </div>
      
      <h3 className="text-xl font-bold text-gray-800 mb-4 yrsa-font">THÔNG BÁO</h3>
      <ul className="space-y-2 text-gray-700 text-base">
        <li className="flex items-start">
          <span className="text-blue-600 mr-2 text-base">•</span>
          <span>Hướng dẫn lấy lại mật khẩu Cổng thông tin đào tạo</span>
        </li>
        <li className="flex items-start">
          <span className="text-blue-600 mr-2 text-base">•</span>
          <span>Hướng dẫn lấy lại mật khẩu email@vnu.edu.vn</span>
        </li>
        <li className="flex items-start">
          <span className="text-blue-600 mr-2 text-base">•</span>
          <span>(Video) Hướng dẫn sử dụng Cổng thông tin đào tạo - Đăng ký học năm 2023</span>
        </li>
        <li className="flex items-start">
          <span className="text-blue-600 mr-2 text-base">•</span>
          <span>Hướng dẫn cài app sinh viên - OneVNU</span>
        </li>
      </ul>
    </div>
  );
}