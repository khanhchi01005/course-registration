import { useContext, useRef, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./LoginExtra";

export const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
    const { user } = useContext(UserContext);
    const active = useRef<boolean>(false)

    if (!user || !user.studentCode) {
        if (!active.current) 
            window.alert("Yêu cầu đăng nhập trước khi đăng ký!")
        active.current = true
        return <Navigate to="/login" replace />;
    }

    return element;
};