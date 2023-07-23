import { axiosInstance } from './axios';
import { settings } from '../models';
import { GoResponse, fail, ok } from './errorHandling';

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
    login: (email: string, password: string): GoResponse<WfmUser> => (axiosInstance.post('/auth/signin', { email, password })
      .then(response => {
        let access_token = response.headers['set-cookie'] as string|undefined
        if (access_token) {
          access_token = access_token.slice(4)
          settings.update({ access_token });
          return ok(response.data.user as WfmUser)
        }
        return fail(new Error("This shouldn't happen"))
      })
      .catch((err) => {
        console.error(err);
        return fail(err)
      })
    ),
    async logout() {
      await settings.set('access_token', undefined);
    }
  },

  items: {
    list: (): GoResponse<WfmItem[]> => (axiosInstance.get('/items')
      .then(response => response.data.payload.items)
      .catch(err => {
        console.error(err);
        return err
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
