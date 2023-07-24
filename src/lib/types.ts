export type Settings = {
  mastery_rank: number;
  user_email: string;
  user_password: string;
  access_token?: string;
  /** Starting plat */
  budget?: number;
  current_plat?: number;
}

export namespace Wfm {
  export type OrderType = 'sell' | 'buy';

  export type User = {
    // unread_messages: number
    // has_mail: number
    // check_code: string,
    // written_reviews: string,
    // verification: boolean,
    ingame_name: string,
    // anonymous: boolean,
    platform: 'pc',
    // reputation: number,
    // linked_accounts: {}
    id: string,
    region: 'en' | (string & {}),
    locale: 'en' | (string & {}),
    // background: string|null,
    role: 'user',
    // avatar: string,
    banned: boolean
  }

  export type Order = {
    platinum: 1,
    quantity: 1,
    visible: false,
    creation_date: '2023-07-23T22:58:23.204+00:00',
    last_update: '2023-07-23T22:58:23.204+00:00',
    mod_rank: 1,
    platform: 'pc',
    order_type: 'buy',
    item: {
      tags: [
        'mod',
        'warframe',
        'rare'
      ],
      url_name: 'adaptation',
      mod_max_rank: 10,
      id: '5bc1ab93b919f200c18c10ef',
    },
    id: '64bdb08f863992033799c75f'
  }

  export type Item = {
    id: string,
    item_name: string,
    url_name: string,
    thumb: string,
  }
}

export type Loading = 'idle' | 'loading' | 'success' | 'error';
