import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../login/LoginExtra";
import arrowLogo from "../../../assets/image/arrow-logo.svg";

export function EnrollNavBarHeader() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        const result = window.confirm("Bạn có chắc muốn đăng xuất không?");
        if (result) {
            navigate("/login", { replace: true });
            setTimeout(() => {
                setUser({ studentCode: "", fullName: "" });
                sessionStorage.removeItem("user");
            }, 200);
        }
    };

    // 🔒 Đóng dropdown khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const isLoggedIn = !!user?.studentCode;

    return (
        <header className="bg-white shadow-lg py-1 z-10 relative">
            <div className="w-full px-2 flex items-center justify-between">
                {/* Logo + tiêu đề */}
                <div className="flex items-center">
                    <img
                        src="/vnu-logo.svg"
                        alt="VNU Logo"
                        className="h-18 w-auto ml-4 mr-4"
                    />
                    <div className="flex flex-col">
                        <h1 className="text-3xl text-green-800 yrsa-font">
                            CỔNG THÔNG TIN ĐÀO TẠO ĐẠI HỌC
                        </h1>
                    </div>
                </div>

                {/* Box chào mừng + logout dropdown */}
                {isLoggedIn && (
                    <div ref={dropdownRef} className="relative mr-4">
                        {/* ✅ Nút mở menu */}
                        <div
                            onClick={() => setOpen(!open)}
                            className="py-1 px-4 gap-2 bg-emerald-500 flex items-center 
                         shadow-md hover:bg-emerald-600 transition cursor-pointer select-none"
                        >
                            <h1 className="text-base text-white yrsa-font whitespace-nowrap">
                                Chào mừng: {user.fullName} - [
                                <strong>{user.studentCode}</strong>]
                            </h1>
                            <img
                                src={arrowLogo}
                                alt="toggle"
                                className={`size-3 ml-1 transform transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"
                                    }`}
                            />
                        </div>

                        {/* ✅ Menu dropdown */}
                        {open && (
                            <div
                                className="absolute right-0 w-30 bg-white border border-gray-200 hover:bg-gray-100 
                         shadow-lg py-2 z-20 animate-fade-in"
                            >
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left text-sm px-4 text-red-500 cursor-pointer"
                                >
                                    Đăng xuất
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}
