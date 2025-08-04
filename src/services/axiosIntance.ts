import axios from "axios";
import { BASE_URL, TIME_OUT } from "../constants/API";
import { TOKEN_KEY } from "../constants/LOCAL_STORAGE_KEYS";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function onFulfilled(response) {
    return response;
  },
  function onRejected(error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
