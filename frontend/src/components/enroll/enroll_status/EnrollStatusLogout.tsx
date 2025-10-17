import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../login/LoginExtra"

export function EnrollStatusLogout() {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

    const handleLogout = () => {
    const result = window.confirm("Bạn có chắc muốn đăng xuất không?")
    if (result) {
        // 🔁 Điều hướng về login trước
        navigate("/login", { replace: true })

        // ⏳ Sau 200ms mới xóa user
        setTimeout(() => {
        setUser({ studentCode: "", fullName: "" })
        sessionStorage.removeItem("user")
        }, 200)
    }
    }

  return (
    <button
      className="absolute right-[2rem] py-[4px] px-[12px] cursor-pointer
                 bg-red-500 hover:bg-red-600
                 flex items-center justify-center"
      onClick={handleLogout}
    >
      <h1 className="text-[1rem] text-yellow-50 yrsa-font">Đăng xuất</h1>
    </button>
  )
}
