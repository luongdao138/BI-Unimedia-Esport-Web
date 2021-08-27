/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext, useEffect, useState } from 'react'

interface ICounterContext {
  increment: () => void
  decrement: () => void
}

export const CounterContext = createContext<ICounterContext | undefined>(undefined)

export const useCounterContext = (): ICounterContext => {
  const context = useContext(CounterContext)
  if (context === undefined) throw new Error('useFocusState must be in provider')
  return context
}

export const CounterContextProvider: React.FC = ({ children }) => {
  const [count, setCount] = useState(0)
  const increment = () => setCount((prev) => prev + 1)
  const decrement = () => setCount((prev) => prev - 1)
  useEffect(() => {
    const scrollY = document.body.style.top
    if (count) {
      document.body.style.width = '100%'
      document.body.style.height = '100%'
      document.body.style.position = 'fixed'
      document.body.style.top = `-${window.scrollY}px`
    } else {
      document.body.style.width = 'unset'
      document.body.style.height = 'unset'
      document.body.style.position = 'unset'
      document.body.style.top = 'unset'
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
    }
  }, [count])
  return <CounterContext.Provider value={{ increment, decrement }}>{children}</CounterContext.Provider>
}
