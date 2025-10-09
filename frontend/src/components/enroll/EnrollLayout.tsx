import { createContext, useEffect, useState } from "react";
import { EnrollContentLayout } from "./enroll_content/EnrollContentLayout";
import { EnrollNavbarLayout } from "./enroll_navbar/EnrollNavbarLayout";
import type { CourseData } from "../../datatypes/CourseDataType";
import type { RecordData } from "../../datatypes/EnrollDataType";
import { courseApi } from "../../services/courseApi";
import { mockCourses } from "../../services/mockCourseData";

export const CoursesContext = createContext<{
    records: Record<string, RecordData>,
    setRecords: React.Dispatch<React.SetStateAction<Record<string, RecordData>>>
}>({
    records: {},
    setRecords: () => {}
});

// đây là component mẫu có thể xóa nếu ko cần
export function EnrollLayout() {
    const [records, setRecords] = useState<Record<string, RecordData>>({});

    useEffect(() => {
        const initCourses = async () => {
            const data: Record<string, RecordData> = await fetchCourses();
            setRecords(data);
        };

        initCourses();
    }, []);

    return (
    <CoursesContext.Provider value={{ records, setRecords }}>
        <div className="w-screen h-screen flex flex-col">
            <EnrollNavbarLayout />
            <EnrollContentLayout />
        </div>
    </CoursesContext.Provider>
  );
}

export async function fetchCourses(): Promise<Record<string, RecordData>> {
    const newRecords: Record<string, RecordData> = {};

    try {
        const res = await courseApi.listCourses();
        const courses: CourseData[] = res.data;

        courses.forEach((course) => {
            newRecords[course.courseCode] = { courseData: course, isSelect: false };
        });

        return newRecords;
    } catch (error) {
        mockCourses.forEach((course) => {
            newRecords[course.courseCode] = { courseData: course, isSelect: false };
        });

        console.error("Lỗi khi lấy danh sách khóa học:", error);
        return newRecords;
    }
}