// src/components/login/LoginForm.tsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UserData } from '../../datatypes/UserDataType';
import { fetchUser, UserContext } from './LoginExtra';
import type { LoginData } from '../../datatypes/LoginDataTypes';

export function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isHuman, setIsHuman] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      alert('Vui lòng nhập tên truy cập và mật khẩu');
      return;
    }

    if (!isHuman) {
      alert('Vui lòng xác nhận bạn là người');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const loginData: LoginData = {
        studentCode: username,
        passwordHash: password
      } 
      const userData: UserData = await fetchUser(loginData);
      setUser(userData)
      console.log(userData)
      alert('Đăng nhập thành công!');
      navigate("/enroll")
    } catch (error) {
      alert('Đăng nhập thất bại!');
    } finally {
      setIsLoading(false);
    }
  };

return (
  <div className="w-full mx-auto">
    {/* Tiêu đề với box xanh lá căn trái */}
    <div className="bg-green-500 py-3 px-6">
      <h3 className="text-xl font-normal text-white text-left">
        Đăng nhập hệ thống
      </h3>
    </div>
    
    {/* Box trắng với border xám bao quanh form */}
    <div className="bg-white border border-gray-300 p-8">
      <form onSubmit={handleSubmit} className="space-y-2">
        {/* Tên truy cập */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-base">Tên truy cập</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nhập tên truy cập"
            className="w-full px-3 py-2 bg-blue-100 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-base"
          />
        </div>
        
        {/* Mật khẩu */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-base">Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••"
            className="w-full px-3 py-2 bg-blue-100 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-base"
          />
        </div>
        
        {/* Hàng chứa Quên mật khẩu và Nút đăng nhập */}
        <div className="flex justify-between items-center pt-6 mt-4 border-t border-gray-200">
          {/* Link quên mật khẩu */}
          <div>
            <a href="#" className="text-green-600 hover:text-green-800 text-sm font-medium">
              Quên mật khẩu?
            </a>
          </div>

          {/* Nút đăng nhập */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="bg-green-500 text-white py-2 px-6 font-semibold text-base hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </div>

        {/* Checkbox I am human - xuống dòng mới */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="human"
            checked={isHuman}
            onChange={(e) => setIsHuman(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="human" className="text-gray-700 text-sm">I am human</label>
        </div>
      </form>
    </div>
  </div>
);
}