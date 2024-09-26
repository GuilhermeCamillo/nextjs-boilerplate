import axios from "axios";
import AuthService from "./services/auth-service";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use(async function (config) {
  const token = await AuthService.getSessionUserId();
  config.headers.setAuthorization(token!);

  return config;
});
