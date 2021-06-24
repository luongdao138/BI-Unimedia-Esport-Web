import { useAppSelector } from '@store/hooks'
import { getNgWords } from '@store/ngWords/selectors'

const useCheckNgWord = (): ((text: string | string[]) => string[]) => {
  const ngWords = useAppSelector(getNgWords)
  const checkNgWord = (subject: string | string[]) => {
    if (subject !== undefined && subject !== null && subject.length > 0) {
      let checkText = ''
      if (typeof subject == 'object') {
        checkText = subject.join(' ')
      } else {
        checkText = subject
      }
      const words = ngWords.data.map(function (ngWord) {
        return ngWord.attributes.word
      })
      if (words.length > 0) {
        const regexMetachars = /[(){[*+?.\\^$|]/g
        for (let i = 0; i < words.length; i++) {
          words[i] = words[i].replace(regexMetachars, '\\$&')
        }
        const regex = new RegExp(words.join('|'), 'gi')
        return [...new Set(checkText.match(regex))] || []
      } else return []
    } else {
      return []
    }
  }

  return checkNgWord
}

export default useCheckNgWord
