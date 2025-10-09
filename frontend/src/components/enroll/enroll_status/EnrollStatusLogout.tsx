import { useNavigate } from "react-router-dom";

export function EnrollStatusLogout() {
    const navigate = useNavigate()
    
    const handleLogout = () => {
        const result = window.confirm("Bạn có chắc muốn đăng xuất không?")
        if (result) {
            navigate("/login") // chuyển hướng sang trang login
        }
    };

    return <button 
    className="absolute right-[2rem] py-[4px] px-[12px] cursor-pointer
    bg-red-500 hover:bg-red-600
    flex items-center justify-center"
    onClick={() => handleLogout()}>
        <h1 className="text-[1rem] text-yellow-50 yrsa-font">
            Đăng xuất
        </h1>
    </button>
}