import { useContext } from "react";
import { EnrollTableFields } from "./EnrollTableField";
import { EnrollTableRecords } from "./EnrollTableRecord";
import { CoursesContext } from "../EnrollLayout";

export function EnrollCoursesTable() {
    const { records } = useContext(CoursesContext)

    return <div 
    className="w-[96%] h-[400px] mt-[20px]
    border-x-[1px] border-b-[1px] border-gray-300
    flex flex-col">
        <header
        className="w-full min-h-[48px]
        bg-emerald-400
        flex items-center">
            <h1 
            className="text-white text-[1.4rem] yrsa-font ml-[10px]">
                Đăng ký môn học
            </h1>
        </header>

        <div 
        className="w-full h-full overflow-y-scroll
        table-scrollbar
        flex flex-col">
            <EnrollTableFields isCourseTable={true}/>

            {Object.entries(records).map(([courseCode, record], index) => (
                <EnrollTableRecords
                    key={courseCode}
                    recordKey={courseCode} 
                    courseData={record.courseData}
                    isSelect={record.isSelect}
                    index={index} // thứ tự trong bảng
                />
            ))}
        </div>
    </div>
}