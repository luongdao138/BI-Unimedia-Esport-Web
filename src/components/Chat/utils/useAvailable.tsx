import { useState, useEffect } from 'react'
import { ChatSuggestionList } from '../types/chat.types'
import { Part } from '../types/mention.type'
import { isMentionPartType } from '.'

const useAvailable = (members: ChatSuggestionList[], parts: Part[]): string[] => {
  // const [available, setAvailable] = useState<ChatSuggestionList[]>([])
  const [selected, setSelected] = useState<string[]>([])

  const addToSelected = (parts: Part[]) => {
    const filter = parts
      .map((part: any) => {
        if (part.partType && isMentionPartType(part.partType)) {
          return part.data.userId
        }
      })
      .filter((i) => i)
    setSelected(filter)

    //     const filtered = members.filter((one) => {
    //       return !filter.includes(one.id)
    //     })

    //     setAvailable(filtered)
  }

  useEffect(() => {
    addToSelected(parts)
  }, [parts, members])

  return selected
}

export default useAvailable
