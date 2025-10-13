import axios from "axios";

// Tạo một instance Axios dùng chung
const axiosClient = axios.create({
    baseURL: "https://2ac38149-87cc-4123-b278-2b117d738a71.mock.pstmn.io", // URL backend 
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