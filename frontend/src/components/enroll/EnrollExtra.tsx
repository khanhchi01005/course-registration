import humps from "humps";
import type { RecordData, SubmitData } from "../../datatypes/EnrollDataType";
import type { CourseData } from "../../datatypes/CourseDataType";
import { courseApi } from "../../services/courseApi";
import { mockCourses } from "../../services/mockCourseData";
import { createContext } from "react";

export const CoursesContext = createContext<{
    records: Record<string, RecordData>,
    setRecords: React.Dispatch<React.SetStateAction<Record<string, RecordData>>>
}>({
    records: {},
    setRecords: () => {}
});

export async function fetchCourses(): Promise<Record<string, RecordData>> {
    const newRecords: Record<string, RecordData> = {};

    try {
        const res = await courseApi.listCourses();
        const data = humps.camelizeKeys(res.data);
        const courses: CourseData[] = data.courses || [];

        courses.forEach((course) => {
            newRecords[course.courseCode] = { courseData: course, isSelect: false };
        });

        return newRecords;
    } catch (error) {
        // mockCourses.forEach((course) => {
        //     newRecords[course.courseCode] = { courseData: course, isSelect: false };
        // });

        console.error("Lỗi khi lấy danh sách khóa học:", error);
        return newRecords;
    }
}

export async function saveSubmitData(submitData: SubmitData) {
    try{
        const res = await courseApi.submit(humps.decamelizeKeys(submitData))
        console.log(res.data)
    } catch(error) {
        console.log("Lỗi khi submit danh sách học sinh: ", error)
    }
}