export enum NOTIFICATION_ACTION_TYPE {
  GET_NOTIFICATION_LIST = 'notification/list',
  GET_NOTIFICATION_BADGE_LIST = 'notification/badge_list',
  GET_NOTIFICATION_BADGE = 'notification/badge',
  GET_NOTIFICATION_DETAIL = 'notification/detail',
  CLEAR_NOTIFICATION = 'notification/clear',
  CLEAR_NOTIFICATION_BADGE = 'notification/clear_badge',
  SEEN_NOTIFICATION_BADGE = 'notification/seen_badge',
  CLEAR_NOTIFICATION_LIST = 'notification/clear_list',

  NOTIFICATION_TYPE_FOLLOW = 1,
  NOTIFICATION_TYPE_FOLLOW_ACTION_FOLLOW = 1,

  NOTIFICATION_TYPE_MESSAGE = 2,
  NOTIFICATION_TYPE_MESSAGE_ACTION_DM = 1,
  NOTIFICATION_TYPE_MESSAGE_ACTION_GROUP = 2,

  NOTIFICATION_TYPE_COMMENT = 3,
  NOTIFICATION_TYPE_COMMENT_ACTION_REPLY = 1,
  NOTIFICATION_TYPE_COMMENT_ACTION_CREATE = 2,

  NOTIFICATION_TYPE_COMMUNITY = 4,
  NOTIFICATION_TYPE_COMMUNITY_ACTION_REQUEST = 1,
  NOTIFICATION_TYPE_COMMUNITY_ACTION_APPROVED = 2,
  NOTIFICATION_TYPE_COMMUNITY_ACTION_DECLINE = 3,
  NOTIFICATION_TYPE_COMMUNITY_ACTION_ADDED_ADMIN = 4,
  NOTIFICATION_TYPE_COMMUNITY_ACTION_REMOVED_ADMIN = 5,

  NOTIFICATION_TYPE_TOURNAMENT = 5,
  NOTIFICATION_TYPE_TOURNAMENT_ACTION_SELECTED = 1,
  NOTIFICATION_TYPE_TOURNAMENT_ACTION_CANCELED = 2,
  NOTIFICATION_TYPE_TOURNAMENT_ACTION_START = 3,
  NOTIFICATION_TYPE_TOURNAMENT_ADDED_ADMIN = 4,
  NOTIFICATION_TYPE_TOURNAMENT_REMOVED_ADMIN = 5,

  NOTIFICATION_TYPE_RECRUITMENT = 6,
  NOTIFICATION_TYPE_RECRUITMENT_ACTION_SELECTED = 1,
  NOTIFICATION_TYPE_RECRUITMENT_ACTION_CANCELED = 2,
  NOTIFICATION_TYPE_RECRUITMENT_ACTION_NOT_SELECTED = 3,

  NOTIFICATION_TYPE_SYSTEM = 7,
  NOTIFICATION_TYPE_ADMIN = 8,
  NOTIFICATION_TYPE_SYSTEM_ACTION_MESSAGE = 1,
  NOTIFICATION_TYPE_ADMIN_ACTION_MESSAGE = 1,
}

export default NOTIFICATION_ACTION_TYPE
