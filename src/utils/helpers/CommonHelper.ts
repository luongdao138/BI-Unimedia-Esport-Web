import { FORMAT_DATE_TIME_JP, FORMAT_SCHEDULE_TIME, TAX, REGEX_DETECT_BRANCH, FORMAT_YEAR_MONTH } from '@constants/common.constants'
import { StoreType } from '@store/store'
import moment from 'moment'
import * as mTimeZone from 'moment-timezone'

/* eslint-disable no-useless-escape */
const validateEmail = (email: string): boolean => {
  const emailValidationRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return emailValidationRegex.test(String(email).toLowerCase())
}

const validateImageUrl = (imageUrl: string): boolean => {
  const imageUrlRegex = /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpe?g|gif|png|bmp)$/i
  return imageUrlRegex.test(String(imageUrl))
}

const replaceSingleByteString = (value: string): string => {
  return value.replace(/[^A-Za-z0-9.!@#$%^&*()_+-=]/g, '')
}

const replaceWhiteSpace = (value: string): string => {
  return value.replace(/^\s+/g, '')
}

const formatCurrency = (value: string | number): string => {
  if (value !== undefined) {
    return value.toLocaleString('ja', { style: 'currency', currency: 'JPY' })
  } else {
    return <string>value
  }
}

export const genRanHex = (size: number): string => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')

const scorePassword = (pass: string): number => {
  const min = 8
  let score = 0
  if (!pass) return score

  if (pass.length < min) return 5 * pass.length

  // award every unique letter until 5 repetitions
  const letters = new Object()
  for (let i = 0; i < pass.length; i++) {
    letters[pass[i]] = (letters[pass[i]] || 0) + 1
    score += 5.0 / letters[pass[i]]
  }

  let variationCount = 0
  if (/\d/.test(pass)) {
    variationCount += 1
  } else {
    return 38
  }

  if (/[a-z]/.test(pass)) {
    variationCount += 1
  } else {
    return 38
  }

  if (/[A-Z]/.test(pass)) {
    variationCount += 1
  } else {
    return 38
  }

  // bonus points for mixing it up
  const variations = {
    nonWords: /\W/.test(pass),
  }

  for (const check in variations) {
    variationCount += variations[check] == true ? 1 : 0
  }

  score += (variationCount - 1) * 10

  return score
}

const userCodeValid = (value: string): boolean => {
  return /^([a-zA-Z0-9_-]+)$/.test(value)
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const matchNgWords = (store: StoreType, subject: string) => {
  if (subject !== undefined && subject !== null && subject.length > 0) {
    const { ngWords } = store.getState()
    const words = ngWords.words.data.map(function (ngWord) {
      return ngWord.attributes.word
    })
    if (words.length > 0) {
      const regexMetachars = /[(){[*+?.\\^$|]/g
      for (let i = 0; i < words.length; i++) {
        words[i] = words[i].replace(regexMetachars, '\\$&')
      }
      const regex = new RegExp(words.join('|'), 'gi')
      return [...new Set(subject.match(regex))] || []
    } else return []
  } else {
    return []
  }
}

const hasEmail = (email: string): boolean => {
  if (email == '' || email == undefined) {
    return false
  }
  const suffix = ['@line.me', '@facebook.com', '@privaterelay.appleid.com', '@twitter.com']
  for (let i = 0; i < suffix.length; i++) {
    if (email.endsWith(suffix[i]) == true) {
      return false
    }
  }
  return true
}

const isMediaURL = (str: string): boolean => {
  const domain = 'https://s3-ap-northeast-1.amazonaws.com/'
  const buckets = [
    'dev-esporst-chat-media',
    'stg-esporst-chat-media',
    'esporst-chat-media',
    'feature-esporst-chat-media',
    'cowell-dev-chat-media',
  ]
  if (str && str.startsWith(domain)) {
    for (let i = 0; i < buckets.length; i++) {
      const bucket = buckets[i]
      if (str.startsWith(domain + bucket)) {
        return true
      }
    }
  }
  return false
}

const staticSmartTime = (time: string | number): string => {
  const timestamp = time
  const currentDate = moment().startOf('day')
  const given = moment(timestamp).format('YYYY-MM-DD')
  const diff = currentDate.diff(given, 'days', false)
  if (diff > 30) {
    return moment(timestamp).format('LL')
  } else {
    return moment(timestamp).fromNow()
  }
}

const purchaseHistoryStaticSmartTime = (time: string | number): string => {
  return moment(time).format('YYYY/MM/DD')
}

const getIndicesOf = (searchStr: string, str: string, caseSensitive?: string): Array<number> => {
  const searchStrLen = searchStr.length
  if (searchStrLen == 0) {
    return []
  }
  let startIndex = 0
  let index = 0
  const indices = [] as number[]
  if (!caseSensitive) {
    str = str.toLowerCase()
    searchStr = searchStr.toLowerCase()
  }
  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
    indices.push(index)
    startIndex = index + searchStrLen
  }
  return indices
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cutLinksIntoPieces = (textMain: string) => {
  const urlRegex = /(\b(https?):\/\/[^\s]+)/gim
  const text = textMain.replace(urlRegex, (url) => `<a>${url}</a>`)
  const aTagBegins = getIndicesOf('<a>', text)
  const aTagEnds = getIndicesOf('</a>', text)
  const separations = [] as {
    text: string
    type: 'text' | 'link'
  }[]

  if (aTagBegins.length > 0) {
    separations.push({ text: text.slice(0, aTagBegins[0]), type: 'text' })
  } else {
    separations.push({ text: text.slice(0, aTagBegins[0]), type: 'text' })
    return separations
  }
  let spliceEnd = 0
  for (let i = 0; i < aTagBegins.length; i++) {
    if (aTagEnds.length > i) {
      spliceEnd = aTagEnds[i] + '</a>'.length
      const aTagged = text.slice(aTagBegins[i], spliceEnd)
      separations.push({
        text: aTagged.slice(3, aTagged.length - 4),
        type: 'link',
      })
      if (i + 1 < aTagBegins.length) {
        separations.push({
          text: text.slice(spliceEnd, aTagBegins[i + 1]),
          type: 'text',
        })
      }
    }
  }
  separations.push({ text: text.slice(spliceEnd), type: 'text' })
  return separations
}

export function getPriceWithTax(price: number, taxPercent: number): number {
  return Math.floor(price + price / taxPercent)
}

function isDoubleByte(str: string): boolean {
  if (!str) return false
  for (let i = 0, n = str.length; i < n; i++) {
    if (str.charCodeAt(i) > 255) {
      return true
    }
  }
  return false
}

const startOfNextDay = (): string => {
  return moment().add(1, 'days').startOf('day').toString()
}

const nearestFutureMinutes = (interval: number): string => {
  const currentDate = moment()

  if (currentDate.minute() % 5 === 0) {
    currentDate.add(5, 'minutes')
    return currentDate.second(0).toString()
  } else {
    currentDate.add(5, 'minutes')

    return currentDate
      .minute(Math.round(currentDate.minute() / interval) * interval)
      .second(0)
      .toString()
  }
}

const formatDateTime = (date: string): string => {
  const dateTime = moment(date).toString()
  // const dateResult = moment(dateTime).format(FORMAT_DATE_TIME_JP)
  return dateTime
}
const formatDateTimeJP = (date: string): string => {
  const dateResult = moment(date).format(FORMAT_DATE_TIME_JP)
  return dateResult
}
const formatDateYearMonth = (date: string): string => {
  const dateResult = moment(date).format(FORMAT_YEAR_MONTH)
  return dateResult
}

const formatTimeVideo = (date: string): string => {
  const dateTime = moment(date).format(FORMAT_SCHEDULE_TIME)
  return `${dateTime}～配信予定`
}

// calculate money with tax
export const calValueFromTax = (value: number): number => {
  return Math.round(value * (1 + TAX))
}

// format card number has space between each 4 number
export const formatCardNumber = (origin_card_number: string): string => {
  let card_number = origin_card_number.split(' ').join('')
  if (card_number.length > 0) {
    card_number = card_number.match(new RegExp('.{1,4}', 'g')).join(' ')
  }
  return card_number
}

// detect branches of cards
export const detectCardType = (cardNumber: string): number => {
  let cardType = 0
  REGEX_DETECT_BRANCH.forEach((element) => {
    if (element.regex.test(cardNumber.replace(/\s/g, ''))) {
      cardType = element.value
    }
  })
  return cardType
}

// convert color form hex to rgba format
export const hexToRgba = (hex: string, opacity: number): string => {
  if (!/^[#]*([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i.test(hex)) {
    return ''
  }
  hex = hex.replace('#', '')
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  const rgba = []
  rgba.push(parseInt(hex.slice(0, 2), 16))
  rgba.push(parseInt(hex.slice(2, 4), 16))
  rgba.push(parseInt(hex.slice(4, 6), 16))
  rgba.push(opacity)
  return 'rgb(' + rgba.toString() + ')'
}

export const getTimeZone = (): string => {
  return mTimeZone.tz.guess()
}

const regex = {
  url: /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi,
}

const linkifyString = (url = ''): string => {
  return '<a target="_blank" href="' + url + '" style="color:#FFF">' + url + '</a>'
}

const splitToLinkifyComponent = (text = '') => {
  const { url: linkifyRegex } = regex
  const urlFromText = text.match(linkifyRegex)
  if (!urlFromText || urlFromText.length === 0) {
    return [{ type: 'text', text }]
  }
  let _text = text
  const results = []
  urlFromText.forEach((url) => {
    const idx = _text.indexOf(url)
    results.push({ type: 'text', text: _text.slice(0, idx) })
    const pureText = _text.slice(0, idx)
    results.push({ type: 'link', text: url })
    _text = _text.slice(pureText.length + url.length)
  })
  if (_text.length) {
    results.push({ type: 'text', text: _text })
  }
  return results
}

const randomIntegerInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// detect scroll indicator text area
const hasScrollBar = (elem_id: string): boolean => {
  const elem = document.getElementById(elem_id)
  if (elem?.clientHeight < elem?.scrollHeight) {
    return true
  } else {
    false
  }
}

export const CommonHelper = {
  validateEmail,
  genRanHex,
  staticSmartTime,
  purchaseHistoryStaticSmartTime,
  scorePassword,
  userCodeValid,
  matchNgWords,
  formatCurrency,
  hasEmail,
  replaceSingleByteString,
  isMediaURL,
  cutLinksIntoPieces,
  getIndicesOf,
  replaceWhiteSpace,
  isDoubleByte,
  nearestFutureMinutes,
  startOfNextDay,
  formatDateTime,
  formatDateTimeJP,
  formatTimeVideo,
  validateImageUrl,
  linkifyString,
  splitToLinkifyComponent,
  randomIntegerInRange,
  formatDateYearMonth,
  hasScrollBar,
}
