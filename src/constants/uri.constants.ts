const DOMAIN = process.env.NEXT_PUBLIC_API

export const URI = {
  DOMAIN,
  LOGIN: '/v1/auth/login',
  REFRESH: '/v1/auth/refresh_token',
  LOGIN_SOCIAL: '/v2/signup/social',
  REGISTER: '/v1/signup/register',
  REGISTER_PROFILE: '/v1/users/settings/stepweb1',
  CONFIRM: '/v1/signup/confirm',
  FORGOT_PASSWORD: '/v1/passwords/forgot',
  FORGOT_CONFIRM: '/v1/passwords/confirm',
  RESET_PASSWORD: '/v1/passwords/reset',
  PROFILE_UPDATE: '/v2/users/settings/step1',
  FOLLOWERS: '/v2/followers',
  FOLLOWING: '/v2/following',
  NG_WORDS: '/v1/ng_words',
  GET_PREFECTURES: 'v2/areas',
  USER_SETTINGS: '/v2/users/settings',
  USER_FEATURES: '/v2/user_features',
  GAME_TITLES_ALL: '/v2/game_titles_all',
  GAME_GENRES: '/v1/game_genres',
  GAME_TITLES: '/v1/game_titles',
  USER_DETAIL_PROFILE: '/v2/users/profile',
  USER_PROFILE_IMAGE: '/v1/profile_images/user_images',
  USERS_SEARCH: '/v2/users/search',
  FOLLOW: '/v1/followers/follow',
  UNFOLLOW: '/v1/followers/unfollow',
  COMMUNITY_LIST: '/v1/communities/list',
  TOURNAMENTS_SEARCH: '/v1/tournaments/search',
  RECOMMENDED_USERS: '/v1/recommended_users',
  TOURNAMENTS_HISTORY_SEARCH: '/v1/tournaments/history_search',
  TOURNAMENT_FOLLOWERS: '/v2/tournaments/???',
  TOURNAMENT_RESULTS: '/v2/tournaments/???',
  COMMUNITY_FOLLOWERS_TOPICS: '/v2/communities/???',
  PROFILE_ACTIVITY_LOG: '/v1/activity_logs',
  NICKNAMES_2: '/v2/users/get_nicknames2',
  USER_RECOMMENDATIONS: '/v2/users/recommendations',
  RECRUITMENT_RECOMMENDATIONS: '/v2/recruitments/recommendations',
  GAME_UPDATE: '/v2/users/game_titles',
  NOTIFICATION_LIST: '/v2/notification/own',
  S3_PRESIGNED_URL: '/v2/s3/presigned_url',
  LOGOUT: '/v1/auth/logout',
}
