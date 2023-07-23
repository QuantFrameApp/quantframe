// Docs https://warframe.market/api_docs

// @ts-ignore no type definitions for this package
import axiosTauriAdapter from 'axios-tauri-adapter';
import { TokenBucket } from '../rateLimiter';
import { axiosInstance } from './axios';

// Look into how high burst can get before we get rate limited
const rateLimiter = new TokenBucket(3, 2);

// Properties commented out are not needed for this app, at this time.
type WfmUser = {
  // unread_messages: number
  // has_mail: number
  // check_code: string,
  // written_reviews: string,
  // verification: boolean,
  ingame_name: string,
  // anonymous: boolean,
  platform: "pc",
  // reputation: number,
  // linked_accounts: {}
  id: string,
  region: "en" | (string & {}),
  locale: "en" | (string & {}),
  // background: string|null,
  role: "user",
  // avatar: string,
  banned: boolean
}

type User = WfmUser & {
  access_token?: string
}

const wfmClient = {
  async login(user_email: string, user_password: string) {
    await rateLimiter.wait();

    try {
      const response = await axiosInstance.post('/auth/signin', {
        email: user_email, password: user_password,
      })
      
      let access_token = response.headers['set-cookie'] as string|undefined

      if(access_token) {
        access_token = access_token.slice(4)

        return {
          ...response.data.user,
          access_token,
        } as User
      }
    } catch (err) {
      console.error(err);
    }
    return null
  },

  async listItems() {
    await rateLimiter.wait();
    return axiosInstance.get('/items');
  }
}

export default wfmClient;
