import axios from "axios";
import { supabase } from "./supabase";

// One axios instance for all calls to our backend.
// Usage: const { data } = await api.get("/items");
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // The free Render server can take up to a minute to wake up.
  timeout: 90_000,
});

// Add the Supabase login token to every request.
api.interceptors.request.use(async (config) => {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// If the backend says our login is no longer valid, log out.
// useRequireSession() then sends the user to /login.
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await supabase.auth.signOut();
    }
    return Promise.reject(error);
  }
);

// Turns an axios error into a message we can show to the user.
export function getErrorMessage(error) {
  if (error.response?.data?.error) return error.response.data.error;
  if (error.code === "ECONNABORTED") return "The server took too long to answer. Please try again.";
  if (!error.response) return "Can't reach the server. Check your internet connection and try again.";
  return "Something went wrong. Please try again.";
}
