export enum COMMUNITY_ACTION_TYPE {
  GET_COMMUNITY_LIST = 'community/list',
  GET_COMMUNITY_LIST_BY_USER = 'community/list_by_user',
  GET_FOLLOWERS_TOPIC_LIST = 'community/topic_followers',
  CLEAR_COMMUNITY_LIST = 'community/clearList',
  CLEAR_COMMUNITY_LIST_BY_USER = 'community/clearListByUser',
  GET_COMMUNITY_DETAIL = 'community/detail',
  CREATE_COMMUNITY = 'community/create',
  UPDATE_COMMUNITY = 'community/update',
  GET_COMMUNITY_FEATURES = 'community/features',
  CREATE_TOPIC = 'topic/create',
  GET_TOPIC_DETAIL = 'topic/detail',
  DELETE_TOPIC = 'topic/delete',
  CLEAR_TOPIC_DETAIL = 'community/topic/clearDetail',
  CREATE_TOPIC_COMMENT = 'topic/comment/create',
  DELETE_TOPIC_COMMENT = 'topic/comment/delete',
  GET_COMMUNITY_MEMBERS = 'community/members',
  APPROVE_COMMUNITY_MEMBERS = 'community/members/approve',
  CANCEL_COMMUNITY_MEMBERS = 'community/members/cancel',
  CHANGE_COMMUNITY_MEMBER_ROLE = 'community/member/changeRole',
  REMOVE_COMMUNITY_MEMBER = 'community/member/remove',
  RESET_COMMUNITY_MEMBERS = 'community/resetMembers',
  GET_TOPIC_LIST = 'topic/list',
  FOLLOW_COMMUNITY = 'community/join',
  UNFOLLOW_COMMUNITY = 'community/leave',
}
