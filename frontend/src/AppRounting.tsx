import { Navigate, Route, Routes } from "react-router-dom";
import { EnrollPage } from "./pages/EnrollPage";
import { LoginPage } from "./pages/LoginPage";
import { UserProvider } from "./components/login/LoginExtra";
import { ProtectedRoute } from "./components/login/ProtectRoutes";

export function AppRouting() {

  return (
    <UserProvider>
      <Routes>
        <Route index element={<Navigate to="/login" replace />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="enroll" element={<ProtectedRoute element={<EnrollPage />} />} />
      </Routes>
    </UserProvider>
  );
}