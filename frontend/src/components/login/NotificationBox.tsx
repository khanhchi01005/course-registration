// src/components/login/NotificationBox.tsx
import React from 'react';

export function NotificationBox() {
  return (
    <div>
      <div className="pl-4">
        <div className="bg-yellow-200 py-2 -mx-8 -mt-8 mb-2">
          <h2 className="text-xl font-bold text-gray-800 text-left pl-2 yrsa-font">
            ĐANG ĐĂNG KÝ HỌC
          </h2>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-gray-800 mb-2 yrsa-font">THÔNG BÁO</h3>
      <ul className="space-y-1 text-base">
        <li className="flex items-start pl-8">
          <span className="mr-2 text-base scale-50 inline-block">■</span>
          <a
            href="https://docs.google.com/document/d/1WSwBkiq9msOYP-nWTp2VR2XBRU5RbwXN/edit"
            className="text-sm text-green-700 hover:text-green-700 hover:underline"
          >
            Hướng dẫn lấy lại mật khẩu Cổng thông tin đào tạo
          </a>
        </li>

        <li className="flex items-start pl-8">
          <span className="mr-2 text-base scale-50 inline-block">■</span>
          <a
            href="https://drive.google.com/file/d/1SWhvtXOEjtGP5RgcWjbVm0UT8lSN6wri/view?pli=1"
            className="text-sm text-green-700 hover:text-green-700 hover:underline"
          >
            Hướng dẫn lấy lại mật khẩu email@vnu.edu.vn
          </a>
        </li>

        <li className="flex items-start pl-8">
          <span className="mr-2 text-base scale-50 inline-block">■</span>
          <a
            href="https://www.youtube.com/watch?v=o2ErRk2WQ3w"
            className="text-sm font-bold text-green-700 hover:text-green-700 hover:underline"
          >
            (Video) Hướng dẫn sử dụng Cổng thông tin đào tạo - Đăng ký học năm 2023
          </a>
        </li>

        <li className="flex items-start pl-8">
          <span className="mr-2 text-base scale-50 inline-block">■</span>
          <a
            href="https://vnu.edu.vn/nang-cap-ung-dung-tren-thiet-bi-di-dong-danh-cho-sinh-vien--onevnu-voi-nhieu-tinh-nang-moi-post35494.html"
            className="text-sm text-green-700 hover:text-green-700 hover:underline"
          >
            Hướng dẫn cài app sinh viên - OneVNU
          </a>
        </li>
      </ul>

      <h3 className="text-lg text-gray-800 mt-2 mb-2 yrsa-font">
        Cổng thông tin dành cho sinh viên đã tốt nghiệp
      </h3>
      <ul className="space-y-1 text-base">
        <li className="flex items-start pl-8">
          <span className="mr-2 text-base scale-50 inline-block">■</span>
          <a
            href="https://svtotnghiep.vnu.edu.vn/dkmh/login.asp"
            className="text-sm text-green-700 hover:text-green-700 hover:underline"
          >
            https://svtotnghiep.vnu.edu.vn
          </a>
        </li>
      </ul>
    </div>
  );
}