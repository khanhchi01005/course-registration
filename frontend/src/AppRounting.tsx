import { Navigate, Route, Routes } from "react-router-dom";
import { EnrollPage } from "./pages/EnrollPage";
import { LoginPage } from "./pages/LoginPage";
import { UserContext, UserProvider } from "./components/login/LoginExtra";
import { useState } from "react";
import { ProtectedRoute } from "./components/login/ProtectRoutes";

// muốn chuyển hường mà chưa có điều kiện active thì viết trực tiếp endpoint:
// http://localhost:3000/login | http://localhost:3000/enroll
export function AppRouting() {
  const [user, setUser] = useState({
    studentCode: "",
    fullName: "",
  });
  
  return (
    <UserProvider>
      <Routes>
        <Route index element={<Navigate to="/login" replace />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="enroll" element={<ProtectedRoute element={<EnrollPage/>}/>} />
      </Routes>
    </UserProvider>
  );
}