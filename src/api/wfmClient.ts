import { axiosInstance } from './axios'
import { settings, user } from '../lib/persistance'
import { Result, Err, Ok } from './errorHandling'
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
    async login(email: string, password: string): Result<Wfm.User> {
      return axiosInstance.post('/auth/signin', { email, password })
        .then(async response => {
          let access_token = response.headers['set-cookie'] as string | undefined
          if (access_token) {
            access_token = access_token.slice(4).split(';')[0]
            await settings.update({ access_token })
            return Ok(response.data.payload.user)
          }
          return Err(new Error('This shouldn\'t happen'))
        })
        .catch((err) => Err(err))
    },
    async logout() {
      await settings.set('access_token', undefined)
    }
  },

  items: {
    async list(): Result<Wfm.Item[]> {
      return axiosInstance.get<Wfm.Api.ItemsList>('/items')
        .then(response => Ok(response.data.payload.items))
        .catch(err => Err(err))
    }
  },

  order: {
    async list(): Result<Wfm.Order[]> {
      const { ingame_name } = await user.get()
      return axiosInstance.get(`/profile/${ingame_name}/orders`)
        .then(response => Ok(response.data.payload.orders))
        .catch(err => Err(err))
    },
    async create(props: CreateOrder): Result<Wfm.Order, AxiosError> {
      return axiosInstance.post('/profile/orders', props)
        .then(response => Ok(response.data))
        .catch(err => Err(err))
    },
    async update() {},
    async delete() {},
  },
}

export default wfmClient

export const wfmThumbnail = (thumb: string) => `https://warframe.market/static/assets/${thumb}`