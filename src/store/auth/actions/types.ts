export enum AUTH_ACTION_TYPE {
  LOGIN_BY_EMAIL = 'auth/loginByEmail',
  LOGIN_SOCIAL = 'auth/loginSocial',
  REGISTER_BY_EMAIL = 'auth/registerByEmail',
  REGISTER_CONFIRM = 'auth/registerConfirm',
  SIGNUP_RESEND = 'auth/signUpResend',
  FORGOT_RESEND = 'auth/forgotResend',
  FORGOT_PASSWORD = 'auth/forgotPassword',
  FORGOT_CONFIRM = 'auth/forgotConfirm',
  RESET_PASSWORD = 'auth/resetPassword',
  REGISTER_PROFILE = 'auth/registerProfile',
  LOGOUT = 'auth/logout',
  PRE_LOGIN_ACTION = 'auth/preLogin',
}
