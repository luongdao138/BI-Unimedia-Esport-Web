import { ReactNode, useState } from 'react'
import useGameSearchByTitle from './useGameSearchByTitle'
import { Box, makeStyles, withStyles } from '@material-ui/core'
import i18n from '@locales/i18n'
import Button from '@components/Button'
import { Colors } from '@theme/colors'
import ESLoader from '@components/Loader'
import ESFastInput from '@components/FastInput'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    paddingRight: theme.spacing(5),
    paddingLeft: theme.spacing(5),
  },
  searchBtn: {
    fontWeight: 400,
    height: 37.6,
    minWidth: 68,
    borderBottomLeftRadius: 'unset',
    borderTopLeftRadius: 'unset',
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

const SquareInput = withStyles({
  root: {
    borderTopRightRadius: 'unset',
    borderBottomRightRadius: 'unset',
    backgroundColor: Colors.black,
    marginLeft: 1,
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderWidth: 1,
      borderColor: Colors.white,
    },
    '& :-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 100px #000000 inset',
    },
  },
})(ESFastInput)

const GameSearchByTitle: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const classes = useStyles()
  const [keyword, setKeyword] = useState('')
  const { getGameByTitle, meta } = useGameSearchByTitle()
  const handleClick = () => {
    getGameByTitle(keyword)
  }
  return (
    <Box pt={4} px={5} className={classes.root}>
      <Box display="flex">
        <SquareInput
          value={keyword}
          placeholder={i18n.t('common:search_by_keyword')}
          onChange={(e) => setKeyword(e.target.value)}
          fullWidth
        />
        <Button onClick={handleClick} className={classes.searchBtn} variant="contained" color="primary">
          {i18n.t('common:search.search')}
        </Button>
      </Box>

      <Box pt={4} />
      {meta.pending && (
        <Box textAlign="center">
          <ESLoader />
        </Box>
      )}
      {meta.loaded && !meta.pending && children}
    </Box>
  )
}

export default GameSearchByTitle
