export type Settings = {
  mastery_rank: number;
  user_email: string;
  user_password: string;
  access_token?: string;
}

export namespace Wfm {
  export type OrderType = "sell" | "buy";

  export type User = {
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

  export type Item = {
    id: string,
    item_name: string,
    url_name: string,
    thumb: string,
  }
}

export type Loading = 'idle' | 'loading' | 'success' | 'error';
