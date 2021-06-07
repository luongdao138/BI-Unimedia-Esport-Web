const DOMAIN = process.env.NEXT_PUBLIC_API

export const URI = {
  DOMAIN,
  LOGIN: '/v2/auth/login',
  REFRESH: '/v2/auth/refresh_token',
  LOGIN_SOCIAL: '/v2/signup/social',
  REGISTER: '/v2/signup/register',
  REGISTER_PROFILE: '/v2/users/settings/stepweb1',
  CONFIRM: '/v2/signup/confirm',
  RESEND: '/v2/signup/resend_code',
  FORGOT_PASSWORD: '/v2/passwords/forgot',
  FORGOT_CONFIRM: '/v2/passwords/confirm',
  RESET_PASSWORD: '/v2/passwords/reset',
  PROFILE_UPDATE: '/v2/users/settings/step1',
  FOLLOWERS: '/v2/followers',
  FOLLOWING: '/v2/following',
  REPORT: '/v2/reports/create',
  REPORT_REASONS: '/v2/reports',
  BLOCK: '/v2/blocks',
  UNBLOCK: '/v2/blocks/unblock',
  BLOCKED_USERS: 'v2/blocks/users',
  NG_WORDS: '/v1/ng_words',
  GET_PREFECTURES: '/v2/areas',
  USER_SETTINGS: '/v2/users/settings',
  USER_FEATURES: '/v2/user_features',
  GAME_TITLES_ALL: '/v2/game_titles_all',
  GAME_GENRES: '/v1/game_genres',
  GAME_TITLES: '/v1/game_titles',
  USER_DETAIL_PROFILE: '/v2/users/profile',
  USER_PROFILE_IMAGE: '/v1/profile_images/user_images',
  USERS_SEARCH: '/v2/users/search',
  FOLLOW: '/v2/followers/follow',
  UNFOLLOW: '/v2/followers/unfollow',
  USER_SECURITY_SETTINGS: '/v2/users/security/setting',
  INQUIRY: '/v2/users/inquiries',
  COMMUNITY_LIST: '/v1/communities/list',
  TOURNAMENTS_SEARCH: '/v2/tournaments/search',
  RECOMMENDED_USERS: '/v1/recommended_users',
  TOURNAMENTS_MEMBERS: '/v2/tournaments/:id/participants',
  SUGGESTED_TEAM_MEMBERS: '/v2/tournaments/team_recommended',
  TOURNAMENTS_INTERESTEDS: '/v2/tournaments/:id/interested',
  TOURNAMENTS_MATCHES: '/v2/tournaments/matches/:id',
  TOURNAMENTS_SET_PARTICIPANT: '/v2/tournaments/:id/set_participant',
  TOURNAMENTS_WINNERS: '/web/v2/tournaments/:id/winners',
  TOURNAMENTS_SET_SCORE: '/v2/tournaments/:id/set_score',
  JOIN_TOURNAMENT: '/v2/tournaments/:id/join',
  LEAVE_TOURNAMENT: '/v2/tournaments/:id/leave',
  CLOSE_TOURNAMENT: '/v2/tournaments/:id/close_recruitment',
  SUMMARY_TOURNAMENT: '/v2/tournaments/:id/summary',
  CHECK_ENTRY_STATUS: '/v2/tournaments/:id/check_entry_status',
  TOURNAMENT_DETAIL: '/v2/tournaments/details/:id',
  TOURNAMENTS_PARTICIPANTS: 'v1/tournaments/:id/participants',
  TOURNAMENTS_RANDOMIZE_PARTICIPANTS: '/v2/tournaments/:id/randomize_participants',
  TOURNAMENTS_FREEZE_PARTICIPANTS: '/v2/tournaments/:id/freeze_participants',
  ARENA_SET_PARTICIPANTS: 'v2/tournaments/:id/set_participants',
  TOURNAMENTS_HISTORY_SEARCH: '/v2/tournaments/history_search',
  TOPICS_FOLLOWERS: '/v2/users/followings_topic', //TODO skip 2.0
  PROFILE_ACTIVITY_LOG: '/v2/activity_logs',
  NICKNAMES_2: '/v2/users/get_nicknames2',
  USER_RECOMMENDATIONS: '/v2/users/recommendations',
  RECRUITMENT_RECOMMENDATIONS: '/v2/recruitments/recommendations', //TODO skip 2.0
  GAME_UPDATE: '/v2/users/game_titles',
  NOTIFICATION_LIST: '/v2/notification/own',
  NOTIFICATION_BADGE_LIST: '/v2/notification/new',
  NOTIFICATION_BADGE: '/v2/notification/badge',
  NOTIFICATION_BADGE_SEEN: '/v2/notification/seen',
  NOTIFICATION_DETAIL: '/v2/notification/detail',
  NOTIFICATION_SETTINGS: '/v2/notification/settings',
  NOTIFICATION_UPDATE_SETTINGS: '/v2/notification/settings_update',
  S3_PRESIGNED_URL: '/v2/s3/presigned_url',
  LOGOUT: '/v2/auth/logout',
  USER_RECOMMENDED_EVENT: '/v2/users/recommended_events', //TODO skip 2.0
  TOURNAMENT_FOLLOWERS: '/v2/users/followings_tournament',
  TOURNAMENT_RESULTS: '/v2/users/followings_tournament_result',
  RECRUITMENT_FOLLOWERS: '/v2/users/followings_recruitment', //TODO skip 2.0
  RECRUITING_TOURNAMENT: '/v2/tournaments/public_recruiting',
  GAME_HARDWARES: '/v2/game_hardwares',
  TOURNAMENTS_USERS: '/v1/tournaments/users',
  TOURNAMENTS_CREATE: '/v2/tournaments',
  TOURNAMENTS_UPDATE: '/v2/tournaments/:id',
  HOME_SETTINGS: '/v2/users/home_settings',
  USER_CHANGE_PASSWORD: '/v1/users/change_password',
  USER_EMAIL_CHANGE_CHECK: '/v1/email/check',
  USER_EMAIL_CHANGE: '/v1/email/change',
  USER_EMAIL_CHANGE_CONFIRM: '/v1/email/change_confirm',
  FRIEND_LIST: '/v1/chats/addable_users',
  WEB_SUPPORT: 'https://support.exelab.jp',
}
