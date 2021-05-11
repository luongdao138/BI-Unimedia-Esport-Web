const DOMAIN = process.env.NEXT_PUBLIC_API

export const URI = {
  DOMAIN,
  LOGIN: '/v1/auth/login',
  LOGIN_SOCIAL: '/v2/signup/social',
  REGISTER: '/v1/signup/register',
  CONFIRM: '/v1/signup/confirm',
  FORGOT_PASSWORD: '/v1/passwords/forgot',
  FORGOT_CONFIRM: '/v1/passwords/confirm',
  RESET_PASSWORD: '/v1/passwords/reset',
  PROFILE_UPDATE: '/v2/users/settings/step1',
  GET_PREFECTURES: 'v2/areas',
  USER_SETTINGS: '/v2/users/settings',
  USER_FEATURES: '/v2/user_features',
  GAME_TITLES_ALL: '/v2/game_titles_all',
  USER_DETAIL_PROFILE: '/v2/users/profile',
  USERS_SEARCH: '/v2/users/search',
  FOLLOW: '/v1/followers/follow',
  UNFOLLOW: '/v1/followers/unfollow',
  TOURNAMENTS_SEARCH: '/v1/tournaments/search',
}
