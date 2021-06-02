import { useEffect, useState } from 'react'
import UserSearchContainer from '@containers/Search/UserSearch'
import TournamentSearchContainer from '@containers/Search/TournamentSearch'
import { Grid, Box, makeStyles, Typography, IconButton, Icon } from '@material-ui/core'
import MainLayout from '@layouts/MainLayout'
import { searchTypes } from '@constants/common.constants'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { Colors } from '@theme/colors'
import PageWithLayoutType from '@constants/page'
import useSearch from '@containers/Search/useSearch'

const SearchPage: PageWithLayoutType = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const router = useRouter()
  const { searchType, searchKeyword } = useSearch()
  const [type, setType] = useState<number>(searchType)
  const [keyword, setKeyword] = useState<string>(searchKeyword)

  useEffect(() => {
    setType(searchType)
    setKeyword(searchKeyword)
  }, [searchType, searchKeyword])

  const renderSwitch = () => {
    switch (type) {
      case searchTypes.USER:
        return <UserSearchContainer />
      case searchTypes.TOURNAMENT:
        return <TournamentSearchContainer />
      default:
        return <></>
    }
  }

  const renderKeyword = () => {
    switch (type) {
      case searchTypes.USER:
        return t('common:user.user_results').replace(/:key/gi, keyword)
      case searchTypes.TOURNAMENT:
        return t('common:tournament.tournament_results').replace(/:key/gi, keyword)
      default:
        return <></>
    }
  }

  return (
    <Grid container className={classes.container}>
      <Box pb={3} display="flex" flexDirection="row" alignItems="center">
        <IconButton className={classes.iconButtonBg} onClick={() => router.back()}>
          <Icon className="fa fa-arrow-left" fontSize="small" />
        </IconButton>
        <Typography variant="h2" className={classes.label}>
          {renderKeyword()}
        </Typography>
      </Box>
      {renderSwitch()}
    </Grid>
  )
}

const useStyles = makeStyles(() => ({
  iconButtonBg: {
    backgroundColor: `${Colors.grey[1000]}80`,
    '&:focus': {
      backgroundColor: `${Colors.grey[1000]}80`,
    },
  },
  container: {
    padding: 24,
    paddingTop: 16,
  },
  label: {
    wordBreak: 'break-all',
  },
}))

SearchPage.Layout = MainLayout

export default SearchPage
