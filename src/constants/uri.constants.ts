const DOMAIN = process.env.NEXT_PUBLIC_API

export const URI = {
  DOMAIN,
  LOGIN: '/v1/auth/login',
  LOGIN_SOCIAL: '/v1/signup/social',
  REGISTER: '/v1/signup/register',
  FORGOT_PASSWORD: '/v1/passwords/forgot',
  FORGOT_CONFIRM: '/v1/passwords/confirm',
  RESET_PASSWORD: '/v1/passwords/reset',
  USERS_SEARCH: '/v1/users/search',
  PROFILE_UPDATE: '/v1/users/settings/step1',
  GET_PREFECTURES: 'v1/areas',
  USER_SETTINGS: '/v1/users/settings',
  USER_FEATURES: '/v1/user_features',
  GAME_TITLES_ALL: '/v1/game_titles_all',
}
