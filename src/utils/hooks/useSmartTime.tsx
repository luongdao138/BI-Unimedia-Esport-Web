import { useState, useEffect } from 'react'
import moment from 'moment'

const useSmartTime = (data: string | number) => {
  const [time, setTime] = useState<string>('')
  useEffect(() => {
    if (data) {
      const timestamp = data // Unix time is seconds from epoch. What you're passing is milliseconds from epoch. Divide the value by 1000, before passing it to the method:
      const currentDate = moment().startOf('day')
      const given = moment(timestamp).format('YYYY-MM-DD')
      const diff = currentDate.diff(given, 'days', false)
      if (diff > 30) {
        setTime(moment(timestamp).format('LL'))
      } else {
        setTime(moment(timestamp).fromNow())
      }
    }
  }, [data])

  return time
}

export default useSmartTime
