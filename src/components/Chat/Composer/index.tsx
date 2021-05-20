import { Mention, MentionsInput } from 'react-mentions'

import { ChatSuggestionList } from '../types/chat.types'
import classNames from './mention.module.css'

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
  return (
    <>
      <div className="advanced">
        <MentionsInput
          value={msg}
          spellCheck={false}
          classNames={classNames}
          onChange={({ target: { value } }) => {
            onChange(value)
          }}
        >
          <Mention
            trigger="@"
            appendSpaceOnAdd
            data={users}
            className={classNames.mentions__mention}
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
