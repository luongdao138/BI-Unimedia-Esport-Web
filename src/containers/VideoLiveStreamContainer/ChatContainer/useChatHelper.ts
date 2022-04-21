import useCheckNgWord from '@utils/hooks/useCheckNgWord'

const useChatContainer = () => {
  const { checkVideoNgWord } = useCheckNgWord()
  const getMessageWithoutNgWords = (chatMessContent) => {
    const ngWords = checkVideoNgWord(chatMessContent)
    if (ngWords.length !== 0) {
      ngWords.map((item) => {
        if (chatMessContent.includes(item)) {
          const regex = new RegExp(item.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g')
          chatMessContent = chatMessContent.replace(regex, '*'.repeat(item.length))
        }
      })
    }
    return chatMessContent
  }

  return { getMessageWithoutNgWords }
}

export default useChatContainer
