import { useEffect, useState } from 'react'

export const useResizeScreen = (): {
  isResizedScreen: boolean
  setIsResizedScreen: any
} => {
  const [isResizedScreen, setIsResizedScreen] = useState(false)

  useEffect(() => {
    function handleResize() {
      setIsResizedScreen(true)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { isResizedScreen, setIsResizedScreen }
}
