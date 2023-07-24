import { axiosInstance } from './axios'
import { settings, user } from '../lib/persistance'
import { GoResponse, fail, ok } from './errorHandling'
import { Wfm } from '../types'
import { AxiosError } from 'axios'

// Docs https://warframe.market/api_docs

// Properties commented out are not needed for this app, at this time.


type ObjectID = string

type CreateOrder = {
  item: ObjectID,
  order_type: Wfm.OrderType,
  platinum: number,
  quantity: number,
  visible: boolean,
  /** Mods only */
  rank?: number,
  /** Relics only */
  sub_type?: 'intact' | 'exceptional' | 'flawless' | 'radiant'
}

const wfmClient = {
  auth: {
    async login(email: string, password: string): GoResponse<Wfm.User> {
      return axiosInstance.post('/auth/signin', { email, password })
        .then(async response => {
          let access_token = response.headers['set-cookie'] as string | undefined
          if (access_token) {
            access_token = access_token.slice(4).split(';')[0]
            await settings.update({ access_token })
            return ok(response.data.payload.user)
          }
          return fail(new Error('This shouldn\'t happen'))
        })
        .catch((err) => fail(err))
    },
    async logout() {
      await settings.set('access_token', undefined)
    }
  },

  items: {
    list: (): GoResponse<Wfm.Item[]> => (axiosInstance.get('/items')
      .then(response => ok(response.data.payload.items))
      .catch(err => fail(err))
    ),
  },

  order: {
    async list(): GoResponse<Wfm.Order[]> {
      const { ingame_name } = await user.get()
      return axiosInstance.get(`/profile/${ingame_name}/orders`)
        .then(response => ok(response.data.payload.orders))
        .catch(err => fail(err))
    },
    async create(props: CreateOrder): GoResponse<Wfm.Order, AxiosError> {
      return axiosInstance.post('/profile/orders', props)
        .then(response => ok(response.data))
        .catch(err => fail(err))
    },
    async update() {},
    async delete() {},
  },
}

export default wfmClient
