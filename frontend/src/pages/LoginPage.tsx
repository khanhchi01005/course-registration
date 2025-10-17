import { useEffect } from "react"
import { LoginLayout } from "../components/login/LoginLayout"

export function LoginPage() {
  useEffect(() => {
    document.title = "Đăng nhập hệ thống đăng ký học - Cổng thông tin Đào tạo Đại học VNU"
  }, [])

  return (
    <div>
      <LoginLayout />
    </div>
  )
}
