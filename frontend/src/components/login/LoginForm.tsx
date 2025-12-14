import React, { useContext, useState } from 'react';
import { User, Lock, LogIn } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import type { UserData } from '../../datatypes/UserDataType';
import { fetchUser, UserContext } from './LoginExtra';
import type { LoginData } from '../../datatypes/LoginDataTypes';

export function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Vui lòng nhập tên truy cập và mật khẩu');
      return;
    }

    // ✅ Hiện hộp thoại xác nhận trước khi đăng nhập
    const confirmLogin = window.confirm(
      "Bạn có chắc chắn đăng nhập không?\n" +
      "Nếu bạn đăng nhập thành công bạn sẽ:\n" +
      "- Có 20 phút để đăng ký, nếu quá 20 phút sẽ bị tự động đăng xuất!\n" +
      "- Chỉ có thể đăng nhập lại vào 30 phút sau tính từ thời điểm này sau khi đăng xuất!"
    );

    if (!confirmLogin) return; // ❌ người dùng chọn Cancel thì dừng lại

    setIsLoading(true);

    try {
      const loginData: LoginData = {
        student_code: username,
        password: password,
      };

      const userData: UserData = await fetchUser(loginData);
      setUser(userData);
      sessionStorage.setItem("user", JSON.stringify(userData));

      // ✅ Không hiện alert thành công nữa — vào thẳng trang đăng ký
      navigate('/enroll');
    } catch (error) {
      alert('Đăng nhập thất bại!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto">
      <div className="bg-green-500 py-3 px-4">
        <h3 className="text-xl font-medium text-white text-left">Đăng nhập hệ thống</h3>
      </div>

      <div className="bg-white border border-gray-300 p-3">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm block text-gray-700 font-bold mb-2">
              Tên truy cập
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Tên truy cập"
                className="text-sm w-full px-3 py-2 pr-10 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <User
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
            </div>
          </div>

          <div>
            <label className="text-sm block text-gray-700 font-bold mb-2">
              Mật khẩu
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mật khẩu"
                className="text-sm w-full px-3 py-2 pr-10 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <Lock
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
            </div>
          </div>

          <div className="pt-2">
            {/* ✅ reCAPTCHA */}
            <div className="flex justify-start">
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <a href="https://docs.google.com/document/d/1is8_WhrY22D8w2K_gqkIwk6qAb2pPFKX/edit?tab=t.0" className="text-green-600 hover:text-green-600 text-sm font-semibold pl-3 hover:underline">
              Quên mật khẩu?
            </a>

            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center gap-1 bg-green-500 text-white py-2 px-3 font-semibold hover:bg-green-700 disabled:opacity-50 text-sm font-medium cursor-pointer mr-3 transition-colors"
            >
              {isLoading ? (
                'Đang đăng nhập...'
              ) : (
                <>
                  <LogIn size={16} className="text-white" />
                  <span>Đăng nhập</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
