import { baseUrl } from "@/utils/axios";
import axios from "axios";
import { parseCookies } from "nookies";

function getAPIclient(ctx?: any) {
  const { 'atis.token': token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: baseUrl,
  })

  api.interceptors.request.use(config => {
    return config;
  })

  if (token) {
    api.defaults.headers['Authorization'] = 'Bearer ' + token;
  }

  return api;
}

export { getAPIclient };