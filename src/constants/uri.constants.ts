const DOMAIN = process.env.NEXT_PUBLIC_API

export const URI = {
  DOMAIN,
  LOGIN: '/v2/auth/login',
  REFRESH: '/v2/auth/refresh_token',
  LOGIN_SOCIAL: '/v2/signup/social',
  REGISTER: '/v2/signup/register',
  REGISTER_PROFILE: '/v2/users/settings/stepweb1',
  CONFIRM: '/v2/signup/confirm',
  SIGNUP_RESEND: '/v2/signup/register/resend_code',
  FORGOT_RESEND: '/v2/signup/reset_password/resend_code',
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
  NG_WORDS: '/v2/ng_words',
  GET_PREFECTURES: '/v2/areas',
  USER_SETTINGS: '/v2/users/settings',
  USER_FEATURES: '/v2/user_features',
  GAME_TITLES_ALL: '/v2/game_titles_all',
  GAME_GENRES: '/v2/game_genres',
  GAME_TITLES: '/v2/game_titles',
  USER_DETAIL_PROFILE: '/v2/users/profile',
  USER_PROFILE_IMAGE: '/v2/profile_images/user_images',
  USERS_SEARCH: '/v2/users/search',
  FOLLOW: '/v2/followers/follow',
  UNFOLLOW: '/v2/followers/unfollow',
  USER_SECURITY_SETTINGS: '/v2/users/security/setting',
  INQUIRY: '/v2/users/inquiries',
  COMMUNITY_LIST_PUBLIC: '/v2/communities/public_list',
  COMMUNITY_LIST_PRIVATE: '/v2/communities/list',
  COMMUNITY_LIST_BY_USER: '/v2/communities/by_user',
  COMMUNITY_DETAIL: '/v2/communities/:id/details',
  COMMUNITY_CREATE: '/v2/communities',
  COMMUNITY_UPDATE: '/v2/communities/:id',
  COMMUNITY_FEATURES: '/v2/communities/features',
  COMMUNITY_FOLLOW: '/v2/communities/:id/join',
  COMMUNITY_UNFOLLOW: '/v2/communities/:id/leave',
  COMMUNITY_MEMBERS: '/v2/communities/:id/members',
  COMMUNITY_MEMBER_CHANGE_ROLE: '/v2/communities/:id/change_role',
  COMMUNITY_CLOSE: '/v2/communities/:id/close',
  COMMUNITY_COMMENTS_LIST: '/v2/comments/list',
  COMMUNITY_SEARCH: '/v2/communities/search',
  TOPIC_LIST: '/v2/communities/topics',
  TOPIC_COMMENT_CREATE: '/v2/comments',
  TOPIC_COMMENT_DETAILS: '/v2/comments/:id/details',
  TOPIC_COMMENT_DELETE: '/v2/comments/:id',
  TOPIC_SEARCH: '/v2/topics/search',
  TOURNAMENTS_SEARCH: '/v2/tournaments/search',
  TOURNAMENTS_MEMBERS: '/v2/tournaments/:id/participants',
  BATTLE_ROYALE_MEMBERS: '/v2/tournaments/:id/br_participants',
  SUGGESTED_TEAM_MEMBERS: '/v2/tournaments/team_recommended',
  TOURNAMENTS_INTERESTEDS: '/v2/tournaments/:id/interested',
  TOURNAMENTS_MATCHES: '/v2/tournaments/matches/:id',
  TOURNAMENTS_SET_PARTICIPANT: '/v2/tournaments/:id/set_participant',
  TOURNAMENTS_WINNERS: '/v2/tournaments/:id/winners',
  TOURNAMENTS_SET_SCORE: '/v2/tournaments/:id/set_score',
  TOURNAMENT_PARTICIPANT_NAME: '/v2/tournaments/:id/participant_name',
  TOURNAMENT_TEAMS: '/v2/tournament_teams/:id',
  BATTLE_ROYALE_SET_SCORES: '/v2/tournaments/:id/set_scores',
  BATTLE_ROYALE_SET_OWN_SCORE: '/v2/tournaments/:id/set_my_score',
  JOIN_TOURNAMENT: '/v2/tournaments/:id/join',
  LEAVE_TOURNAMENT: '/v2/tournaments/:id/leave',
  CLOSE_TOURNAMENT: '/v2/tournaments/:id/close_recruitment',
  CANCEL_TOURNAMENT: '/v2/tournaments/:id/cancel',
  SUMMARY_TOURNAMENT: '/v2/tournaments/:id/summary',
  CHECK_ENTRY_STATUS: '/v2/tournaments/:id/check_entry_status',
  TOURNAMENT_DETAIL: '/v2/tournaments/details/:id',
  TOURNAMENTS_PARTICIPANTS: 'v1/tournaments/:id/participants',
  TOURNAMENTS_RANDOMIZE_PARTICIPANTS: '/v2/tournaments/:id/randomize_participants',
  TOURNAMENTS_FREEZE_PARTICIPANTS: '/v2/tournaments/:id/freeze_participants',
  ARENA_SET_PARTICIPANTS: 'v2/tournaments/:id/set_participants',
  TOURNAMENTS_HISTORY_SEARCH: '/v2/tournaments/history_search',
  TOPICS_FOLLOWERS: '/v2/users/followings_topic',
  TOPICS: '/v2/topics/:id',
  TOPICS_DETAILS: '/v2/topics/details',
  TOPIC_CREATE: '/v2/topic/create',
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
  LOBBY_PRESIGNED_URL: '/v2/recruitments/presigned_url',
  AVATAR_PRESIGNED_URL: '/v2/avatar_presigned_url',
  COVER_PRESIGNED_URL: '/v2/cover_presigned_url',
  LOGOUT: '/v2/auth/logout',
  USER_RECOMMENDED_EVENT: '/v2/users/recommended_events', //TODO skip 2.0
  TOURNAMENT_FOLLOWERS: '/v2/users/followings_tournament',
  TOURNAMENT_RESULTS: '/v2/users/followings_tournament_result',
  RECRUITMENT_FOLLOWERS: '/v2/users/followings_recruitment', //TODO skip 2.0
  RECRUITING_TOURNAMENT: '/v2/tournaments/public_recruiting',
  GAME_HARDWARES: '/v2/game_hardwares',
  TOURNAMENTS_USERS: '/v2/tournaments/users',
  TOURNAMENTS_CREATE: '/v2/tournaments',
  TOURNAMENTS_UPDATE: '/v2/tournaments/:id',
  HOME_SETTINGS: '/v2/users/home_settings',
  USER_CHANGE_PASSWORD: '/v2/users/change_password',
  USER_EMAIL_CHANGE_CHECK: '/v2/email/check',
  USER_EMAIL_CHANGE: '/v2/email/change',
  USER_EMAIL_CHANGE_CONFIRM: '/v2/email/change_confirm',
  FRIEND_LIST: '/v2/chats/addable_users',
  DIRECT_ROOM: '/v2/chats/get_direct_room',
  WEB_SUPPORT: 'https://support.exelab.jp',
  ZENDESK_SUPPORT: 'https://support.exelab.jp/hc/ja',
  CHECK_DIRECT: '/v2/chats/user_and_chat_room',
  PURCHASE_HISTORY: '/v2/purchases/histories',
  PURCHASE_HISTORY_DETAIL: '/v2/purchases/:id/details',
  MESSAGE_TOURNAMENT_ID: '/v2/tournaments',
  MESSAGE_LOBBY_ID: '/v2/recruitments',
  PURCHASE_CANCEL: '/v1/purchases/:id/cancel',
  PR_TOP: '/v1/live_events/pr',
  LIVE_EVENTS_TOP: '/v1/live_events/top',
  LIVE_EVENTS_TICKET_PURCHASE_URI: '/v1/purchases',
  LIVE_EVENT_PURCHASE_GMO_CALLBACK: '/v1/purchases/gmo_response_handle',
  LIVE_EVENT_ARCHIVE_PLAY: '/v1/live_events/archive_view_count',
  IMAGE_REMOVE: '/v2/profile_images/remove',
  // Lobby
  LOBBY_ENTRY: '/v2/recruitments/:hash_key/do_entry',
  LOBBY_CANCEL: '/v2/recruitments/:hash_key/cancel',
  LOBBY_UNJOIN: '/v2/recruitments/:hash_key/unjoin',
  LOBBY_SEARCH: '/v2/recruitments/search',
  LOBBY_PARTICIPANTS: '/v2/recruitments/:hash_key/participants',
  LOBBY_ALL_PARTICIPANTS: '/v2/recruitments/:hash_key/all_participants',
  LOBBY_CREATE: '/v2/recruitments',
  LOBBY_UPDATE: '/v2/recruitments/:hash_key',
  LOBBY_CATEGORIES: '/v2/recruitment_categories',
  LOBBY_DETAIL: '/v2/recruitments/:hash_key/details',
  LOBBY_RANDOMIZE_PARTICIPANTS: '/v2/recruitments/:hash_key/randomize_participants',
  LOBBY_CONFIRM_PARTICIPANTS: '/v2/recruitments/:hash_key/do_member_confirm',
  LOBBY_RECENTS: '/v2/recruitments/recent',
  //live stream management
  LIVE_SETTING: '/v2/live/setting',
  SET_LIVE_SETTING: '/v2/live/setting',
  S3_THUMBNAIL_PRESIGNED_URL: '/v2/s3/url_video_image',
  STREAM_URL_AND_KEY: '/v2/live/renew-stream-secret',
  GET_CATEGORY: '/v2/categories',
  GET_CHANNEL: '/v2/channels',
  SET_CHANNEL: '/v2/channels',
  //video top
  GET_LIST_VIDEO_TOP: '/v2/videos/top',
  GET_CATEGORY_POPULAR_VIDEO: '/v2/categories/hot',
  GET_BANNER: '/v2/videos/top/banners',
  GET_VIDEO_FAVORITE: '/v2/videos/follow',
  SEARCH_VIDEO: '/v2/videos/search',
  VIDEO_DETAIL: '/v2/video_info',
  //purchase points
  GET_LIST_CARDS: 'v2/gmo/list_card',
  DELETE_CARD: '/v2/gmo/delete_card',
  ADD_CARD: '/v2/gmo/add_card',
  PURCHASE_POINT: '/v2/gmo/purchase',
  GET_LIST_MY_POINTS: '/v2/points',
  GET_HISTORY_POINTS: '/v2/points/history',
  GET_LIST_USED_POINTS: '/v2/points/history',
  GET_USAGE_POINTS_DETAIL: '/v2/points/detail',
  PURCHASE_TICKET_SUPER_CHAT: '/v2/purchase/use_points',
  VIDEOS: '/v2/videos/',
  FOLLOW_CHANNEL: '/v2/channels/follow',
  LOBBY_RECOMMENDED: '/v2/recruitments/recommendations',
}
