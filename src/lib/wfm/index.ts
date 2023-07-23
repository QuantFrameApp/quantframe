// Docs https://warframe.market/api_docs

// @ts-ignore no type definitions for this package
import axiosTauriAdapter from 'axios-tauri-adapter';
import { TokenBucket } from '../rateLimiter';
import { wfm } from './axios';
// import { Store } from "tauri-plugin-store-api";
// import { SETTINGS_FILE } from '../constants';

// const store = new Store(SETTINGS_FILE);

// Look into how high burst can get before we get rate limited
const rateLimiter = new TokenBucket(3, 2);

export default {
  // auth: {
  //   async login(user_email: string, user_password: string /*platform = 'pc', language = 'en'*/) {
  //     await rateLimiter.wait();
  //     const { data } = await wfm.post('/auth/signin', {
  //       user_email,
  //       user_password,
  //       auth_type: 'header',
  //     });
  //   },
  // },
  async listItems() {
    await rateLimiter.wait();
    return wfm.get('/items');
  }
}