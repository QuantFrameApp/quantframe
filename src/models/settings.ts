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

const settings = {
  async get(): Promise<Settings> {
    return await store.get<Settings>("settings") || defaults;
  },

  async set(newSettings: Partial<Settings>) {
    const currentSettings = await store.get<Settings>("settings");
    const promise = store.set("settings", merge(defaults, currentSettings, newSettings));
    store.save()
    return promise;
  },

  async reset() {
    const promise = store.set("settings", defaults);
    store.save()
    return promise;
  }
}

export default settings;