import axios from "axios";

const api = axios.create({
  baseURL: "api/",
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    window.location.href = "/login";
    return Promise.reject(error);
  }
);

export default api;
