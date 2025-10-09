import { useContext } from "react";
import { EnrollTableFields } from "./EnrollTableField";
import { CoursesContext } from "../EnrollLayout";
import { EnrollTableRecords } from "./EnrollTableRecord";

export function EnrollSelectedTable() {
    const { records } = useContext(CoursesContext)

    return <div 
    className="w-[96%] max-h-[250px] mb-[20px]
    border-x-[1px] border-b-[1px] border-gray-300
    flex flex-col">
        <header
        className="w-full min-h-[48px]
        bg-blue-400
        flex items-center">
            <h1 
            className="text-white text-[1.4rem] yrsa-font ml-[10px]">
                Danh sách môn học đã chọn
            </h1>
        </header>

        <div 
        className="w-full h-full overflow-y-scroll 
        table-scrollbar
        flex flex-col">
            <EnrollTableFields isCourseTable={false} />
            {Object.entries(records)
                .filter(([_ , record]) => record.isSelect) // chỉ giữ record được chọn
                .map(([courseCode, record], index) => (
                    <EnrollTableRecords 
                        key={courseCode}
                        recordKey={courseCode} 
                        courseData={record.courseData}
                        isSelect={record.isSelect}
                        index={index}
                    />
                ))
            }
        </div>
    </div>
}