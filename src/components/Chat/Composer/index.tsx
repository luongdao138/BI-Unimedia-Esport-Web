import { Mention, MentionsInput } from 'react-mentions'

import defaultStyle from './defaultStyle'
import defaultMentionStyle from './defaultMentionStyle'
import { ChatSuggestionList } from '../types/chat.types'

const users: ChatSuggestionList[] = [
  {
    userId: 111,
    display: '@Walter White',
    nickName: 'Walter White',
    profile: '',
    id: '111',
  },
  {
    userId: 321,
    display: '@Jesse Pinkman',
    nickName: 'Jesse Pinkman',
    profile: '',
    id: '233',
  },
  {
    userId: 321,
    display: '@Gustavo "Gus" Fring',
    nickName: 'Gustavo "Gus" Fring',
    profile: '',
    id: '321',
  },
  {
    userId: 111,
    display: '@Saul Goodman',
    nickName: 'Saul Goodman',
    profile: '',
    id: '111',
  },
]

interface ComposerProps {
  renderSuggestion?: (
    suggestion: ChatSuggestionList,
    search: string,
    highlightedDisplay: React.ReactNode,
    index: number,
    focused: boolean
  ) => React.ReactNode
  onChange: (value: string) => void
  msg?: string
}

const Composer: React.FC<ComposerProps> = ({ renderSuggestion, onChange, msg }) => {
  const style = Object.assign({}, defaultStyle, {
    input: {
      overflow: 'auto',
      height: 70,
    },
    highlighter: {
      boxSizing: 'border-box',
      overflow: 'hidden',
      height: 70,
    },
  })

  return (
    <>
      <div className="advanced">
        <MentionsInput
          value={msg}
          style={style}
          onChange={({ target: { value } }) => {
            onChange(value)
          }}
        >
          <Mention
            style={defaultMentionStyle}
            trigger="@"
            data={users}
            markup="@[to=__id__]"
            renderSuggestion={renderSuggestion}
            displayTransform={(id: string, display: string) => {
              if (id.toString() === display.toString()) {
                return users.find((x) => x.id === id).display
              } else return display
            }}
          />
        </MentionsInput>
      </div>
    </>
  )
}

Composer.defaultProps = {}

export default Composer
