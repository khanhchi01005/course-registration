import { EnrollLayout } from "../components/enroll/EnrollLayout";
import { useEffect } from "react";

// chứa các Component(button, input,...) của trang đăng ký môn
export function EnrollPage() {
    useEffect(() => {
        document.title = "Trang chủ đăng ký học - Cổng thông tin Đào tạo Đại học VNU"
      }, [])

    return <div>
        <EnrollLayout/>
    </div>
}