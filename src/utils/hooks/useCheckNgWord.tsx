import { useAppSelector } from '@store/hooks'
import { getNgWords } from '@store/ngWords/selectors'
import _ from 'lodash'

const useCheckNgWord = (): {
  checkNgWord: (subject: string | string[]) => string[]
  checkNgWordFields: (fields: any) => string
  checkNgWordByField: (fields: any) => string[]
} => {
  const ngWords = useAppSelector(getNgWords)

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
        return value.match(regex) !== null
      })
    )
  }

  const checkNgWordFields = (fields: any) => {
    if (fields === undefined || fields === null || _.isEmpty(fields)) return undefined

    const regex = getNgWordRegex()
    if (regex === null) return undefined

    return _.findKey(fields, (value) => value.match(regex))
  }

  return {
    checkNgWord,
    checkNgWordFields,
    checkNgWordByField,
  }
}

export default useCheckNgWord
