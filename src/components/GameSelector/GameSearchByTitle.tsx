import { ReactNode, useState } from 'react'
import Input from '@components/Input'
import useGameSearchByTitle from './useGameSearchByTitle'
import { Box } from '@material-ui/core'

const GameSearchByTitle: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const [keyword, setKeyword] = useState('')
  const { getGameByTitle, meta } = useGameSearchByTitle()
  const handleChange = (e) => {
    setKeyword(e.target.value)
    getGameByTitle(e.target.value)
  }
  return (
    <Box pt={4} px={5}>
      <Input value={keyword} onChange={handleChange} fullWidth />
      <Box pt={4} />
      {meta.loaded && !meta.pending && children}
    </Box>
  )
}

export default GameSearchByTitle
