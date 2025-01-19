import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
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
