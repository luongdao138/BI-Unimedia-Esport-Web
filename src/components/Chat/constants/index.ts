/* eslint-disable no-useless-escape */
export const mentionData = {
  toall: {
    nickName: 'all',
    userId: '-1',
    memberStatus: 1,
    userCode: 'all',
  },
}

export const regex = {
  url: /(https?:\/\/|www\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.(xn--)?[a-z0-9-]{2,20}\b([-a-zA-Z0-9@:%_\+\[\],.~#?&\/=]*[-a-zA-Z0-9@:%_\+\]~#?&\/=])*/gi,
  mention: /((.)\[to=([^[]*)])/gi,
}
