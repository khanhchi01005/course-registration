import axiosClient from "./axios";

export const courseApi = {
    listCourses: () =>
        axiosClient.get("/api/subject/list"),

    submit: (payload: any) =>
        axiosClient.post("/api/subject/enroll", payload),
};