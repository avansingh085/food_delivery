import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.BACKEND_URL||"https://fooddeliverybackend-7a1h.onrender.com",
  timeout: 10000, 
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("BeksToken");
    if (token) {
      config.headers["Authorization"] = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default apiClient;
