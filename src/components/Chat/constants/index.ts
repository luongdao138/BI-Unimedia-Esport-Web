/* eslint-disable no-useless-escape */
export const mentionData = {
  toall: {
    nickName: 'all',
    userId: -1,
    memberStatus: 1,
    userCode: 'all',
    id: '-1',
    display: '@all',
  },
}

export const regex = {
  url: /(https?:\/\/|www\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.(xn--)?[a-z0-9-]{2,20}\b([-a-zA-Z0-9@:%_\+\[\],.~#?&\/=]*[-a-zA-Z0-9@:%_\+\]~#?&\/=])*/gi,
  mention: /((.)\[to=([^[]*)])/gi,
}

export enum ACTIONS {
  IMAGE_UPLOAD = 1,
}

export const TOOLBAR_ACTIONS = [
  {
    icon: 'fas fa-image',
    type: ACTIONS.IMAGE_UPLOAD,
  },
]

export enum MENU_ACTIONS {
  COPY_CONTENT = 1,
  REPLY_MSG = 2,
  REPORT_CHAT = 3,
  DELETE_MESSAGE = 4,
}
