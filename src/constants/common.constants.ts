import i18n from '@locales/i18n'

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
  // {
  //   value: searchTypes.COMMUNITY,
  //   name: 'コミュニティ',
  // },
  {
    value: searchTypes.TOURNAMENT,
    name: 'アリーナ',
  },
  // {
  //   value: searchTypes.RECRUITMENT,
  //   name: 'ロビー',
  // },
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
  RECOMMENDED_USER: '1',
  // RECOMMENDED_RECRUITMENT: '2', //TODO skip 2.0
  // RECOMMENDED_EVENT: '3', //TODO skip 2.0
  // RECRUITMENT_FOLLOW: '4', //TODO skip 2.0
  TOURNAMENT_FOLLOW: '5',
  TOURNAMENT_RESULT: '6',
  // TOPIC_FOLLOW: '7', //TODO skip 2.0
}

export enum TOURNAMENT_STATUS {
  READY = 1, //tournament created but not recruiting
  RECRUITING = 2, //RECRUIT -> burtgel
  RECRUITMENT_CLOSED = 3,
  READY_TO_START = 4, //recruitment finished but waiting for start
  IN_PROGRESS = 5, //started
  COMPLETED = 6, // finished
  CANCELLED = 7,
}

export enum TOURNAMENT_ROLE {
  ADMIN = 0,
  PARTICIPANT = 1,
  INTERESTED = 2,
  CO_ORGANIZER = 3,
}

export enum TOURNAMENT_RULE {
  SINGLE = 0,
  DOUBLE = 1,
  BATTLE_ROYAL = 2,
}

export enum REPORT_TYPE {
  USER_LIST = 0,
  COMMUNITY = 1,
  TOPIC = 2,
  CHAT = 3,
  TOPIC_COMMENT = 4,
  RECRUITMENT = 5,
  TOURNAMENT = 6,
}

export const CHAT_CONSTANTS = {
  MIN_COMPOSER_HEIGHT: 50,
  MAX_COMPOSER_HEIGHT: 150,
  DEFAULT_PLACEHOLDER: 'PlaceHolder',
  BUBBLE_DEFAULT_COLORS: {
    PRIMARY: '#FFFFF',
    SECONDARY: '#00000',
  },
}

export const SNS = 'SNSサインアップ済み'

export const LIGHTBOX_OPTIONS = {
  settings: {
    overlayColor: 'rgb(0, 0, 0, 0.8)',
  },
  buttons: {
    backgroundColor: 'transparent',
    showThumbnailsButton: false,
    showAutoplayButton: false,
    showDownloadButton: false,
    showNextButton: false,
    showPrevButton: false,
    showFullscreenButton: false,
  },
  thumbnails: {
    showThumbnails: false,
  },
}

export const SLIDE_LIMIT = 5


export const PAYMENT_STATUS = {
  PURCHASED: 1,
  CANCEL_REQUESTED: 3,
  CANCELLED: 4,
}

export const NG_WORD_DIALOG_CONFIG = {
  actionMsg: i18n.t('common:dialog.ng_word_warning'),
  actions: [{ name: i18n.t('common:dialog.confirm'), action: 'confirm', type: 'primary' }],
}
