import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // backend
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // allow CORS requests with credentials
});

export default api;
