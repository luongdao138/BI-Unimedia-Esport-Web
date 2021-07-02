import { useState, useEffect } from 'react'

const useDocTitle = (): { resetTitle: () => void; changeTitle: (s: string) => void } => {
  const [title, setTitle] = useState('')
  useEffect(() => {
    setTitle(document.title)
  }, [])

  const resetTitle = () => (document.title = title)
  const changeTitle = (value: string) => (document.title = value)

  return {
    resetTitle,
    changeTitle,
  }
}

export default useDocTitle
