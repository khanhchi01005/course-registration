import axios from "axios";

// Tạo một instance Axios dùng chung
const axiosClient = axios.create({
    baseURL: "http://127.0.0.1:5000",
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