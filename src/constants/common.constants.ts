import i18n from '@locales/i18n'
import { Dialog } from '@store/common/actions/types'
import { ConfirmOptions } from '@components/Confirm/types'

export const debounceTime = 700
export const LIMIT_FINANCIAL_STATEMENT = 25
export const FINANCIAL_STATUS_TITLE = {
  CONFIRM: i18n.t('common:payment_information_screen.confirm_status_title'),
  SCHEDULE: i18n.t('common:payment_information_screen.schedule_status_title'),
}

export const searchTypes = {
  USER: 1,
  COMMUNITY: 2,
  TOURNAMENT: 3,
  LOBBY: 4,
  VIDEO: 5,
}

export const searchOptions = [
  {
    value: searchTypes.USER,
    name: i18n.t('common:search.nickname'),
  },
  {
    value: searchTypes.TOURNAMENT,
    name: i18n.t('common:search.arena'),
  },
  {
    value: searchTypes.LOBBY,
    name: i18n.t('common:search.lobby'),
  },
  {
    value: searchTypes.COMMUNITY,
    name: i18n.t('common:search.community'),
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
  LOBBY_RECOMMENDED: '2',
  // RECOMMENDED_EVENT: '3', //TODO skip 2.0
  LOBBY_FOLLOW: '4',
  TOURNAMENT_FOLLOW: '5',
  TOURNAMENT_RESULT: '6',
  TOPIC_FOLLOW: '7',
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
  LOBBY = 5,
  TOURNAMENT = 6,
  VIDEO_STREAM = 7,
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
  comment_section: i18n.t('common:ng_word_area.comment_section'),
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

export const defaultConfirmationOptions: ConfirmOptions = {
  confirmationButtonProps: {
    round: true,
    fullWidth: true,
  },
  cancellationButtonProps: {
    variant: 'outlined',
    round: true,
    fullWidth: true,
    size: 'large',
  },
  dialogProps: {
    maxWidth: 'md',
    BackdropProps: {
      onTouchMove: (e: React.TouchEvent<HTMLDivElement>): void => {
        e.preventDefault()
      },
      onTouchStart: (e: React.TouchEvent<HTMLDivElement>): void => {
        e.preventDefault()
      },
      onTouchEnd: (e: React.TouchEvent<HTMLDivElement>): void => {
        e.preventDefault()
      },
    },
  },
}

export const AVATAR_PATH = '/images/avatar_o.png'
export const FORMAT_DATE_TIME_JP = 'YYYY年MM月DD日 HH:mm'
export const FORMAT_FULL_DATE_TIME = 'YYYY/MM/DD HH:mm:ss'
export const FORMAT_SCHEDULE_TIME = 'YYYY年MM月DD日HH時mm分'
export const FORMAT_DATE_SIMPLE = 'YYYY年MM月DD日'
export const FORMAT_DATE_ARCHIVED = 'YYYY/MM/DD'
export const FORMAT_YEAR_MONTH = 'YYYY年MM月'
export const FORMAT_YEAR_MONTH_FILTER = 'YYYY/MM'
export const FORMAT_TIME_SIMPLE = 'HH時mm分'
export const FORMAT_TIME_SAFARI = 'YYYY-MM'

export const POINTS = [100, 300, 500, 1000, 2000, 3000, 5000, 10000]
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

export const EVENT_LIVE_STATUS = {
  STREAM_END: 'STREAM_END',
  STREAM_FAILURE: 'STREAM_FAILURE',
  STARVATION_START: 'STARVATION_START',
  STARVATION_END: 'STARVATION_END',
  INGEST_BITRATE: 'INGEST_BITRATE',
  INGEST_RESOLUTION: 'INGEST_RESOLUTION',
  CONCURRENT_BROADCASTS: 'CONCURRENT_BROADCASTS',
  CONCURRENT_VIEWERS: 'CONCURRENT_VIEWERS',
  RECORDING_START: 'RECORDING_START',
  RECORDING_END: 'RECORDING_END',
  RECORDING_START_FAILURE: 'RECORDING_START_FAILURE',
  RECORDING_END_FAILURE: 'RECORDING_END_FAILURE',
  RECORDING_ARCHIVED: 'RECORDING_ARCHIVED',
  STREAM_START: 'STREAM_START',
  STREAM_OFF: 'STREAM_OFF',
}

export const STATUS_SEND_MESS = {
  PENDING: 1,
  LOADED: 2,
  ERROR_SEND: 3,
  ERROR_DELETE: 4,
}

export const LIVE_VIDEO_TYPE = {
  LIVE: 0,
  SCHEDULE: 1,
}

export const DELAY_SECONDS = 8

export const EVENT_STATE_CHANNEL = {
  CREATING: 'CREATING',
  CREATE_FAILED: 'CREATE_FAILED',
  IDLE: 'IDLE',
  STARTING: 'STARTING',
  RUNNING: 'RUNNING',
  RECOVERING: 'RECOVERING',
  STOPPING: 'STOPPING',
  STOPPED: 'STOPPED',
  DELETING: 'DELETING',
  DELETED: 'DELETED',
  UPDATED: 'UPDATED',
  SET: 'SET',
}

export const CONFIRM_SETTING_DELAY = 20 * 1000

export const INQUIRY_REQUEST_LABELS = [
  'inquiry.label_about_arena',
  'inquiry.label_about_lobby',
  'inquiry.label_about_community',
  'inquiry.label_about_watching_video',
  'inquiry.label_about_deletion',
  'inquiry.label_others',
]
export const LIMIT_MESS = 100
export const LIMIT_FETCH_NEXT = 500
export const LIMIT_MIN_MESS_PREV_REWIND = 5
export const LIMIT_MAX_MESS_PREV_REWIND = 10
// number of seconds repeat auto get mess
export const INTERVAL_AUTO_GET_MESS = 60
export const SECOND_AUTO_GET_MESS_BEFORE = 10
export const VIDEO_NORMAL_VIEW_MODE = 'NORMAL'
export const VIDEO_THEATRE_VIEW_MODE = 'THEATRE'

export const VIDEO_TABS = {
  CHAT: 0,
  RANKING: 1,
  PROGRAM_INFO: 2,
}

export const VIDEO_INFO_TABS = {
  PROGRAM_INFO: 2,
  DISTRIBUTOR_INFO: 3,
  RELATED_VIDEOS: 4,
}

export const SUB_TABS = {
  MESS: {
    ALL: 3,
    TIP: 4,
  },
  RANKING: {
    SEND: 5,
    RECEIPT: 6,
  },
}

export const GIVER_RANK_TYPE = 'GIVER'
export const RECEIVER_RANK_TYPE = 'RECEIVER'
