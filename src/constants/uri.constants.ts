const DOMAIN = process.env.NEXT_PUBLIC_API

export const URI = {
  DOMAIN,
  LOGIN: '/v1/auth/login',
  LOGIN_SOCIAL: '/v2/signup/social',
  REGISTER: '/v1/signup/register',
  REGISTER_PROFILE: '/v1/users/settings/stepweb1',
  CONFIRM: '/v1/signup/confirm',
  FORGOT_PASSWORD: '/v1/passwords/forgot',
  FORGOT_CONFIRM: '/v1/passwords/confirm',
  RESET_PASSWORD: '/v1/passwords/reset',
  FOLLOWERS: '/v2/followers',
  NG_WORDS: '/v1/ng_words',
  USER_DETAIL_PROFILE: '/v2/users/profile',
  USERS_SEARCH: '/v2/users/search',
  FOLLOW: '/v1/followers/follow',
  UNFOLLOW: '/v1/followers/unfollow',
  TOURNAMENTS_SEARCH: '/v1/tournaments/search',
  RECOMMENDED_USERS: '/v1/recommended_users',
  TOURNAMENTS_HISTORY_SEARCH: '/v1/tournaments/history_search',
  PROFILE_ACTIVITY_LOG: '/v1/activity_logs',
}
