import axios from "axios";
import { supabase } from "./supabase";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 90_000,
});

api.interceptors.request.use(async (config) => {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await supabase.auth.signOut();
    }
    return Promise.reject(error);
  }
);

export function getErrorMessage(error) {
  if (error.response?.data?.error) return error.response.data.error;
  if (error.code === "ECONNABORTED") return "The server took too long to answer. Please try again.";
  if (!error.response) return "Can't reach the server. Check your internet connection and try again.";
  return "Something went wrong. Please try again.";
}
