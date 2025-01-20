import { api } from "./Api";

export const getUserApi = () => {
  return api.get("/user/:userId", {
    withCredentials: true,
  });
};
