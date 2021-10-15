import { useEffect, useState } from 'react'
import UserSearchContainer from '@containers/Search/UserSearch'
import TournamentSearchContainer from '@containers/Search/TournamentSearch'
import LobbySearchContainer from '@containers/Search/LobbySearch'
import CommunitySearchContainer from '@containers/Search/CommunitySearch'
import { Box, makeStyles, Typography, IconButton, Icon, Theme } from '@material-ui/core'
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
      case searchTypes.LOBBY:
        return <LobbySearchContainer />
      case searchTypes.COMMUNITY:
        return <CommunitySearchContainer />
      default:
        return <></>
    }
  }

  const renderKeyword = () => {
    switch (type) {
      case searchTypes.USER:
        if (keyword) {
          return t('common:user.user_results').replace(/:key/gi, keyword)
        }
        return t('common:user.user_results_all')
      case searchTypes.TOURNAMENT:
        if (keyword) {
          return t('common:tournament.tournament_results').replace(/:key/gi, keyword)
        }
        return t('common:tournament.tournament_results_all')
      case searchTypes.LOBBY:
        if (keyword) {
          return t('common:lobby.lobby_results').replace(/:key/gi, keyword)
        }
        return t('common:lobby.lobby_results_all')
      case searchTypes.COMMUNITY:
        if (keyword) {
          return t('common:community.community_results').replace(/:key/gi, keyword)
        }
        return t('common:community.community_results_all')
      default:
        return <></>
    }
  }

  return (
    <MainLayout loginRequired={false}>
      <Box>
        <Box py={2} pl={3} display="flex" flexDirection="row" alignItems="center" borderBottom="1px solid #70707070">
          <IconButton className={classes.iconButtonBg} onClick={() => router.back()}>
            <Icon className={`fa fa-arrow-left ${classes.icon}`} fontSize="small" />
          </IconButton>
          <Typography variant="h2" className={classes.label}>
            {renderKeyword()}
          </Typography>
        </Box>
        <Box p={3}>{renderSwitch()}</Box>
      </Box>
    </MainLayout>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  iconButtonBg: {
    backgroundColor: `${Colors.grey[200]}80`,
    marginRight: theme.spacing(2),
  },
  icon: {
    fontSize: 12,
  },
  container: {
    padding: 24,
    paddingTop: 16,
  },
  label: {
    wordBreak: 'break-all',
    fontWeight: 'bold',
  },
}))

export default SearchPage
