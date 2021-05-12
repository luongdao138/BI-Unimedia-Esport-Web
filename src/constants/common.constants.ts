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
