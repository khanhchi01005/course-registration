import axios from "axios";

// Tạo một instance Axios dùng chung
const axiosClient = axios.create({
    baseURL: "", // URL backend 
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false, // true nếu backend dùng cookie/session
});

axiosClient.interceptors.response.use(
    (response) => response.data, // chỉ trả về data
    (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
    }
);

export default axiosClient;