import React, { useLayoutEffect, useCallback, useState } from 'react'

type RectResult = {
  bottom: number
  height: number
  left: number
  right: number
  top: number
  width: number
}

export interface ResizeObserver {
  observe(target: Element): void
  unobserve(target: Element): void
  disconnect(): void
}

export const useRect = (ref: React.RefObject<any>): RectResult => {
  const [rect, setRect] = useState(getRect(ref ? ref.current : null))

  const handleResize = useCallback(() => {
    if (!ref.current) {
      return
    }

    // Update client rect
    setRect(getRect(ref.current))
  }, [ref])

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) {
      return
    }

    handleResize()

    if (typeof ResizeObserver === 'function') {
      let resizeOb = new ResizeObserver(() => handleResize())
      resizeOb.observe(element)

      return () => {
        if (!resizeOb) {
          return
        }

        resizeOb.disconnect()
        resizeOb = null
      }
    } else {
      // Browser support, remove freely
      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [ref.current])

  return rect
}

function getRect(element) {
  if (!element) {
    return {
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
    }
  }

  return element.getBoundingClientRect()
}
