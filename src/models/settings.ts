import { Store } from "tauri-plugin-store-api";
import { SETTINGS_FILE } from "../lib/constants";
import { merge } from "lodash";

const store = new Store(SETTINGS_FILE);

export type Settings = {
  mastery_rank: number;
  user_email: string;
  user_password: string;
  access_token?: string;
}

export const defaults: Settings = {
  mastery_rank: 2, // Trading is unlocked at MR2
  user_email: "",
  user_password: "",
  access_token: undefined,
}

// TODO implement different scopes outside of just "settings"

const settings = {
  async get(): Promise<Settings> {
    return await store.get<Settings>("settings") || defaults;
  },

  /** If setting values to undefined/null, this will not work */
  async update(newSettings: Partial<Settings>) {
    const currentSettings = await store.get<Settings>("settings");    
    const promise = store.set("settings", merge(defaults, currentSettings, newSettings));
    await store.save()
    return promise;
  },

  async set(key: keyof Settings, value: typeof defaults[typeof key]) {
    const currentSettings = await store.get<Settings>("settings");    
    // @ts-ignore
    currentSettings[key] = value;
    const promise = store.set("settings", currentSettings);
    await store.save()
    return promise;
  },

  async resetAll() {
    const promise = store.set("settings", defaults);
    await store.save()
    return promise;
  }
}

export default settings;