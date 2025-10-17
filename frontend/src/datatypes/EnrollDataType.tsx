import type { CourseData } from "./CourseDataType";

export interface RecordData {
    courseData: CourseData
    isSelect: boolean
}

export interface RecordAttribute {
    name: string
    width: string
    pos: "other" | "right"
    isCheckBox: boolean
    keyCode: string
}

export interface SubmitData {
    studentCode: string
    courseCode: string[]
}