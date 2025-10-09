import { useRef } from "react"

export function EnrollTableFields({ isCourseTable }: { isCourseTable : boolean }) {
    const nameCheckBoxField = useRef(isCourseTable ? "Đăng ký" : "Hủy")

    return <div 
    className="w-full min-h-[2.5rem]
    flex justify-between">
        <Field name={"STT"} width="basis-1/12" type="other"/>
        <Field name={"Môn học"} width="basis-3/12" type="other"/>
        <Field name={"Mã môn"} width="basis-3/12" type="other"/>
        <Field name={"Số chỗ tối đa"} width="basis-2/12" type="other"/>
        <Field name={"Tổng chỗ đã đăng kí"} width="basis-2/12" type="other"/>
        <Field name={nameCheckBoxField.current} width="basis-1/12" type="right"/>
    </div>
}

function Field({ name, width, type }: { name: string, width: string, type: string }) {
    const borderType: Record<string, string> = {
        "right": "",
        "other": "border-r-[1px]",
    }

    return <div
    className={`h-full ${width}
    border-b-[1px] ${borderType[type]} border-gray-300
    flex items-center`}>
        <h1 className="text-[1rem] yrsa-font ml-[8px]">
            {name}
        </h1>
    </div>
}