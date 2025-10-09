import axiosClient from "./axios";

export const courseApi = {
    listCourses: () =>
        axiosClient.get("/api/home/list_subjects"),

    submit: (payload: any) =>
        axiosClient.post("/api/home/submit", payload),
};