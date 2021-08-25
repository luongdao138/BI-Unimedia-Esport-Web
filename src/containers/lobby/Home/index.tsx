import { Grid, Box, Typography, makeStyles } from '@material-ui/core'
import ButtonPrimary from '@components/ButtonPrimary'
import { LobbyFilterOption } from '@services/lobby.service'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import { AddRounded } from '@material-ui/icons'
import ESChip from '@components/Chip'
import LoginRequired from '@containers/LoginRequired'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import useLobbyHelper from '../hooks/useLobbyHelper'
import LobbyCard from '@components/LobbyCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import ESLoader from '@components/Loader'
import useLobbyHome from './useLobbyHome'
import { useEffect } from 'react'

interface LobbyHomeProps {
  filter: LobbyFilterOption
}

const LobbyHome: React.FC<LobbyHomeProps> = ({ filter }) => {
  const { t } = useTranslation()
  const classes = useStyles()
  const { lobbies, meta, loadMore, onFilterChange } = useLobbyHome()
  const router = useRouter()
  const { toCreate } = useLobbyHelper()

  useEffect(() => {
    if (document.documentElement.scrollHeight > document.documentElement.clientHeight) return
    loadMore()
  }, [lobbies])

  useEffect(() => {
    onFilterChange(filter)
  }, [filter])

  const onFilter = (filter: LobbyFilterOption) => {
    router.push(`${ESRoutes.LOBBY}?filter=${filter}`, undefined, { shallow: true })
    return null
  }

  const defaultFilterOptions = [
    {
      type: LobbyFilterOption.all,
      label: t('common:arenaSearchFilters.all'),
      loginRequired: false,
    },
    {
      type: LobbyFilterOption.suggested,
      label: t('common:lobbySearchFilters.suggested'),
      loginRequired: false,
    },
    {
      type: LobbyFilterOption.recruiting,
      label: t('common:lobbySearchFilters.beforeStart'),
      loginRequired: false,
    },
    {
      type: LobbyFilterOption.joined,
      label: t('common:lobbySearchFilters.inProgress'),
      loginRequired: false,
    },
    {
      type: LobbyFilterOption.organized,
      label: t('common:lobbySearchFilters.organized'),
    },
  ]

  return (
    <>
      <div className={classes.header}>
        <Typography variant="h2">{t('common:home.lobby')}</Typography>

        <LoginRequired>
          <ButtonPrimary round gradient={false} onClick={toCreate} size="small">
            <AddRounded className={classes.addIcon} />
            {t('common:lobby_create.title')}
          </ButtonPrimary>
        </LoginRequired>
      </div>
      <Grid container className={classes.content}>
        <Box className={classes.filters}>
          {defaultFilterOptions.map((option) => (
            <ESChip
              key={option.type}
              color={option.type === filter ? 'primary' : 'default'}
              className={classes.filterChip}
              label={option.label}
              onClick={() => onFilter(option.type)}
            />
          ))}
        </Box>
        <InfiniteScroll
          className={classes.scrollContainer}
          dataLength={lobbies.length}
          next={loadMore}
          hasMore={true}
          loader={null}
          scrollThreshold={0.8}
        >
          {lobbies.map((Lobby, i) => (
            <Grid key={i} item xs={12} sm={12} md={4} lg={4} xl={3}>
              <LobbyCard lobby={Lobby} />
            </Grid>
          ))}
        </InfiniteScroll>
        {meta.pending && (
          <Grid item xs={12}>
            <Box my={4} display="flex" justifyContent="center" alignItems="center">
              <ESLoader />
            </Box>
          </Grid>
        )}
      </Grid>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    marginBottom: theme.spacing(3),
    backgroundColor: Colors.black,
    '& .MuiButtonBase-root.button-primary': {
      padding: '12px 16px',
    },
  },
  filters: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  filtersLoginRequired: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  filterChip: {
    maxWidth: 'none',
    marginBottom: 16,
    marginRight: 16,
  },
  addIcon: {
    position: 'relative',
    left: -8,
  },
  content: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  scrollContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}))

export default LobbyHome
