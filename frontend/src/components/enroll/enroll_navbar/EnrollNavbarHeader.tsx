import vnuLogo from "../../../assets/image/vnu-logo.svg"

export function EnrollNavBarHeader() {
    return <div 
    className="ml-[32px] gap-[10px]
    flex items-center">
        <img src={vnuLogo} alt="" 
        className="size-[12rem]"/>

        <h1 
        className="text-emerald-800 text-[2.2rem] yrsa-font">
            Cổng đăng ký học
        </h1>
    </div>
}