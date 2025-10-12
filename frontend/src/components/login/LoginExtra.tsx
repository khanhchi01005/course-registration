import { createContext } from "react";
import type { UserData } from "../../datatypes/UserDataType";
import { userApi } from "../../services/userApi";
import type { LoginData } from "../../datatypes/LoginDataTypes";
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

export async function fetchUser(loginData: LoginData): Promise<UserData> {
    try {
        const res = await userApi.login(loginData)
        const newUser: UserData = humps.camelizeKeys(res.data) as UserData

        return newUser
    } catch(error) {
        const newUser: UserData = {
            fullName: "Nguyễn Văn A",
            studentCode: "23020678"
        }
        return newUser
    }
}

