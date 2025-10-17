import { useContext, useEffect, useState } from "react";
import { EnrollContentLayout } from "./enroll_content/EnrollContentLayout";
import { EnrollNavbarLayout } from "./enroll_navbar/EnrollNavbarLayout";
import type { RecordData } from "../../datatypes/EnrollDataType";
import { CoursesContext, fetchCourses } from "./EnrollExtra";
import { UserContext } from "../login/LoginExtra";

// đây là component mẫu có thể xóa nếu ko cần
export function EnrollLayout() {
    const [records, setRecords] = useState<Record<string, RecordData>>({});

    // const { user } = useContext(UserContext);
    // console.log("Student code:", user?.studentCode);

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