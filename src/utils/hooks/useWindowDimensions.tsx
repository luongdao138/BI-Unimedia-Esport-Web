import { useState, useEffect } from 'react'

function getWindowDimensions(marginH: number, marginV: number) {
  const width = window.innerWidth - marginH
  const height = window.innerHeight - marginV
  return {
    width,
    height,
  }
}

type DimensionsResult = {
  width: number
  height: number
}

export const useWindowDimensions = (marginH = 0, marginV = 0): DimensionsResult => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions(marginH, marginV))

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions(marginH, marginV))
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}
