import { useState } from "react"

export function EnrollStatusOnline() {
    const [totalOnline, _] = useState<number>(210)

    return <div 
    className="absolute left-[2rem]
    flex flex-col">
        <h1
        className="text-[rgba(160,160,160,1)]">
            Đang online
        </h1>
        
        <div className="flex flex-row-reverse">
            <h1 className="text-red-600 font-[650]">
                {totalOnline.toString()}
            </h1>
        </div>
    </div>
}