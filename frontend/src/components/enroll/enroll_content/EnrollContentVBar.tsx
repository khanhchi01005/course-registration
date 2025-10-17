import listLogo from "../../../assets/image/list-logo.svg"

export function EnrollContentVBar() {
    return <nav
        className="min-w-[250px] h-full
    border-r-[1px] border-gray-300
    bg-[rgba(240,240,240,1)]
    hidden lg:flex flex-col ">
        <div
            className="w-full h-[48px] gap-[5px]
        border-b-[1px] border-gray-300
        bg-[rgba(250,250,250,1)]
        flex items-center">
            <img src={listLogo} alt=""
                className="size-[1.2rem] ml-2" />

            <h1
                className="text-[1rem] text-[rgba(80,80,80,1)] yrsa-font ml-2">
                Đăng ký môn học
            </h1>
        </div>
    </nav>
}