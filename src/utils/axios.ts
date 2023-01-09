import axios from "axios";

export const axiosInstance = axios.create({
  headers: {
    post: {
      "Content-Type": "application/json",
    },
    "X-HS-IAuth": import.meta.env.VITE_TOKEN,
  },
});
