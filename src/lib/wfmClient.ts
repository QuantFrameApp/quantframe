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

type WfmItem = {
  id: string,
  item_name: string,
  url_name: string,
  thumb: string,
}

const wfmClient = {
  auth: {
    login: (email: string, password: string) => (axiosInstance.post('/auth/signin', { email, password })
      .then(response => {
        let access_token = response.headers['set-cookie'] as string|undefined
        if (access_token) {
          access_token = access_token.slice(4)
          settings.set({ access_token });
          return response.data.user as WfmUser
        }
        return null
      })
      .catch(err => {
        console.error(err);
        return null
      })
    ),
    async logout() {
      await settings.set({ access_token: undefined });
    }
  },

  items: {
    list: () => (axiosInstance.get('/items')
      .then(response => response.data.payload.items as WfmItem[])
      .catch(err => {
        console.error(err);
        return [] as WfmItem[];
      })
    ),
  },

  order: {
    async list() {},
    async create() {},
    async update() {},
    async delete() {},
  },
}

export default wfmClient;
