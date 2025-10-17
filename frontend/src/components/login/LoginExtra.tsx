import { createContext } from "react";
import type { UserData } from "../../datatypes/UserDataType";
import { userApi } from "../../services/userApi";
import type { LoginData } from "../../datatypes/LoginDataTypes";
import { useState } from "react";
import humps from "humps";

export const UserContext = createContext<{
    user: UserData
    setUser: React.Dispatch<React.SetStateAction<UserData>>
}>
({
    user: {
        studentCode: "",
        fullName: ""
    },
    setUser: () => {}
})

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // 1️⃣ Lấy dữ liệu từ sessionStorage (nếu có)
  const [user, setUser] = useState<UserData>(() => {
    const saved = sessionStorage.getItem("user")
    return saved ? JSON.parse(saved) : { studentCode: "", fullName: "" }
  })

  // 2️⃣ Gói lại hàm setUser để tự lưu vào sessionStorage mỗi khi đổi user
  const handleSetUser: React.Dispatch<React.SetStateAction<UserData>> = (value) => {
    setUser((prev) => {
      const newValue = typeof value === "function" ? value(prev) : value
      if (newValue.studentCode) {
        sessionStorage.setItem("user", JSON.stringify(newValue))
      } else {
        sessionStorage.removeItem("user")
      }
      return newValue
    })
  }

  return (
    <UserContext.Provider value={{ user, setUser: handleSetUser }}>
      {children}
    </UserContext.Provider>
  )
}

export async function fetchUser(loginData: LoginData): Promise<UserData> {
  const payload = humps.decamelizeKeys(loginData);

  const res = await userApi.login(payload);

  if (res.data.status === "success") {
    const newUser: UserData = humps.camelizeKeys(res.data.data.user) as UserData;
    console.log(newUser)
    return newUser;
  } else {
    throw new Error(res.data.message || "Đăng nhập thất bại");
  }
}