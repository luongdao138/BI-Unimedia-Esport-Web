import { StoreType } from '@store/store'

/* eslint-disable no-useless-escape */
const validateEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}
export const genRanHex = (size) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')

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

export const CommonHelper = {
  validateEmail,
  genRanHex,
  scorePassword,
  userCodeValid,
  matchNgWords,
}
