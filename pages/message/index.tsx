import { useState } from 'react'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import Composer from '@components/Chat/Composer'
import { ChatSuggestionList } from '@components/Chat/types/chat.types'

const Message: PageWithLayoutType = () => {
  const [msg, setMsg] = useState('')

  const onChangeHandler = (value: string) => {
    setMsg(value)
  }

  const renderSuggestion = (
    suggestion: ChatSuggestionList,
    _search: string,
    _highlightedDisplay: React.ReactNode,
    index: number,
    _focused: boolean
  ) => {
    return (
      <div key={index}>
        <div>{suggestion.nickName}</div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '100%', marginTop: 100, padding: 20 }}>
      <Composer msg={msg} renderSuggestion={renderSuggestion} onChange={onChangeHandler} />
    </div>
  )
}

Message.Layout = MainLayout

export default Message
