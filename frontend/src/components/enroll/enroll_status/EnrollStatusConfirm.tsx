import { useContext } from "react";
import type { CourseData } from "../../../datatypes/CourseDataType";
import { useNavigate } from "react-router-dom";
import { CoursesContext, fetchCourses, saveSubmitData } from "../EnrollExtra";
import type { SubmitData } from "../../../datatypes/EnrollDataType";
import { UserContext } from "../../login/LoginExtra";
import { Save } from "lucide-react";

export function EnrollStatusConfirm() {
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserContext)
    const { records } = useContext(CoursesContext)

    const handleRecord = async () => {
        const result = window.confirm("Bạn có chắc muốn ghi nhận?");
        if (!result) return

        // Lọc các khóa học đã chọn
        const selectedRecords = Object.entries(records)
            .filter(([_, record]) => record.isSelect)
            .map(([_, record]) => record.courseData)

        if (selectedRecords.length === 0) {
            window.alert("Bạn chưa chọn lớp học nào!")
            return;
        }

        const currentRecords = await fetchCourses()

        // Kiểm tra slot
        const exceededCourses: CourseData[] = []
        const sucessedCoursesId: string[] = []

        for (const course of selectedRecords) {
            const currentCourse = currentRecords[course.courseCode]?.courseData

            if (!currentCourse) continue; // nếu course bị xóa hoặc không tồn tại

            if (currentCourse.currentSlots + 1 > currentCourse.maxSlots) {
                exceededCourses.push(currentCourse)
            }
            else {
                sucessedCoursesId.push(currentCourse.courseCode)
            }
        }

        // Lưu các khóa học thành công vào database
        const submitDatas: SubmitData = {
            studentCode: user.studentCode,
            courseCode: sucessedCoursesId
        }

        await saveSubmitData(submitDatas)

        // Nếu có khóa học đầy slot
        if (exceededCourses.length > 0) {
            const validCount = sucessedCoursesId.length
            const totalCount = selectedRecords.length

            window.alert(`Bạn đã ghi nhận thành công ${validCount}/${totalCount} khóa học`)
            return
        }

        // Nếu tất cả hợp lệ
        else {
            window.alert(`Đã ghi nhận thành công ${selectedRecords.length}/${selectedRecords.length} khóa học!`)
        }
        navigate("/login", { replace: true })

        // ⏳ Sau 200ms mới xóa user
        setTimeout(() => {
            setUser({ studentCode: "", fullName: "" })
            sessionStorage.removeItem("user")
        }, 200)
    }

    return (
        <button
            className="absolute right-8 py-[4px] px-[12px] cursor-pointer
        bg-blue-500 hover:bg-blue-600
        flex items-center justify-center gap-2"
            onClick={() => handleRecord()}
        >
            <Save size={16} className="text-yellow-50" />
            <h1 className="text-[1rem] text-yellow-50 yrsa-font">
                Ghi nhận
            </h1>
        </button>
    );
}