import axios from "axios";

// Tạo một instance Axios dùng chung
const axiosClient = axios.create({
    baseURL: "", // URL backend 
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false, 
});

axiosClient.interceptors.response.use(
  (response) => {
    return { data: response.data, status: response.status } as any;
  },
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;