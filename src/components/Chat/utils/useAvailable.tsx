import { useState, useEffect } from 'react'
import { ChatSuggestionList } from '../types/chat.types'
import { Part } from '../types/mention.type'
import { isMentionPartType } from '.'

const useAvailable = (
  members: ChatSuggestionList[],
  parts: Part[],
  currentUserId: number
): { userData: ChatSuggestionList[]; selected: string[] } => {
  const [userData, setUserData] = useState<ChatSuggestionList[]>([])
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
  const filterPlainData = () => {
    if (currentUserId) {
      setUserData(
        members &&
          members
            .map((member) => {
              if (member?.userId != currentUserId) {
                return member
              }
            })
            .filter((i) => i)
      )
    }
  }

  useEffect(() => {
    addToSelected(parts)
  }, [parts, members])

  useEffect(() => {
    if (currentUserId) {
      filterPlainData()
    }
  }, [members, currentUserId])

  return { userData, selected }
}

export default useAvailable
