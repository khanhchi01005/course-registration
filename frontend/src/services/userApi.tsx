import axiosClient from "./axios";

// đây chỉ là mẫu cách sử dụng, có thể xóa nếu không cần
export const userApi = {
    login: (payload: any) =>
        axiosClient.post("/credentials/login", payload),

    enroll: (payload: any) =>
        axiosClient.get("/credentials/enroll", payload),
};