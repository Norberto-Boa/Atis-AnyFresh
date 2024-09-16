import { baseUrl } from "@/utils/axios";
import axios from "axios";
import { parseCookies } from "nookies";
import {verify} from "jsonwebtoken";
import type { decodedToken } from "@/utils/checkJwt";

function getAPIclient(ctx?: any) {
  const { 'atis.token': token } = parseCookies(ctx);
  
  const api = axios.create({
    baseURL: baseUrl,
  })
  
  api.interceptors.request.use(config => {
    return config;
  })
  
  if (token) {
    // const decodedToken  = verify(token, "Mena")
    api.defaults.headers['Authorization'] = 'Bearer ' + token;
    // api.defaults.headers.post['user']= decodedToken.sub?.toString();
  }

  return api;
}

export { getAPIclient };