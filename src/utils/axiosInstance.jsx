import axios from "axios";
//
const apiClient = axios.create({
baseURL: "https://fooddeliverybackend-7a1h.onrender.com",
  // baseURL:"http://localhost:5000",
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
