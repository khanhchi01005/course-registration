// src/components/login/Footer.tsx

export function Footer() {
  return (
    <footer className="bg-white py-6 w-full border-t border-gray-200">
        <div className="grid grid-cols-6 gap-6 items-center">
          {/* Grid 1: Đang online và 20 - chiếm 1/6 */}
          <div className="col-span-1 flex flex-col items-end">
            <span className="text-base text-gray-400 mb-1">Đang online</span>
            <span className="text-base text-red-500 font-bold">20</span>
          </div>

          {/* Grid 2: Copyright và thông tin - chiếm 3/6 */}
          <div className="col-span-3">
            <p className="text-gray-400">
              © 2008-2025 <span className="text-black">Trung tâm Quản trị Đại học số - VNU</span>
            </p>
            <p className="text-gray-400 text-xs mt-1">
              This page was rendered at 10/12/2025 2:39:40 AM by WEBDANGKYHOC
            </p>
          </div>

          {/* Grid 3 & 4: Không chiếm cố định, đẩy sát phải */}
          <div className="col-span-2 flex justify-end space-x-6 pr-16">
            <a href="#" className="text-black hover:text-green-300 transition-colors">
              Trang chủ VNU
            </a>
            <a href="#" className="text-black hover:text-green-300 transition-colors">
              Trang chủ DUAC
            </a>
          </div>
      </div>
    </footer>
  );
}