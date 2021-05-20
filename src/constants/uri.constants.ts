const DOMAIN = process.env.NEXT_PUBLIC_API

export const URI = {
  DOMAIN,
  LOGIN: '/v2/auth/login',
  REFRESH: '/v2/auth/refresh_token',
  LOGIN_SOCIAL: '/v2/signup/social',
  REGISTER: '/v2/signup/register',
  REGISTER_PROFILE: '/v2/users/settings/stepweb1',
  CONFIRM: '/v2/signup/confirm',
  FORGOT_PASSWORD: '/v2/passwords/forgot',
  FORGOT_CONFIRM: '/v2/passwords/confirm',
  RESET_PASSWORD: '/v2/passwords/reset',
  PROFILE_UPDATE: '/v2/users/settings/step1',
  FOLLOWERS: '/v2/followers',
  FOLLOWING: '/v2/following',
  REPORT: '/v2/reports/create',
  REPORT_REASONS: '/v1/report_reasons',
  BLOCK: '/v2/blocks',
  UNBLOCK: '/v2/blocks/unblock',
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
  USER_SECURITY_SETTINGS: '/v1/users/security/setting',
  COMMUNITY_LIST: '/v1/communities/list',
  TOURNAMENTS_SEARCH: '/v2/tournaments/search',
  RECOMMENDED_USERS: '/v1/recommended_users',
  TOURNAMENTS_HISTORY_SEARCH: '/v1/tournaments/history_search',
  TOPICS_FOLLOWERS: '/v2/users/followings_topic',
  PROFILE_ACTIVITY_LOG: '/v1/activity_logs',
  NICKNAMES_2: '/v2/users/get_nicknames2',
  USER_RECOMMENDATIONS: '/v2/users/recommendations',
  RECRUITMENT_RECOMMENDATIONS: '/v2/recruitments/recommendations',
  GAME_UPDATE: '/v2/users/game_titles',
  NOTIFICATION_LIST: '/v2/notification/own',
  NOTIFICATION_BADGE: '/v2/notification/badge',
  NOTIFICATION_DETAIL: '/v2/notification/detail',
  S3_PRESIGNED_URL: '/v2/s3/presigned_url',
  LOGOUT: '/v2/auth/logout',
  USER_RECOMMENDED_EVENT: '/v2/users/recommended_events',
  TOURNAMENT_FOLLOWERS: '/v2/users/followings_recruitment',
  TOURNAMENT_RESULTS: '/v2/users/followings_tournament_result',
  RECRUITMENT_FOLLOWERS: '/v2/users/followings_recruitment',
  RECRUITING_TOURNAMENT: '/v2/tournaments/public_recruiting',
}
