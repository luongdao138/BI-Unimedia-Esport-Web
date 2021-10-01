import i18n from '@locales/i18n'
import { Dialog } from '@store/common/actions/types'
import { ConfirmOptions } from '@components/Confirm/types'

export const searchTypes = {
  USER: 1,
  COMMUNITY: 2,
  TOURNAMENT: 3,
  LOBBY: 4,
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
