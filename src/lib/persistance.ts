import { Store } from 'tauri-plugin-store-api'
import { SETTINGS_FILE } from './constants'
import { merge } from 'lodash'
import { Settings, Wfm } from '../types'

const store = new Store(SETTINGS_FILE)

// TODO implement different scopes outside of just "settings"

class Persist<T> {
  constructor(private name: string, public defaults: T) {}
  async get(): Promise<T>{
    return await store.get<T>(this.name) || this.defaults
  }
  async set(key: keyof T, value: typeof this.defaults[typeof key]) {
    const currentSettings = await store.get<T>(this.name)
    // @ts-ignore
    currentSettings[key] = value
    const promise = store.set(this.name, currentSettings)
    await store.save()
    return promise
  }
  async update(newSettings: Partial<T>) {
    const currentSettings = await store.get<T>(this.name)
    const promise = store.set(this.name, merge(this.defaults, currentSettings, newSettings))
    await store.save()
    return promise
  }
  async reset() {
    const promise = store.set(this.name, this.defaults)
    await store.save()
    return promise
  }
}

export const settings = new Persist<Settings>('settings', {
  mastery_rank: 2, // Trading is unlocked at MR2
  user_email: '',
  user_password: '',
  access_token: undefined,
})

export const user = new Persist<Wfm.User>('user', {
  banned: false,
  id: '',
  ingame_name: '',
  locale: 'en',
  platform: 'pc',
  region: 'en',
  role: 'user',
})

export const itemCache = new Persist<{ items: Record<string, Wfm.Item> }>('itemCache', {
  items: {},
})

export default settings