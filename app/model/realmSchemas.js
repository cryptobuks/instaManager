/**
 * User Basic informations + access token
 */
export const UserSchema = {
  name: 'User',
  primaryKey: 'id',
  properties: {
    id:  'string',
    accessToken: 'string',
    username: 'string',
    full_name: 'string',
    profile_picture: 'string',
    bio: 'string',
    website: 'string',
    is_business: { type: 'bool', defaiult: false },
    media: { type: 'int', default: 0 },
    follows: { type: 'int', default: 0 },
    followed_by: { type: 'int', default: 0 },
    prev_media: { type: 'int', default: 0 },
    prev_follows: { type: 'int', default: 0 },
    prev_followed_by: { type: 'int', default: 0 }
  }
};

/**
 * Related users (followers or followeds, current or lost)
 */
export const RelatedUsersInfoSchema = {
    name: 'RelatedUsersInfo',
    primaryKey: 'id',
    properties: {
        id: 'string',
        username: 'string',
        full_name: 'string',
        profile_picture: 'string'
    }
};

/**
 * The list of followers by user, updated at each update and used to extract lost related
 */
export const FollowersSchema = {
    name: 'Followers',
    primaryKey: 'userId',
    properties: {
        userId: 'string',
        users: 'string[]'
    }
}
/**
 * The list of followings by user, updated at each update and used to extract lost related
 */
export const FollowingsSchema = {
    name: 'Followings',
    primaryKey: 'userId',
    properties: {
        userId: 'string',
        users: 'string[]'
    }
}

/**
 * Followers history by user and by date
 * date property is not a real Date object.
 * In order to use it as a primary key, it a string formatted as a date without time information
 */
export const FollowersHistorySchema = {
    name: 'FollowersHistory',
    primaryKey: 'date',
    properties: {
        userId: 'string',
        lostUsers: 'string[]',
        newUsers: 'string[]',
        date: 'string'
    }
};

/**
 * Followings history by user and by date
 */
export const FollowingsHistorySchema = {
    name: 'FollowingsHistory',
    primaryKey: 'date',
    properties: {
        userId: 'string',
        lostUsers: 'string[]',
        newUsers: 'string[]',
        date: 'string'
    }
};

