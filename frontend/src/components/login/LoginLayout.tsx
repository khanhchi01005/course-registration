// src/components/login/LoginLayout.tsx
import React from 'react';
import { Header } from './Header';
import { NotificationBox } from './NotificationBox';
import { LoginForm } from './LoginForm';
import { Footer } from './Footer';

export function LoginLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 flex flex-col">
      <Header />
      
      <div className="flex-1 flex">
        <div className="w-full bg-white height-80px overflow-hidden">
          <div className="grid grid-cols-1 xl:grid-cols-3 min-h-[400px]">
            <div className="bg-white p-8 flex flex-col justify-start xl:col-span-2 pt-16"> 
              <NotificationBox />
            </div>
            
            <div className="bg-white p-8 flex flex-col justify-start xl:col-span-1 pt-8 "> 
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}