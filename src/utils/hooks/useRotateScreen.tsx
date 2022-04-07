import { useState } from 'react'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

type IProps = { isLandscape: boolean }

export const useRotateScreen = (): IProps => {
  const [isLandscape, setIsLandscape] = useState(false)

  //detect auto rotate screen mobile
  const checkRotateScreenSP = (e) => {
    // console.log('🚀 ~ cle ~ window.---111 ', window.innerWidth, window.innerHeight)
    // console.log('🚀 ~ window.addEventListener ~ e.target.orientation', e.target.orientation)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (e.target.orientation == 90 || e.target.orientation == -90) {
      setIsLandscape(true)
    } else {
      setIsLandscape(false)
    }
  }

  const isOnDeviceSp = () => {
    const androidPl = /Android/i.test(window.navigator.userAgent)
    const iPhonePl = /iPhone/i.test(window.navigator.userAgent)
    const ipadPl = /ipad/i.test(window.navigator.userAgent)
    // console.log('🚀 ~ isOnDeviceSp ~ ipadPl', ipadPl)
    return androidPl || iPhonePl || ipadPl
  }

  useIsomorphicLayoutEffect(() => {
    // console.log('🚀 ~ useEffect ~ isOnDeviceSp()', isOnDeviceSp())

    // handle check rotate screen on sp
    if (isOnDeviceSp()) {
      window.addEventListener('orientationchange', checkRotateScreenSP)
      // console.log('🚀 ~  ~ window---000 ', window)
      // console.log('🚀 ~  ~ window---000', window.innerWidth, window.innerHeight)
      if (window.innerWidth > window.innerHeight) {
        setIsLandscape(true)
      } else {
        setIsLandscape(false)
      }
    } else {
      setIsLandscape(false)
    }

    window.addEventListener('orientationchange', checkRotateScreenSP)
    return () => window.removeEventListener('orientationchange', checkRotateScreenSP)
  }, [])

  return { isLandscape }
}
