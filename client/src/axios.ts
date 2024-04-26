import axios from "axios";

const Axios = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://dog-finder-backend.onrender.com/",
});

Axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwtToken");
  config.headers.Authorization = token;
  return config;
});

export default Axios;
