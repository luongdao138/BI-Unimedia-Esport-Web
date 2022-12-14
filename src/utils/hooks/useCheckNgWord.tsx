import { useAppSelector } from '@store/hooks'
import { getNgWords, getVideoNgWords } from '@store/ngWords/selectors'
import _ from 'lodash'
import { ReactNode } from 'react'

const useCheckNgWord = (): {
  checkNgWord: (subject: string | string[]) => string[]
  checkNgWordFields: (fields: any) => string
  checkNgWordByField: (fields: any) => string[]
  checkVideoNgWord: (subject: string | string[]) => string[]
  checkVideoNgWordFields: (fields: any) => string
  checkVideoNgWordByField: (fields: any) => string[]
  getMessageWithoutNgWords: (chatMessContent: string) => ReactNode
} => {
  const ngWords = useAppSelector(getNgWords)
  const videoNgWords = useAppSelector(getVideoNgWords)

  const getNgWordRegex = () => {
    if (ngWords && ngWords.data) {
      const words = ngWords.data.map((ngWord) => ngWord.attributes.word)

      if (words.length === 0) return null

      const regexMetachars = /[(){[*+?.\\^$|]/g
      for (let i = 0; i < words.length; i++) {
        words[i] = words[i].replace(regexMetachars, '\\$&')
      }

      return new RegExp(words.join('|'), 'gi')
    }

    return null
  }

  const checkNgWord = (subject: string | string[]) => {
    if (subject === undefined || subject === null || subject.length === 0) return []

    let checkText = ''
    if (typeof subject == 'object') {
      checkText = subject.join(' ')
    } else {
      checkText = subject
    }

    const regex = getNgWordRegex()
    if (regex === null) return []

    return [...new Set(checkText.match(regex))] || []
  }

  const checkNgWordByField = (fields: any) => {
    if (fields === undefined || fields === null || fields.length === 0) return []
    const regex = getNgWordRegex()
    if (regex === null) return []

    return Object.keys(
      _.pickBy(fields, function (value) {
        return (_.isString(value) ? value.match(regex) : null) !== null
      })
    )
  }

  const checkNgWordFields = (fields: any) => {
    if (fields === undefined || fields === null || _.isEmpty(fields)) return undefined

    const regex = getNgWordRegex()
    if (regex === null) return undefined

    return _.findKey(fields, (value) => (_.isString(value) ? value.match(regex) : null))
  }

  const getVideoNgWordRegex = () => {
    if (videoNgWords && videoNgWords.data) {
      const words = videoNgWords.data.map((ngWord) => ngWord.attributes.word)

      if (words.length === 0) return null

      const regexMetaChars = /[(){[*+?.\\^$|]/g
      for (let i = 0; i < words.length; i++) {
        words[i] = words[i].replace(regexMetaChars, '\\$&')
      }

      return new RegExp(words.join('|'), 'gi')
    }

    return null
  }

  const checkVideoNgWord = (subject: string | string[]) => {
    if (subject === undefined || subject === null || subject.length === 0) return []

    let checkText = ''
    if (typeof subject == 'object') {
      checkText = subject.join(' ')
    } else {
      checkText = subject
    }

    const regex = getVideoNgWordRegex()
    if (regex === null) return []

    return [...new Set(checkText.match(regex))] || []
  }

  const checkVideoNgWordByField = (fields: any) => {
    if (fields === undefined || fields === null || fields.length === 0) return []
    const regex = getVideoNgWordRegex()
    if (regex === null) return []

    return Object.keys(
      _.pickBy(fields, function (value) {
        return (_.isString(value) ? value.match(regex) : null) !== null
      })
    )
  }

  const checkVideoNgWordFields = (fields: any) => {
    if (fields === undefined || fields === null || _.isEmpty(fields)) return undefined

    const regex = getVideoNgWordRegex()
    if (regex === null) return undefined

    return _.findKey(fields, (value) => (_.isString(value) ? value.match(regex) : null))
  }

  const getMessageWithoutNgWords = (chatMessContent) => {
    const allNgWords = checkVideoNgWord(chatMessContent)
    if (allNgWords.length !== 0) {
      allNgWords.map((item) => {
        if (chatMessContent.includes(item)) {
          const regex = new RegExp(item.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g')
          chatMessContent = chatMessContent.replace(regex, '*'.repeat(item.length))
        }
      })
    }
    return chatMessContent
  }

  return {
    checkNgWord,
    checkNgWordFields,
    checkNgWordByField,
    checkVideoNgWord,
    checkVideoNgWordFields,
    checkVideoNgWordByField,
    getMessageWithoutNgWords,
  }
}

export default useCheckNgWord
