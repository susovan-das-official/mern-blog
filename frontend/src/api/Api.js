import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const registerApi = (userData) => {
  return api.post("/auth/register", userData, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const loginApi = (userData) => {
  return api.post("/auth/login", userData, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const GoogleLoginApi = (userData) => {
  return api.post("/auth/google-login", userData, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const LogoutApi = () => {
  return api.post("/auth/logout", {
    withCredentials: true,
  });
};
