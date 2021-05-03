const DOMAIN = process.env.NEXT_PUBLIC_API

export const URI = {
  DOMAIN,
  LOGIN: '/auth/login',
  REGISTER: '/signup/register',
  FORGOT_PASSWORD: '/passwords/forgot',
  FORGOT_CONFIRM: '/passwords/confirm',
  RESET_PASSWORD: '/passwords/reset',
}
