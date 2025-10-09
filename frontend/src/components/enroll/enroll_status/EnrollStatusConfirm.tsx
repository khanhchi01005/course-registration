import { useContext } from "react";
import { CoursesContext, fetchCourses } from "../EnrollLayout";
import type { CourseData } from "../../../datatypes/CourseDataType";
import { useNavigate } from "react-router-dom";

export function EnrollStatusConfirm() {
    const navigate = useNavigate()
    const { records } = useContext(CoursesContext)

    const handleRecord = async () => {
        const result = window.confirm("Bạn có chắc muốn ghi nhận?");
        if (!result) return

        // Lọc các khóa học đã chọn
        const selectedRecords = Object.entries(records)
            .filter(([_, record]) => record.isSelect)
            .map(([_, record]) => record.courseData)

        if (selectedRecords.length === 0) {
            window.alert("Bạn chưa chọn khóa học nào!")
            return;
        }

        const currentRecords = await fetchCourses()

        // Kiểm tra slot
        const exceededCourses: CourseData[] = []

        for (const course of selectedRecords) {
            const currentCourse = currentRecords[course.courseCode]?.courseData

            if (!currentCourse) continue; // nếu course bị xóa hoặc không tồn tại

            if (currentCourse.currentSlot + 1 > currentCourse.maxSlot) {
                exceededCourses.push(currentCourse)
            }
        }

        // Nếu có khóa học đầy slot
        if (exceededCourses.length > 0) {
            const validCount = selectedRecords.length - exceededCourses.length
            const totalCount = selectedRecords.length

            window.alert(`Bạn đã ghi nhận được ${validCount}/${totalCount} khóa học`)
            return
        }

        // Nếu tất cả hợp lệ
        else {
            window.alert(`Đã ghi nhận thành công ${selectedRecords.length}/${selectedRecords.length} khóa học!`)
        }
        navigate("/login")
    }

    return <button 
    className="absolute right-[8rem] py-[4px] px-[12px] cursor-pointer
    bg-blue-500 hover:bg-blue-600
    flex items-center justify-center"
    onClick={() => handleRecord()}>
        <h1 className="text-[1rem] text-yellow-50 yrsa-font">
            Ghi nhận
        </h1>
    </button>
}