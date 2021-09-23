import i18n from '@locales/i18n'
import { Dialog } from '@store/common/actions/types'

export const searchTypes = {
  USER: 1,
  COMMUNITY: 2,
  TOURNAMENT: 3,
  RECRUITMENT: 4,
  VIDEO: 5,
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
    name: '大会',
  },
  // {
  //   value: searchTypes.RECRUITMENT,
  //   name: 'ロビー',
  // },
  {
    value: searchTypes.VIDEO,
    name: '動画',
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

export const NG_WORD_DIALOG_CONFIG: Dialog = {
  title: 'NGワードの利用',
  message: i18n.t('common:dialog.ng_word_warning'),
  actionMsg: i18n.t('common:dialog.ng_word_area_label'),
  actions: [{ name: i18n.t('common:dialog.confirm'), action: 'confirm', type: 'primary' }],
}

export const NG_WORD_AREA = {
  chat_section: i18n.t('common:ng_word_area.chat_section'),
  room_name_title: i18n.t('common:ng_word_area.room_name_title'),
  register_by_email: i18n.t('common:register_by_email.email'),
  add_game: i18n.t('common:profile.favorite_game.title_label'),
  forgot_password: i18n.t('common:forgot_password.email'),
  profile_user_code: i18n.t('common:register_profile.user_id'),
  profile_nickname: i18n.t('common:register_profile.nickname'),
  inquiry_title: i18n.t('common:inquiry.subject'),
  inquiry_content: i18n.t('common:inquiry.desc'),
  inquiry_email: i18n.t('common:inquiry.email'),
  team_name: i18n.t('common:team_name'),
  join_nickname: i18n.t('common:tournament.join_nickname'),
  summary: i18n.t('common:arena.summary'),
}

export enum FOLLOW_STATES {
  FOLLOW = 1,
  UNFOLLOW = 0,
  FOLLOWED = 1,
  UNFOLLOWED = 0,
  FOLLOWING = 1,
  FOLLOWERS = 0,
}

export const FORMAT_DATE_TIME_JP = 'YYYY年MM月DD日 HH:mm'
export const FORMAT_SCHEDULE_TIME = 'YYYY年MM月DD日hh時mm分'
export const FORMAT_DATE_SIMPLE = 'YYYY年MM月DD日'
export const FORMAT_DATE_ARCHIVED = 'YYYY/MM/DD'
export const FORMAT_YEAR_MONTH = 'YYYY年MM月'

export const POINTS = [500, 1000, 2000, 3000, 5000, 10000]
export const TAX = 0.1

export const OTHER_CARD = 0
export const JCB_CARD = 1
export const MASTER_CARD = 2
export const VISA_CARD = 3
export const AMEX_CARD = 4

export const CARD_TYPES = [
  {
    value: 0,
    code: 'other',
    label: 'Other',
  },
  {
    value: 1,
    code: 'jcb',
    label: 'JCB',
  },
  {
    value: 2,
    code: 'master_card',
    label: 'Master',
  },
  {
    value: 3,
    code: 'visa',
    label: 'Visa',
  },
  {
    value: 4,
    code: 'amex',
    label: 'American Express',
  },
]

export const REGEX_DETECT_BRANCH = [
  { value: AMEX_CARD, branch: 'AMEX', regex: /^3[47][0-9]{13}$/ },
  { value: VISA_CARD, branch: 'VISA', regex: /^4[0-9]{12}(?:[0-9]{3})?$/ },
  { value: MASTER_CARD, branch: 'MASTER', regex: /^5[1-5][0-9]{14}$/ },
  { value: JCB_CARD, branch: 'JCB', regex: /^(?:2131|1800|35\d{3})\d{11}$/ },
]

export const TOKEN_ERROR = {
  '000': 'トークン取得正常終了',
  '100': 'カード番号必須チェックエラー',
  '101': 'カード番号フォーマットエラー(数字以外を含む)',
  '102': 'カード番号フォーマットエラー(10-16 桁の範囲外)',
  '110': '有効期限必須チェックエラー',
  '111': '有効期限フォーマットエラー(数字以外を含む)',
  '112': '有効期限フォーマットエラー(6 又は 4 桁以外)',
  '113': '有効期限フォーマットエラー(月が 13 以上)',
  '121': 'セキュリティコードフォーマットエラー(数字以外を含む)',
  '122': 'セキュリティコード桁数エラー',
  '131': '名義人フォーマットエラー(半角英数字、一部の記号以外を含む)',
  '132': '名義人フォーマットエラー(51 桁以上)',
  '141': '発行数フォーマットエラー(数字以外を含む)',
  '142': '発行数フォーマットエラー(1-10 の範囲外)',
  '150': 'カード情報を暗号化した情報必須チェックエラー',
  '160': 'ショップ ID 必須チェックエラー',
  '161': 'ショップ ID フォーマットエラー(14 桁以上)',
  '162': 'ショップ ID フォーマットエラー(半角英数字以外)',
  '170': '公開鍵ハッシュ値必須チェックエラー',
  '180': 'ショップ ID または公開鍵ハッシュ値がマスターに存在しない',
  '190': 'カード情報(Encrypted)が復号できない',
  '191': 'カード情報(Encrypted)復号化後フォーマットエラー',
  '501': 'トークン用パラメータ(id)が送信されていない',
  '502': 'トークン用パラメータ(id)がマスターに存在しない',
  '511': 'トークン用パラメータ(cardInfo)が送信されていない',
  '512': 'トークン用パラメータ(cardInfo)が復号できない',
  '521': 'トークン用パラメータ(key)が送信されていない',
  '522': 'トークン用パラメータ(key)が復号できない',
  '531': 'トークン用パラメータ(callBack)が送信されていない',
  '541': 'トークン用パラメータ(hash)が存在しない',
  '551': 'トークン用 apikey が存在しない ID',
  '552': 'トークン用 apikey が有効ではない',
  '901': 'マルチペイメント内部のシステムエラー',
  '902': '処理が混み合っている',
}

export const GMO_ERROR_CODE = {
  E92000001: '只今、大変混み合っています\n\nしばらくお時間を空けて、再度ご購入手続きをお願いいたします',
  E92000002: '只今、大変混み合っています\n\nしばらくお時間を空けて、再度ご購入手続きをお願いいたします',
  E01230009: 'カードの最大登録可能枚数を超えています\n\n登録中のカード情報を削除してから再度お試しください',
}
