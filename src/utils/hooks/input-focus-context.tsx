/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext, useState } from 'react'

interface IFocusContext {
  isFocused: boolean
  setIsFocused: (isFocused: boolean) => void
  focusEvent: {
    onFocus: () => void
    onBlur: () => void
  }
}

export const FocusContext = createContext<IFocusContext | undefined>({
  setIsFocused() {},
  focusEvent: { onFocus() {}, onBlur() {} },
  isFocused: false,
})

export const useFocusState = (): { onFocus: () => void; onBlur: () => void } => {
  const context = useContext(FocusContext)
  if (context === undefined) throw new Error('useFocusState must be in provider')
  return {
    onFocus: () => context.setIsFocused(true),
    onBlur: () => context.setIsFocused(false),
  }
}

export const FocusContextProvider: React.FC = ({ children }) => {
  const [isFocused, setIsFocused] = useState(false)
  const focusEvent = {
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
  }
  return <FocusContext.Provider value={{ isFocused, setIsFocused, focusEvent }}>{children}</FocusContext.Provider>
}
