// src/components/login/LoginLayout.tsx
import { Header } from '../Header';
import { NotificationBox } from './NotificationBox';
import { LoginForm } from './LoginForm';
import { Footer } from '../Footer';

export function LoginLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 flex flex-col">
      <Header />

      <div className="flex-1 flex">
        <div className="w-full bg-white overflow-hidden">
          {/* Dùng grid với tỷ lệ 60/40 */}
          <div className="grid grid-cols-1 xl:grid-cols-[66%_34%] min-h-[400px]">

            {/* Phần NotificationBox chiếm 60% */}
            <div className="bg-white p-6 flex flex-col justify-start pt-12">
              <NotificationBox />
            </div>

            {/* Phần LoginForm chiếm 40% */}
            <div className="bg-white p-6 flex flex-col justify-center pt-4">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
