import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLICK_API_URL,
});
