import { Navigate, Route, Routes } from "react-router-dom";
import { EnrollPage } from "./pages/EnrollPage";
import { LoginPage } from "./pages/LoginPage";

// muốn chuyển hường mà chưa có điều kiện active thì viết trực tiếp endpoint:
// http://localhost:3000/login | http://localhost:3000/enroll
export function AppRouting() {
  return (
    <Routes>
      <Route index element={<Navigate to="/login" replace />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="enroll" element={<EnrollPage />} />
    </Routes>
  );
}