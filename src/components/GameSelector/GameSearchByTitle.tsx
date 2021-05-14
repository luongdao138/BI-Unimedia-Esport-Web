import { ReactNode, useState } from 'react'
import Input from '@components/Input'
import useGameSearchByTitle from './useGameSearchByTitle'
import { Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    paddingRight: theme.spacing(5),
    paddingLeft: theme.spacing(5),
  },
  [theme.breakpoints.down('sm')]: {
    root: {
      paddingRight: theme.spacing(0),
      paddingLeft: theme.spacing(0),
    },
  },
  [theme.breakpoints.down('md')]: {
    root: {
      paddingRight: theme.spacing(0),
      paddingLeft: theme.spacing(0),
    },
  },
}))

const GameSearchByTitle: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const classes = useStyles()
  const [keyword, setKeyword] = useState('')
  const { getGameByTitle, meta } = useGameSearchByTitle()
  const handleChange = (e) => {
    setKeyword(e.target.value)
    getGameByTitle(e.target.value)
  }
  return (
    <Box pt={4} px={5} className={classes.root}>
      <Input value={keyword} onChange={handleChange} fullWidth />
      <Box pt={4} />
      {meta.loaded && !meta.pending && children}
    </Box>
  )
}

export default GameSearchByTitle
