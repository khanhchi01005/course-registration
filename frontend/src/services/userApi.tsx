import axiosClient from "./axios";

export const userApi = {
    login: (payload: any) =>
        axiosClient.post("/api/credentials/Iogin", payload),
};