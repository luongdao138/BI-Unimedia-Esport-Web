import { useEffect, useRef } from 'react'

const useUnload = (isChanged: boolean, dep: boolean): void => {
  const cb = useRef((e) => {
    e.preventDefault()
    return (e.returnValue = '')
  })
  const onUnload = cb.current

  useEffect(() => {
    if (isChanged) {
      window.addEventListener('beforeunload', onUnload, { capture: true })
    }
    return () => {
      window.removeEventListener('beforeunload', onUnload, { capture: true })
    }
  }, [cb, isChanged])

  useEffect(() => {
    return () => {
      if (!dep) {
        window.removeEventListener('beforeunload', onUnload, { capture: true })
      }
    }
  }, [dep])
}

export default useUnload
