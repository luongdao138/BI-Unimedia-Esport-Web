import { useEffect, useRef } from 'react'

const useUnload = (fn: (e: Event) => void, isChanged: boolean): void => {
  const cb = useRef(fn)

  useEffect(() => {
    const onUnload = cb.current
    if (isChanged) {
      window.addEventListener('beforeunload', onUnload, { capture: true })
    }
    return () => {
      window.removeEventListener('beforeunload', onUnload, { capture: true })
    }
  }, [cb, isChanged])
}

export default useUnload
