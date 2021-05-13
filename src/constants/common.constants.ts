export const GENDER = {
  MALE: 1,
  FEMALE: 2,
  OTHER: 3,
}

export const searchTypes = {
  USER: 1,
  COMMUNITY: 2,
  TOURNAMENT: 3,
  RECRUITMENT: 4,
}

export const searchOptions = [
  {
    value: searchTypes.USER,
    name: 'ニックネーム・ID',
  },
  {
    value: searchTypes.COMMUNITY,
    name: 'コミュニティ',
  },
  {
    value: searchTypes.TOURNAMENT,
    name: 'アリーナ',
  },
  {
    value: searchTypes.RECRUITMENT,
    name: 'ロビー',
  },
]

export const GENDER = {
  MALE: 1,
  FEMALE: 2,
  OTHER: 3,
}

export const ACTIVITY_ACTION_TYPE = {
  TOPIC_CREATE: 'topic_create',
  TOPIC_COMMENT: 'topic_comment',
  COMMUNITY_CREATE: 'community_create',
  COMMUNITY_JOIN: 'community_join',
  USER_FOLLOWS: 'user_follows',
  RECRUITMENT_CREATE: 'recruitment_create',
  RECRUITMENT_JOIN: 'recruitment_join',
  TOURNAMENT_CREATE: 'tournament_create',
  TOURNAMENT_JOIN: 'tournament_join',
}
