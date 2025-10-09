import { useState } from "react"
import arrowLogo from "../../../assets/image/arrow-logo.svg"

export function EnrollNavBarInfo() {
    const [username] = useState<string>("Nguyễn Văn A")
    const [usercode] = useState<string>("23020679")

    return <div 
    className="py-[4px] px-[20px] mr-[32px] gap-[10px]
    bg-emerald-400 
    flex items-center">
        <h1 
        className="text-[1rem] text-white yrsa-font">
            Chào mừng: {username} - {usercode}
        </h1>

        <img src={arrowLogo} alt="" 
        className="size-[0.75rem]"/>
    </div>
}