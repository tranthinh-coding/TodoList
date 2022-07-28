import axios from "axios";
import { ACCESS_TOKEN } from "@/config/app";
import { getToken, setToken } from "@/utils/auth";

axios.defaults.withCredentials = true;
axios.defaults.headers.common = {
  Authorization: `Bearer ${getToken(ACCESS_TOKEN)}`,
  Accept: "application/json;charset=utf-8",
  "X-Requested-With": "XMLHttpRequest",
};

// Create axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_API_V1,
  timeout: 10000, // Request timeout
});

// Request intercepter
service.interceptors.request.use(
  (config) => {
    const token = getToken(ACCESS_TOKEN);
    if (token) {
      config.headers["Authorization"] = "Bearer " + getToken(ACCESS_TOKEN); // Set JWT token
    }
    return config;
  },
  (error) => {
    console.log(error); // for debug
    Promise.reject(error);
  },
);

// response pre-processing
service.interceptors.response.use(
  (response) => {
    if (response.headers.authorization) {
      setToken(ACCESS_TOKEN, response.headers.authorization);
      response.data.token = response.headers.authorization;
    }
    return response.data;
  },
  (error) => {
    let message = error.message;
    if (error.response.data && error.response.data.errors) {
      message = error.response.data.errors;
    } else if (error.response.data && error.response.data.error) {
      message = error.response.data.error;
    }
    return Promise.reject(error);
  },
);

export default service;
