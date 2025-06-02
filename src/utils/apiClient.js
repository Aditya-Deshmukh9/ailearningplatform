import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CLIENT_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
