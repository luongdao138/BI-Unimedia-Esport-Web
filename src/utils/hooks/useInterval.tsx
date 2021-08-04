import React from 'react'

type CallBackType = () => void

const useInterval = (callback: CallBackType, delay: number): void => {
  const savedCallback = React.useRef<CallBackType>()
  // Remember the latest callback.
  React.useEffect(() => {
    savedCallback.current = callback
  }, [callback])
  // Set up the interval.
  React.useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      // eslint-disable-next-line no-console
      console.log('create interval ', id)

      return () => {
        // eslint-disable-next-line no-console
        console.log('clearing interval ', id)
        clearInterval(id)
      }
    }
  }, [delay])
}

export default useInterval
