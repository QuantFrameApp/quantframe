
import axios from 'axios';
// @ts-ignore no type definitions for this package
import axiosTauriAdapter from 'axios-tauri-adapter';
import { Store } from "tauri-plugin-store-api";
import { PLATFORMS, SETTINGS_FILE } from '../constants';

const HEADERS = {
  "Content-Type": "application/json; utf-8",
  "Accept": "application/json",
  // TODO configurable platform and language
  "language": "en",
  "platform": PLATFORMS.PC,
}

export const wfm = axios.create({
  adapter: axiosTauriAdapter,
  baseURL: 'https://api.warframe.market/v1',
  headers: HEADERS
});

export const wfmAuth = axios.create({
  adapter: axiosTauriAdapter,
  baseURL: 'https://api.warframe.market/v1',
  headers: {
    ...HEADERS,
    "auth_type": "header",
  },
  // withCredentials: true, // ???
})

// Nice interceptor implementation: https://github.com/gitdagray/react_jwt_auth/blob/main/src/hooks/useAxiosPrivate.js

const store = new Store(SETTINGS_FILE);

wfmAuth.interceptors.request.use(
  async config => {
    const accessToken = await store.get("accessToken");
    if (!config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  }, (error) => Promise.reject(error)
);

// Refresh Access Token ??? idk if this is needed
// wfmAuth.interceptors.response.use(
//   response => response,
//   async (error) => {
//     const prevRequest = error?.config;
//     if (error?.response?.status === 403 && !prevRequest?.sent) {
//       prevRequest.sent = true;
//       const newAccessToken = await refresh();
//       prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//       return wfmAuth(prevRequest);
//     }
//     return Promise.reject(error);
//   }
// );