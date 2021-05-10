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
  USERS_SEARCH: '/v1/users/search',
}
