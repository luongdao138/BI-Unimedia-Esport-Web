import { Mention, MentionsInput, OnChangeHandlerFunc } from 'react-mentions'

import { ChatSuggestionList } from '../types/chat.types'
import classNames from './mention.module.css'
let container

interface ComposerProps {
  renderSuggestion?: (
    suggestion: ChatSuggestionList,
    search: string,
    highlightedDisplay: React.ReactNode,
    index: number,
    focused: boolean
  ) => React.ReactNode
  onChange: OnChangeHandlerFunc
  placeholder: string
  msg?: string
  users: ChatSuggestionList[]
  onAdd?: (id: string | number, display: string) => void
  onKeyPress?: (e: React.KeyboardEvent<HTMLTextAreaElement> | React.KeyboardEvent<HTMLInputElement>) => void
}

const Composer: React.FC<ComposerProps> = ({ renderSuggestion, onChange, msg, placeholder, users, onAdd, onKeyPress }) => {
  return (
    <div>
      <div
        className="advanced"
        id="advanced"
        style={{ height: 0, position: 'relative' }}
        ref={(el) => {
          container = el
        }}
      />
      <MentionsInput
        value={msg}
        spellCheck={false}
        suggestionsPortalHost={container}
        placeholder={placeholder}
        onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement> | React.KeyboardEvent<HTMLInputElement>) => onKeyPress(e)}
        style={{
          suggestions: {
            position: 'absolute',
            left: 0,
            top: -20,
            right: 0,
          },
        }}
        classNames={classNames}
        onChange={onChange}
      >
        <Mention
          trigger="@"
          appendSpaceOnAdd
          onAdd={onAdd}
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
  )
}

Composer.defaultProps = {}

export default Composer
