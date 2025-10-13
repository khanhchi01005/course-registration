import { useContext } from "react"
import arrowLogo from "../../../assets/image/arrow-logo.svg"
import { UserContext } from "../../login/LoginExtra"

export function EnrollNavBarInfo() {
    const { user } = useContext(UserContext)

    return <div 
    className="py-[4px] px-[20px] mr-[32px] gap-[10px]
    bg-emerald-400 
    flex items-center">
        <h1 
        className="text-[1rem] text-white yrsa-font">
            Chào mừng: {user.fullName} - {user.studentCode}
        </h1>

        <img src={arrowLogo} alt="" 
        className="size-[0.75rem]"/>
    </div>
}