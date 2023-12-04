import axios from 'axios';
const API_URL = "http://localhost:8080"; // Thay thế bằng URL thực tế của API

const axiosInstance = axios.create({
    baseURL: API_URL,
});

// Thêm interceptor để thêm JWT Token vào các yêu cầu
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Các hàm để thực hiện các phương thức HTTP
const api = {
    get: (url, params) => axiosInstance.get(url, { params }),
    post: (url, data) => axiosInstance.post(url, data),
    put: (url, data) => axiosInstance.put(url, data),
    delete: (url) => axiosInstance.delete(url),
};

export default api;
	