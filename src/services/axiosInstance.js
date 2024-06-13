import axios from "axios";
import AuthService from "./AuthService";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

// Interceptor pentru cereri, adăugând access token-ul la header-ul Authorization
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
});

// Interceptor pentru răspunsuri, gestionând reînnoirea access token-ului
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const data = await AuthService.refreshToken();
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + data.accessToken;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
        AuthService.logout(); // Log out the user if the refresh token is invalid
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
