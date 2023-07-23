import { axiosInstance } from './axios';
import { settings } from '../models';

// Docs https://warframe.market/api_docs

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

const wfmClient = {
  auth: {
    async login(user_email: string, user_password: string) {  
      try {
        const response = await axiosInstance.post('/auth/signin', {
          email: user_email, password: user_password,
        })
        
        let access_token = response.headers['set-cookie'] as string|undefined
  
        if(access_token) {
          access_token = access_token.slice(4)
          settings.set({ access_token });
          return response.data.user as WfmUser
        }
      } catch (err) {
        console.error(err);
      }
      return null
    },
    async logout() {
      await settings.set({ access_token: undefined });
    }
  },

  items: {
    async list() {
      try {
        const response = await axiosInstance.get('/items');
        console.log('items', response.data.payload);
        
        return response.data.payload;
      } catch (err) {
        console.error(err);
      }
      return null;
    },
  },

  order: {
    async list() {},
    async create() {},
    async update() {},
    async delete() {},
  },
}

export default wfmClient;
