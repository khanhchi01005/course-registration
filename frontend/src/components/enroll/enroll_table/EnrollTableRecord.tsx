import { useContext, useEffect, useState } from "react"
import type { RecordAttribute, RecordData } from "../../../datatypes/EnrollDataType"
import { CoursesContext } from "../EnrollLayout"

export function EnrollTableRecords({courseData, index, recordKey}: RecordData & {index: number, recordKey: string}) {

    return <div className="w-full min-h-[2.5rem]
    flex justify-between">
        <Record name={index.toString()} width="basis-1/12" 
        pos="other" isCheckBox={false} keyCode={recordKey}/>
        <Record name={courseData.courseName} width="basis-3/12" 
        pos="other" isCheckBox={false} keyCode={recordKey}/>
        <Record name={courseData.courseCode} width="basis-3/12" 
        pos="other" isCheckBox={false} keyCode={recordKey}/>
        <Record name={courseData.maxSlot.toString()} width="basis-2/12" 
        pos="other" isCheckBox={false} keyCode={recordKey}/>
        <Record name={courseData.currentSlot.toString()} width="basis-2/12" 
        pos="other" isCheckBox={false} keyCode={recordKey}/>
        <Record name={"Đăng kí"} width="basis-1/12" 
        pos="right" isCheckBox={true} keyCode={recordKey}/>
    </div>
}

function Record({ name, width, pos, isCheckBox, keyCode }: RecordAttribute) {
    const { records, setRecords } = useContext(CoursesContext);
    const [ openCheckBox, setOpenCheckBox ] = useState<boolean>()
    const record: RecordData = records[keyCode];

    const borderType: Record<string, string> = {
        "right": "",
        "other": "border-r-[1px]",
    }

    const changeStatusRecord = () => {
        setRecords(prev => ({
            ...prev,
            [keyCode]: {
                ...prev[keyCode], 
                isSelect: !prev[keyCode].isSelect
            }
        }));
    }

    useEffect (() => {
        setOpenCheckBox(!(record.courseData.currentSlot >= record.courseData.maxSlot))
    }, [])

    const textData = (
        <h1 className="text-[0.9rem] yrsa-font ml-[8px]">
            {name}
        </h1>
    )

    const checkBoxData = (openCheckBox &&
        <input 
        type="checkbox" 
        checked={record.isSelect} 
        onChange={() => (changeStatusRecord())} 
        className="size-[0.8rem] ml-[1rem]
        accent-blue-500 cursor-pointer"/>
    )

    return <div
    className={`h-full ${width}
    border-b-[1px] ${borderType[pos]} border-gray-300
    flex items-center`}>
        {isCheckBox ? checkBoxData: textData}
    </div>
}