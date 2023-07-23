// import createClient from "openapi-fetch";
// import { paths } from "./v1";

// Sigh... Tauri's fetch is not compatible with openapi-fetch

// export const client = createClient<paths>({
//   baseUrl: 'https://api.warframe.market/v1',
// })

// Docs https://warframe.market/api_docs

import axios from 'axios';
// @ts-ignore no type definitions for this package
import axiosTauriAdapter from 'axios-tauri-adapter';

export const wfm = axios.create({
  adapter: axiosTauriAdapter,
  baseURL: 'https://api.warframe.market/v1',
});