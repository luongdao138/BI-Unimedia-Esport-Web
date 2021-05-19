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

export const RESPONSE_STATUS = {
  SUCCESS: 200,
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
export const HOME_SETTINGS = {
  RECOMMENDED_USER: {
    id: '1',
    value: 'おすすめユーザー',
  },
  RECOMMENDED_RECRUITMENT: {
    id: '2',
    value: 'おすすめの募集',
  },
  RECOMMENDED_EVENT: {
    id: '3',
    value: 'イベント',
  },
  RECRUITMENT_FOLLOW: {
    id: '4',
    value: 'フォローしている人の募集',
  },
  TOURNAMENT_FOLLOW: {
    id: '5',
    value: 'フォローしている人がエントリーしている大会',
  },
  TOURNAMENT_RESULT: {
    id: '6',
    value: 'フォローしている人がエントリーしていた大会結果',
  },
  TOPIC_FOLLOW: {
    id: '7',
    value: 'フォローしている人の書き込みトピック',
  },
}
