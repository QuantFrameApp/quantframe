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
import { TokenBucket } from '../rateLimiter';

export const wfm = axios.create({
  adapter: axiosTauriAdapter,
  baseURL: 'https://api.warframe.market/v1',
});

// Look into how high burst can get before we get rate limited
const rateLimiter = new TokenBucket(3, 2);

export default {
  async listItems() {
    await rateLimiter.wait();
    const { data } = await wfm.get('/items');
  }
}